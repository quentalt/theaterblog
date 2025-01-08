import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PlayForm from "@/components/plays/PlayForm";

export default async function EditPlayPage({
                                               params,
                                           }: {
    params: { id: string };
}) {
    const play = await prisma.play.findUnique({
        where: { id: params.id },
        include: {
            tags: true,
            actors: true,
        },
    });

    if (!play) {
        notFound();
    }

    const formattedPlay = {
        ...play,
        date: play.date.toISOString().split("T")[0],
        tags: play.tags.map((tag) => tag.name),
        actors: play.actors.map((actor) => ({
            name: actor.name,
            role: actor.role,
            imageUrl: actor.imageUrl,
            bio: actor.bio || "",
        })),
    };

    return (
        <main className="container max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Modifier la Pièce</h1>
            <div className="bg-card p-6 rounded-lg shadow">
                <PlayForm initialData={formattedPlay} playId={params.id} />
            </div>
        </main>
    );
}