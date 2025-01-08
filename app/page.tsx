"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PlayList from "@/components/PlayList";
import TagCloud from "@/components/articles/TagCloud";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search/SearchBar";
import { Article } from "@/lib/types";
import {AppBar} from "@/components/layout/AppBar";

export default function Home() {
    const userId = "user-1"; // Simple fixed user ID
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [plays, setPlays] = useState<Article[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", currentPage.toString());
            const response = await fetch(`/api/plays?${params.toString()}`);
            const data = await response.json();

            setPlays(data.plays);
            setTags(data.tags);
            setTotalPages(data.totalPages);
        };

        fetchData();
    }, [searchParams, currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Théâtre Blog</h1>
                <div className="mb-8">
                    <SearchBar tags={tags}/>
                </div>
                <div className="mb-8">
                    <TagCloud tags={tags}/>
                </div>
                <PlayList initialPlays={plays} userId={userId}/>
                <div className="mt-6 flex justify-center gap-2">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            variant={currentPage === page ? "default" : "outline"}
                            className={currentPage === page ? "bg-theater-red text-accent" : "text-theater-black"}
                        >
                            {page}
                        </Button>
                    ))}
                </div>
            </main>
    );
}
