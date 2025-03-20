import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { id, title } = body

    await prisma.chat.update({
        where: { id },
        data: {
            title : title
         },

    })
    return NextResponse.json({code: 0})
}