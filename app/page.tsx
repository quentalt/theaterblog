"use client";

import { useEffect } from "react";
import { ArticleCard } from "@/components/articles/article-card";
import { TagCloud } from "@/components/articles/tag-cloud";
import { Navbar } from "@/components/layout/navbar";
import { useStore } from "@/lib/store";

export default function Home() {
    const { articles, fetchArticles } = useStore();

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return (
        <div>
            <Navbar />
            <main className="container mx-auto py-8">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-9">
                        <div className="grid grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </div>
                    <aside className="col-span-3">
                        <TagCloud />
                    </aside>
                </div>
            </main>
        </div>
    );
}