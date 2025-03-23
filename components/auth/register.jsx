"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Cookies from "js-cookie";

export default function RegisterForm() {
  const [passwordType, setPasswordType] = React.useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = React.useState("password");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  async function apiRegister(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("https://chatappbackend-production-859a.up.railway.app/api/v1/register/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 400) {
        const errors = [];
      
        for (const key in data) {
          if (Array.isArray(data[key])) {
            errors.push(...data[key]); // If it's an array, spread the values
          } else {
            errors.push(data[key]); // Otherwise, push the single value
          }
        }
      
        setError(errors.length > 0 ? errors.join(", ") : "Registration failed. Please check your details.");
      }
       else if (response.status === 201) {
        // ✅ Store token in cookies (Expires in 7 days)
        Cookies.set("token", data.token, { expires: 7 });

        // ✅ Success message
        setSuccess("Registration successful! Redirecting...");
        
        // ✅ Redirect or refresh
        setTimeout(() => {
          window.location.href = "/"; // Change this to the actual route
        }, 2000);
      }
    } catch (err) {
        console.log(err)
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={apiRegister} className="space-y-4 p-4 bg-white rounded-lg ">
      {/* Error Message */}
      {error && (
        <div className="flex items-center p-3 text-red-700 bg-red-100 border border-red-400 rounded-md">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-center p-3 text-green-700 bg-green-100 border border-green-400 rounded-md">
          <CheckCircle className="mr-2 h-5 w-5" />
          <span>{success}</span>
        </div>
      )}

      {/* Username */}
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" placeholder="Enter your username" type="text" required />
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone_no" placeholder="+977-xxxxxxxxx" type="tel" required />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="Enter your email" type="email" required />
      </div>

      {/* Password */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <div className="relative flex">
          <Input id="password" name="password" type={passwordType} placeholder="Enter your password" required />
          <Button
            size="icon"
            type="button"
            variant="ghost"
            className="absolute inset-y-0 right-2 flex items-center px-2 hover:bg-transparent"
            onClick={() => setPasswordType((prev) => (prev === "password" ? "text" : "password"))}
          >
            {passwordType === "password" ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
      </div>

       {/* Submit Button */}
      <Button className="mt-5 w-full" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Registering...
          </>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
