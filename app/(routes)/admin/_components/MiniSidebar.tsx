"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Ellipsis, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function MiniSidebar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="dark:bg-[#0e1421]">
            <CalendarDays size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className=" ">
          <SheetHeader>
            <SheetTitle>Task Schedules</SheetTitle>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when youre done.
            </SheetDescription> */}
          </SheetHeader>
          <div className="py-[10%] h-full  overflow-y-auto hide-scrollbar">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl py-5 border flex justify-center bg-[#ffffff] dark:bg-[#030712] mb-5"
            />

            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  Task Today
                  <div className="">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Test</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src="/test.jpg"
                      alt="Image"
                      width={300}
                      height={100}
                      className="rounded-md object-cover mb-2 h-full object-center"
                    />
                  </AspectRatio>
                </div>

                <CardTitle>Logiclynxz Website</CardTitle>
                <CardDescription>Service Website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between ">
                  <div>Progress</div>
                  <div>20%</div>
                </div>
                <Progress value={20} className="mt-2" />
                <div className="mt-2 flex justify-end gap-1">
                  <div className="flex -space-x-4 rtl:space-x-reverse">
                    <Image
                      className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                      src="/test.jpg"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <Image
                      className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                      src="/profile.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <Image
                      className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                      src="/test.jpg"
                      alt=""
                      width={30}
                      height={30}
                    />
                    <div className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                      +6
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full  bg-[#3662e3] dark:text-white dark:hover:bg-[#0d1b44] hover:bg-[#5da3f4]  ">
                  Go To Detail
                </Button>
              </CardFooter>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}