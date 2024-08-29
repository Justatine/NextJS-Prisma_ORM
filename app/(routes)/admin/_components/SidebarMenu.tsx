"use client";

import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import {
  ClipboardList,
  FolderKanban,
  Info,
  LayoutDashboard,
  Mail,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function SidebarMenu() {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);
  }, []);

  const handleClick = (link: any) => {
    setActiveLink(link);
  };

  const navList = {
    items: [
      {
        link: "/",
        icon: <LayoutDashboard size={20} className="hover:animate-spin" />,
        text: "Dashboard",
      },
      // {
      //   link: "/projects",
      //   icon: <ClipboardList size={20} />,
      //   text: "Projects",
      // },
      // {
      //   link: "/members",
      //   icon: <User size={20} />,
      //   text: "Members",
      // },
      // {
      //   link: "/messages",
      //   icon: <Mail size={20} />,
      //   text: "Messages",
      // },
      // {
      //   link: "/file",
      //   icon: <FolderKanban size={20} />,
      //   text: "File Managers",
      // },
    ],
  };

  return (
    <div>
      <Command className="h-full">
        <CommandList>
          <CommandGroup heading="Menu">
            {navList.items.map((option, optionkey) => (
              <a
                className={`flex gap-2 cursor-pointer text-[13px] p-2 transition hover:bg-blue-400 hover:text-white rounded-lg ${
                  activeLink === option.link
                    ? "bg-gray-200 dark:bg-[#0d1b44]"
                    : ""
                }`}
                key={optionkey}
                href={option.link}
                onClick={() => handleClick(option.link)}
              >
                <div className="flex gap-2 items-center">
                  {option.icon}
                  {option.text}
                </div>
              </a>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}