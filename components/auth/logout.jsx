"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeClosed, Eye, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Cookies from "js-cookie";

export default function LogoutForm() {
    const [isLoading,setIsLoading] = React.useState(false)

  async function apiLogout(event) {
        // ✅ Store token in cookies (Expires in 7 days)
        Cookies.remove("token");
        
        // ✅ Redirect or refresh
        setIsLoading(false);
        window.location.href = "/auth"; // Change this to the actual route
  }

  return (
    <form onSubmit={apiLogout}>
        <Button disabled={isLoading}>{isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}</Button>
    </form>
  );
}
