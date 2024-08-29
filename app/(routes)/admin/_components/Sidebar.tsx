import { Card, CardContent } from "@/components/ui/card";
import { Package2 } from "lucide-react";
import SidebarMenu from "./Sidebarmenu";
import Link from "next/link";
import SidebarLogout from "./SidebarLogout";
import SidebarProfile from "./SidebarProfile";

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="text-[20px] font-bold text-center my-1 logo-font">
              LOGICLYNXZ
            </span>
          </Link>
        </div>
        <div className="flex-1 px-3 ">
          <SidebarProfile />
          <SidebarMenu />
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02 -chunk-0">
            <CardContent className="p-3">
              <SidebarLogout />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}