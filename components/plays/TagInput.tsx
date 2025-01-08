"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TagInput() {
    const [inputValue, setInputValue] = useState("");
    const { control, watch, setValue } = useFormContext();
    const tags = watch("tags") || [];

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                setValue("tags", [...tags, newTag]);
                setInputValue("");
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        setValue(
            "tags",
            tags.filter((tag: string) => tag !== tagToRemove)
        );
    };

    return (
        <FormField
            control={control}
            name="tags"
            render={() => (
                <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <div className="space-y-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ajouter des tags (appuyez sur Entrée)"
                            />
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center gap-1"
                                    >
                    {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-red-300"
                                        >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                                ))}
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}