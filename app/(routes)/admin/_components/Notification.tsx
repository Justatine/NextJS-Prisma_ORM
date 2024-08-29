"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { useState } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState<any>([
    {
      text: "Mao ni ang ni notif",
      date: "01-05-24",
      read: true,
    },
    {
      text: "Ato ming notif ni",
      date: "07-01-24",
      read: false,
    },
  ]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 border rounded-sm relative hover:bg-[#f3f4f6] dark:hover:bg-[#1f2937]">
          <div
            className={`absolute -top-2 -right-1 h-3 w-3 rounded-full my-1 ${
              notifications.find((x: any) => x.read === true)
                ? "bg-green-500"
                : "bg-neutral-200"
            }`}
          ></div>
          <BellIcon className="h-4 w-4 " />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {notifications.map((item: any, key: number) => (
            <DropdownMenuItem
              key={key}
              className="py-2 px-3 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2"
            >
              <div
                className={`h-3 w-3 rounded-full my-1 ${
                  !item.read ? "bg-green-500" : "bg-neutral-200"
                }`}
              ></div>
              <div className="">
                <div>{item.text}</div>
                <div className="text-xs text-neutral-500">{item.date}</div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}