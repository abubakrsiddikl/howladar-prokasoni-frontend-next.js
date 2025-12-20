"use client"
import { Button } from "@/components/ui/button";
import { env } from "@/config/env";

export default function GoogleLogin() {
  
  

  const handleGoogleLogin = () => {
    
    window.location.href = `${env.baseUrl}/auth/google?redirect=${""}`;
  };
  return (
    <div>
      <Button
        onClick={handleGoogleLogin}
        type="button"
        variant="outline"
        className="w-full cursor-pointer bg-black text-white"
      >
         Login with Google
      </Button>
    </div>
  );
}
