"use client";

import PlayCard from "@/components/articles/PlayCard";

interface PlayListProps {
    initialPlays: any[];
    userId: string;
}

export default function PlayList({ initialPlays, userId }: PlayListProps) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialPlays.map((play) => (
                <PlayCard key={play.id} play={play} userId={userId} />
            ))}
        </div>
    );
}