import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: Request,
    context: { params: { id: string } } // Use `context` instead of directly destructuring `params`
) {
    const json = await request.json();
    const { userId } = json;
    const { id: playId } = context.params; // Access `id` from `context.params`

    const favorite = await prisma.favorite.create({
        data: {
            userId,
            playId,
        },
    });

    return NextResponse.json(favorite);
}

export async function DELETE(
    request: Request,
    context: { params: { id: string } }
) {
    const json = await request.json();
    const { userId } = json;
    const { id: playId } = context.params;

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
