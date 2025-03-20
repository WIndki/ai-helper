import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { id } = body
    await prisma.message.deleteMany({
        where: { chatId: id },
    })
    await prisma.chat.delete({
        where: { id },
    })
    return NextResponse.json({code: 0})
}