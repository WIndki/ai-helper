import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")
    if (!id) return NextResponse.json({code: -1, message: "Message not found"})
    try {
        await prisma.message.delete({where: {id}})
        return NextResponse.json({code: 0, message: "Message deleted"})
    }
    catch (e) {return NextResponse.json({code: -1, message: "Message not found", error: e})}
}