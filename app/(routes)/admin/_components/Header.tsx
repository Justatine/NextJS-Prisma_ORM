"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
// import { ModeToggle } from "@/components/ui/ModeToggle";

import Notification from "./Notification";
import MiniSidebar from "./MiniSidebar";
import SidebarResponsive from "./SidebarResponsive";

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-4 lg:h-[65px] md:h-[60px] lg:px-6">
      <SidebarResponsive />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <Notification />
      {/* <ModeToggle /> */}
      <MiniSidebar />

      {/* <Button>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button> */}
    </header>
  );
}