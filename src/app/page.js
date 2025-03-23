"use client"

import Image from "next/image";
import { SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import React from "react";
import LogoutForm from "../../components/auth/logout";
import Cookies from "js-cookie";
import {AlertCircle} from "lucide-react";

export  default  function Home() {
  const [userMessages,setUserMessages] = React.useState([])
  const [inputMessage, setInputMessage] = React.useState("");
  const [aiMessages,setAiMessage] = React.useState([])
  const [error,setError] = React.useState(null)

  async function handleUserMessage(e) {
    e.preventDefault(); // Prevent form refresh
  
    if (inputMessage.trim() === "") return; // Ignore empty messages
  
    // Add user message to state
    setUserMessages((prevMessages) => [...prevMessages, inputMessage]);
    setInputMessage(""); // Clear input field
  
    const formData = new FormData();
    formData.append("message", inputMessage); // Ensure correct field name
  
    const token = Cookies.get("token"); // Get token from cookies

    try {
      const response = await fetch("https://surutest.pythonanywhere.com/api/v1/ai-chat/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${token}`, // Attach token here
        },
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        // Add AI response to state
        const response_data = data['candidates'][0]['content']['parts'][0]['text'];
        console.log(response_data)
        setAiMessage((prevMessages) => [...prevMessages, response_data || "I'm here to help!"]);
      } else {
        setError("Failed to fetch AI response.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-150 h-150">
      <CardHeader className="sticky top-0 bg-white">
        <div id='card-head' className="flex justify-between">
          <div id='head-title'>
            <CardTitle>Chat app</CardTitle>
            <CardDescription>Talk with our latest ai model.</CardDescription>

          </div>
          <LogoutForm/>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto overflow-x-auto p-4 space-y-4">
        {error && (
          <div className="flex items-center p-3 text-red-700 bg-red-100 border border-red-400 rounded-md">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        {userMessages.map((message, index) => (
          <div key={index}>
            {/* User Message */}
            <div
              id="chat-bubble-left"
              className="flex w-max max-w-[100%%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary mb-5 text-primary-foreground"
            >
              {message}
            </div>

            {/* AI Message (If available) */}
            {aiMessages[index] ? (
              <div
                id="chat-bubble-right"
                className="flex w-max max-w-[100%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted"
              >
                {aiMessages[index]}
              </div>
            ) : (
              <div className="text-gray-400 text-sm mt-2">Typing...</div> // Loading indicator if AI hasn't responded yet
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="sticky bottom-0">
      <form onSubmit={handleUserMessage} className="flex justify-between space-x-3 w-full">
        { userMessages.length == aiMessages.length || userMessages.length == 0 ? <Input
          type="text"
          className="py-4 flex-1"
          placeholder="Enter your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          name="message"
          required
        /> : <Input
        type="text"
        className="py-4 flex-1"
        placeholder="Please wait..."
        disabled
      />}
        <Button size="icon" type="submit">
          <SendHorizontal />
        </Button>
      </form>
      </CardFooter>
    </Card>
    </div>
    
  );
}

