import { currentUser, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const {userId} = auth();
    if (!userId) {
        return NextResponse.json({});
    }

    return NextResponse.json({ userId });
}
