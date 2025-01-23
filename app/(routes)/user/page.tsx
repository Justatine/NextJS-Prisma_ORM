import { auth } from "@clerk/nextjs/server";
import { AppLayout } from "./_components/AppLayout";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export type Task = {
  task_id: string;
  title: string;
  description: string;
  status: string; 
  created_at: string;
};

const UserPage = async () => {
const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const UserTasks = await prismadb.tasks.findMany({
    where: {
      id: userId,
    }
  });

  const formattedUserTasks: Task[] = UserTasks.map((item) => ({
    task_id: item.task_id,
    title: item.title,
    description: item.description,
    status: item.status ?? "Pending",
    created_at: format(item.created_at, "MMMM do, yyyy"),
  }));
 
  return (
    <AppLayout initialData={formattedUserTasks} />
  );
}

export default UserPage;
