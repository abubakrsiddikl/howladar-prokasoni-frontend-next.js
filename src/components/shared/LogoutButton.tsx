"use client";

import { logoutUser } from "@/services/Auth/auth.api";
import { Button } from "../ui/button";


const LogoutButton = () => {
 
  const handleLogout = async () => {
    console.log("handle lgout")
    await logoutUser();
    
  };
  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
