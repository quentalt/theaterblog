"use client";

import { useStore } from "@/lib/store";
import { Navbar } from "@/components/layout/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const articles = useStore((state) => state.articles);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);

  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const isFavorite = favorites.includes(article.id);

  return (
      <div>
        <Navbar />
        <main className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 mb-8">
              <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-lg"
              />
              <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-4 right-4 ${
                      isFavorite ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={() => toggleFavorite(article.id)}
              >
                <Heart className="h-6 w-6 fill-current" />
              </Button>
            </div>

            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
              ))}
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {article.description}
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Distribution</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {article.actors.map((actor) => (
                    <div
                        key={actor.id}
                        className="flex items-center space-x-4 p-4 rounded-lg border"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={actor.avatarUrl} alt={actor.name} />
                        <AvatarFallback>{actor.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{actor.name}</p>
                        <p className="text-sm text-muted-foreground">{actor.role}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}