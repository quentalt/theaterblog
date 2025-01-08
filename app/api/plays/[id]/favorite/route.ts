import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const json = await request.json();
    const { userId } = json;
    const { id: playId } = params;

    const count = await prisma.favorite.count({
        where: {
            playId,
        },
    });

    await prisma.favorite.create({
        data: {
            userId,
            playId,
        },
    });

    return new NextResponse(null, { status: 201 });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const json = await request.json();
    const { userId } = json;
    const { id: playId } = params;

    await prisma.favorite.delete({
        where: {
            userId_playId: {
                userId,
                playId,
            },
        },
    });

    return new NextResponse(null, { status: 204 });
}