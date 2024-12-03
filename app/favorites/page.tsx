"use client";

import { useStore } from "@/lib/store";
import { ArticleCard } from "@/components/articles/article-card";
import { Navbar } from "@/components/layout/navbar";

export default function FavoritesPage() {
    const articles = useStore((state) => state.articles);
    const favorites = useStore((state) => state.favorites);

    const favoriteArticles = articles.filter((article) =>
        favorites.includes(article.id)
    );

    return (
        <div>
            <Navbar />
            <main className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-8">Articles Favoris</h1>
                {favoriteArticles.length === 0 ? (
                    <p className="text-muted-foreground">
                        Vous n'avez pas encore d'articles favoris.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {favoriteArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}