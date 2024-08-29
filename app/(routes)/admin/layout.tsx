// import Navbar from "@/components/admin/navbar";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import { ThemeProvider } from "next-themes";

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
      <ThemeProvider attribute="class">
        <Sidebar/>
        <div className="flex flex-col h-screen">
          <Header/>
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}