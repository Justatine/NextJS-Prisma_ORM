// SidebarLogout component
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const SidebarLogout = () => {
  return (
    <Button
      className="w-full bg-[#3662e3] dark:text-white dark:hover:bg-[#0d1b44] hover:bg-[#5da3f4]" 
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};

export default SidebarLogout;