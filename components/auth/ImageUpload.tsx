"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadToCloudinary } from "@/lib/api/cloudinary";

interface ImageUploadProps {
    onUpload: (url: string) => void;
    defaultValue?: string;
}

export default function ImageUpload({ onUpload, defaultValue }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const url = await uploadToCloudinary(file);
            onUpload(url);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
            />
            <Input
                value={defaultValue || ""}
                placeholder="URL de l'image"
                readOnly
                className="flex-1"
            />
            <label htmlFor="image-upload">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={isUploading}
                    asChild
                >
          <span>
            <Upload className="h-4 w-4" />
          </span>
                </Button>
            </label>
        </div>
    );
}