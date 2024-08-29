import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import SidebarMenu from "./SidebarMenu";
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
  import { Button } from "@/components/ui/button";
  import { LogOut, Menu, Package2 } from "lucide-react";
  import Link from "next/link";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  
  export default function SidebarResponsive() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
  
            <SidebarMenu />
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <div className="flex  gap-2">
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* <Image
                src="/profile.png"
                alt="userprofile"
                width={50}
                height={50}
                className="rounded-lg border"
              /> */}
                  <div>
                    <h6 className="font-semibold">Pablo Jab</h6>
                    <small>Main Role Ni Niya</small>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  size="sm"
                  className="w-full bg-[#3662e3] dark:text-white dark:hover:bg-[#0d1b44] hover:bg-[#5da3f4] "
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    );
  }