import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    
    const { title, description } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!title || !description) {
      return new NextResponse("Title and description are required", { status: 400 });
    }

    await prismadb.tasks.create({
      data: {
        id: userId,
        title,
        description,
        status: "Pending",
      },
    });

    return NextResponse.json({ status: 'success', message: 'Task added'});
  } catch (error) {
    console.log("[TASKS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // if (!params.categoryId) {
    //   return new NextResponse("Category id required", { status: 400 });
    // }

    // const category = await prismadb.category.findUnique({
    //   where: {
    //     id: params.categoryId,
    //   },
    // });

    // return NextResponse.json(category);
  } catch (error) {
    console.log("[CETEGORY_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prismadb.tasks.deleteMany({
      where: {
        id: userId,
        status: "Completed",
      },
    });

    return NextResponse.json({ status:'success', message: 'Task(s) deleted'});
  } catch (error) {
    console.log("[TASK_DELETE_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}