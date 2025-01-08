"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import FavoriteButton from "@/components/FavoriteButton";

interface PlayCardProps {
    play: any;
    userId: string;
}

export default function PlayCard({ play, userId }: PlayCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105">
            <div className="relative">
                <div className="relative h-48">
                    <Image
                        src={play.imageUrl}
                        alt={play.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute top-2 right-2">
                    <FavoriteButton
                        playId={play.id}
                        initialIsFavorited={play.isFavorited}
                        userId={userId}
                    />
                </div>
            </div>
            <Link href={`/plays/${play.id}`}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{play.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {format(new Date(play.date), "d MMMM yyyy", { locale: fr })}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">{play.location}</p>
                    <div className="flex flex-wrap gap-2">
                        {play.tags.map((tag: any) => (
                            <span
                                key={tag.id}
                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm px-2 py-1 rounded"
                            >
                {tag.name}
              </span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
}