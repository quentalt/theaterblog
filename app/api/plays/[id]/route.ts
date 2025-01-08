import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const play = await prisma.play.findUnique({
        where: {
            id: params.id,
        },
        include: {
            tags: true,
            actors: true,
        },
    });

    if (!play) {
        return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(play);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const json = await request.json();

    const play = await prisma.play.update({
        where: {
            id: params.id,
        },
        data: {
            title: json.title,
            date: new Date(json.date),
            location: json.location,
            description: json.description,
            imageUrl: json.imageUrl,
            tags: {
                set: [],
                connectOrCreate: json.tags.map((tag: string) => ({
                    where: { name: tag },
                    create: { name: tag },
                })),
            },
            actors: {
                deleteMany: {},
                create: json.actors.map((actor: any) => ({
                    name: actor.name,
                    imageUrl: actor.imageUrl,
                    bio: actor.bio,
                    role : actor.role
                })),
            },
        },
        include: {
            tags: true,
            actors: true,
        },
    });

    return NextResponse.json(play);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await prisma.play.delete({
        where: {
            id: params.id,
        },
    });

    return new NextResponse(null, { status: 204 });
}