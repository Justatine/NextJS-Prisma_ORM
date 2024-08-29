// import Navbar from "@/components/admin/navbar";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if (!checkRole("Admin")) {
    redirect("/");
  }

  return (
    <div
      className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
      suppressHydrationWarning={true}
    >
      <Sidebar/>
      <div className="flex flex-col h-screen">
        <Header/>
        {children}
      </div>
    </div>
  );
}