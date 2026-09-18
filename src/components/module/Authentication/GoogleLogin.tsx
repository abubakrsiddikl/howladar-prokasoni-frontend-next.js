"use client";
import { Button } from "@/components/ui/button";
import { env } from "@/config/env";
import { useSearchParams } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { trackGoogleEvent } from "@/lib/analytics";

export default function GoogleLogin() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "";
  const handleGoogleLogin = () => {
    trackGoogleEvent("login_attempt", { method: "google" });
    window.location.href = `${env.baseUrl}/auth/google?redirect=${redirectPath}`;
  };
  return (
    <div>
      <Button
        onClick={handleGoogleLogin}
        type="button"
        variant="outline"
        className="w-full mt-2 cursor-pointer bg-black text-white"
      >
        <FcGoogle />
        Login with Google
      </Button>
    </div>
  );
}
