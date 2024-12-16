import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const date = searchParams.get("date");
    const tag = searchParams.get("tag");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 10;

    let where: any = {};

    if (title) {
        where = {
            ...where,
            title: {
                contains: title,
                mode: "insensitive",
            },
        };
    }

    if (date) {
        const searchDate = new Date(date);
        where = {
            ...where,
            date: {
                gte: searchDate,
                lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000),
            },
        };
    }

    if (tag) {
        where = {
            ...where,
            tags: {
                some: {
                    name: tag,
                },
            },
        };
    }

    // Fetch plays with pagination
    const plays = await prisma.play.findMany({
        where,
        include: {
            tags: true,
            actors: true,
            favorites: {
                where: {
                    userId: "user-1",
                },
            },
        },
        orderBy: {
            date: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    // Count total items
    const totalItems = await prisma.play.count({ where });

    const playsWithFavorites = plays.map((play) => ({
        ...play,
        isFavorited: play.favorites.length > 0,
    }));

    // Fetch tags for filters
    const tags = await prisma.tag.findMany();

    return NextResponse.json({
        plays: playsWithFavorites,
        tags,
        totalPages: Math.ceil(totalItems / pageSize),
    });
}
