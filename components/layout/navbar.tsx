"use client";

import Link from "next/link";
import { Heart, Search, Theater } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const favorites = useStore((state) => state.favorites);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Theater className="h-6 w-6" />
          <span className="font-bold">Théâtre Blog</span>
        </Link>
        
        <div className="flex items-center ml-auto space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des articles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Link href="/favorites">
            <Button variant="ghost" className="relative">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>
          
          <Link href="/new">
            <Button>Nouvel Article</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}