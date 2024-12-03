"use client";

import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

export function TagCloud() {
  const articles = useStore((state) => state.articles);
  
  const tagCounts = articles.reduce((acc, article) => {
    article.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tagCounts).map(([tag, count]) => (
          <Badge key={tag} variant="outline" className="text-sm">
            {tag} ({count})
          </Badge>
        ))}
      </div>
    </div>
  );
}