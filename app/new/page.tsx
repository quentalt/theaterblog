"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Navbar } from "@/components/layout/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NewArticlePage() {
  const router = useRouter();
  const addArticle = useStore((state) => state.addArticle);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const articleData = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        actors: [], // We'll handle actors in a separate form or component
      };

      await addArticle(articleData);
      router.push("/");
    } catch (err) {
      setError("Une erreur est survenue lors de la création de l'article.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div>
        <Navbar />
        <main className="container mx-auto py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Nouvel Article</h1>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                  {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image</Label>
                <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="Comédie, Drame, Contemporain"
                    required
                />
              </div>

              <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
              >
                {isSubmitting ? "Création en cours..." : "Créer l'article"}
              </Button>
            </form>
          </div>
        </main>
      </div>
  );
}