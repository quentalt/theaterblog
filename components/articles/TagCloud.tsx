"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface TagCloudProps {
    tags: {
        id: string;
        name: string;
    }[];
}

export default function TagCloud({ tags }: TagCloudProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTag = searchParams.get("tag");

    const handleTagClick = (tagName: string) => {
        if (currentTag === tagName) {
            router.push("/");
        } else {
            router.push(`/?tag=${tagName}`);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
                <Button
                    key={tag.id}
                    variant={currentTag === tag.name ? "default" : "outline"}
                    onClick={() => handleTagClick(tag.name)}
                    className="text-sm"
                >
                    {tag.name}
                </Button>
            ))}
        </div>
    );
}