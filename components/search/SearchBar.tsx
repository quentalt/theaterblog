"use client";

import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search, Calendar} from "lucide-react";

interface SearchBarProps {
    tags?: any[]
}

export default function SearchBar({tags}: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("title") || "");
    const [date, setDate] = useState(searchParams.get("date") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (title) params.set("title", title);
        if (date) params.set("date", date);
        router.push(`/?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                <Input
                    type="text"
                    placeholder="Rechercher une pièce..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Button type="submit">Rechercher</Button>
        </form>
    );
}