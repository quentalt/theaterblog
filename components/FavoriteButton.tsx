"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";

interface FavoriteButtonProps {
    playId: string;
    initialIsFavorited: boolean;
    userId: string;
}

export default function FavoriteButton({
                                           playId,
                                           initialIsFavorited,
                                           userId,
                                       }: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const { toast } = useToast();

    const toggleFavorite = async () => {
        try {
            const response = await fetch(`/api/plays/${playId}/favorite`, {
                method: isFavorited ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) throw new Error("Failed to update favorite");

            setIsFavorited(!isFavorited);
            toast({
                title: isFavorited ? "Retiré des favoris" : "Ajouté aux favoris",
                duration: 2000,
            });
        } catch (error) {
            toast({
                title: "Une erreur est survenue",
                variant: "destructive",
                duration: 2000,
            });
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className={`transition-colors ${
                isFavorited ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
            }`}
        >
            <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
        </Button>
    );
}