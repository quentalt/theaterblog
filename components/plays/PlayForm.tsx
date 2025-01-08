"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ActorForm from "./ActorForm";
import TagInput from "./TagInput";
import {useToast} from "@/hooks/use-toast";

const playSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    date: z.string().min(1, "La date est requise"),
    location: z.string().min(1, "Le lieu est requis"),
    description: z.string().min(1, "La description est requise"),
    imageUrl: z.string().url("L'URL de l'image est invalide"),
    tags: z.array(z.string()).min(1, "Au moins un tag est requis"),
    actors: z.array(
        z.object({
            name: z.string().min(1, "Le nom est requis"),
            role: z.string().min(1, "Le rôle est requis"),
            imageUrl: z.string().url("L'URL de l'image est invalide"),
            bio: z.string().optional(),
        })
    ),
});

type PlayFormData = z.infer<typeof playSchema>;

interface PlayFormProps {
    initialData?: PlayFormData;
    playId?: string;
}

export default function PlayForm({ initialData, playId }: PlayFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const isEditing = !!playId;

    const form = useForm<PlayFormData>({
        resolver: zodResolver(playSchema),
        defaultValues: initialData || {
            title: "",
            date: "",
            location: "",
            description: "",
            imageUrl: "",
            tags: [],
            actors: [],
        },
    });

    const onSubmit = async (data: PlayFormData) => {
        try {
            const url = isEditing ? `/api/plays/${playId}` : "/api/plays";
            const method = isEditing ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error();

            toast({
                title: isEditing ? "Pièce modifiée" : "Pièce créée",
                description: isEditing
                    ? "La pièce a été modifiée avec succès"
                    : "La pièce a été créée avec succès",
            });

            router.push("/");
            router.refresh();
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue",
                variant: "destructive",
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lieu</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <TagInput />
                <ActorForm />

                <Button type="submit" className="w-full">
                    {isEditing ? "Modifier la pièce" : "Créer la pièce"}
                </Button>
            </form>
        </FormProvider>
    );
}