import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { articleId, userId } = await request.json();

    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            favorites: {
                connect: { id: articleId },
            },
        },
        include: {
            favorites: true,
        },
    });

    return NextResponse.json(user);
}

export async function DELETE(request: Request) {
    const { articleId, userId } = await request.json();

    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            favorites: {
                disconnect: { id: articleId },
            },
        },
        include: {
            favorites: true,
        },
    });

    return NextResponse.json(user);
}