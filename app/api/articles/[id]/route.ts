import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const article = await prisma.article.findUnique({
        where: { id: params.id },
        include: {
            tags: true,
            actors: true,
        },
    });

    if (!article) {
        return NextResponse.json(
            { error: 'Article not found' },
            { status: 404 }
        );
    }

    return NextResponse.json(article);
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const body = await request.json();

    const article = await prisma.article.update({
        where: { id: params.id },
        data: {
            title: body.title,
            description: body.description,
            imageUrl: body.imageUrl,
            tags: {
                set: [],
                connectOrCreate: body.tags.map((tag: string) => ({
                    where: { name: tag },
                    create: { name: tag },
                })),
            },
        },
        include: {
            tags: true,
            actors: true,
        },
    });

    return NextResponse.json(article);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await prisma.article.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ status: 'ok' });
}