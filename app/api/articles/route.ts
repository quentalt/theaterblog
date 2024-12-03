import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    const articles = await prisma.article.findMany({
        where: search ? {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ],
        } : undefined,
        include: {
            tags: true,
            actors: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    // Transform the data to match the frontend structure
    const transformedArticles = articles.map(article => ({
        ...article,
        tags: article.tags.map(tag => tag.name),
        isFavorite: false, // This will be set by the frontend based on user's favorites
    }));

    return NextResponse.json(transformedArticles);
}

export async function POST(request: Request) {
    const body = await request.json();

    const article = await prisma.article.create({
        data: {
            title: body.title,
            description: body.description,
            imageUrl: body.imageUrl,
            tags: {
                connectOrCreate: body.tags.map((tag: string) => ({
                    where: { name: tag },
                    create: { name: tag },
                })),
            },
            actors: {
                create: body.actors || [],
            },
        },
        include: {
            tags: true,
            actors: true,
        },
    });

    // Transform the response to match the frontend structure
    const transformedArticle = {
        ...article,
        tags: article.tags.map(tag => tag.name),
        isFavorite: false,
    };

    return NextResponse.json(transformedArticle);
}