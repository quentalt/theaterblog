import { prisma } from "@/lib/prisma";
import PlayList from "@/components/PlayList";
import {AppBar} from "@/components/layout/AppBar";

export default async function FavoritesPage() {
    const userId = "user-1"; // Simple fixed user ID

    const favorites = await prisma.favorite.findMany({
        where: {
            userId,
        },
        include: {
            play: {
                include: {
                    tags: true,
                    actors: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const plays = favorites.map((fav) => ({
        ...fav.play,
        isFavorited: true,
    }));

    return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Mes Favoris</h1>
                <PlayList initialPlays={plays} userId={userId}/>
            </main>
    );
}