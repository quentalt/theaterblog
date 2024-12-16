import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import DeletePlayButton from "@/components/articles/DeletePlayButton";
import { MapPin } from "lucide-react";

export default async function PlayPage({ params }: { params: { id: string } }) {
    const playId = params?.id;

    if (!playId) {
        notFound();
    }

    const play = await prisma.play.findUnique({
        where: { id: playId },
        include: {
            tags: true,
            actors: true,
            favorites: {
                where: { userId: "user-1" },
            },
        },
    });

    if (!play) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">{play.title}</h1>
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href={`/plays/${play.id}/edit`}>Modifier</Link>
                        </Button>
                        <DeletePlayButton playId={play.id} />
                    </div>
                </div>

                <div className="relative h-96 mb-8">
                    <Image
                        src={play.imageUrl}
                        alt={play.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div className="bg-card rounded-lg p-6 mb-8">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Informations</h2>
                        <p className="text-muted-foreground mb-2">
                            {format(new Date(play.date), "d MMMM yyyy", { locale: fr })}
                        </p>
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="mr-2" />
                            <p>{play.location}</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                            {play.description}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {play.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Distribution</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {play.actors.map((actor) => (
                                <div
                                    key={actor.id}
                                    className="bg-background rounded-lg overflow-hidden border"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={actor.imageUrl}
                                            alt={actor.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold">{actor.name}</h3>
                                        <p className="text-sm text-muted-foreground">{actor.role}</p>
                                        {actor.bio && (
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {actor.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
