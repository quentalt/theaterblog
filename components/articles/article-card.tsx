"use client";

import { Article } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import Link from "next/link";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(article.id);

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 ${
            isFavorite ? "text-red-500" : "text-gray-500"
          }`}
          onClick={() => toggleFavorite(article.id)}
        >
          <Heart className="h-5 w-5 fill-current" />
        </Button>
      </div>
      
      <CardHeader>
        <Link href={`/articles/${article.id}`}>
          <CardTitle className="hover:text-primary cursor-pointer">
            {article.title}
          </CardTitle>
        </Link>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {article.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex -space-x-4">
          {article.actors.map((actor) => (
            <Avatar key={actor.id} className="border-2 border-background">
              <AvatarImage src={actor.avatarUrl} alt={actor.name} />
              <AvatarFallback>{actor.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}