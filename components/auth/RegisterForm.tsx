"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterData } from "@/lib/validations/auth";
import AuthForm from "./AuthForm";
import ImageUpload from "./ImageUpload";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import {useToast} from "@/hooks/use-toast";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
            avatarUrl: "",
        },
    });

    const onSubmit = async (values: RegisterData) => {
        try {
            setIsLoading(true);

            // Inscription
            const registerResponse = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!registerResponse.ok) throw new Error("Erreur lors de l'inscription");

            // Connexion automatique
            const loginResponse = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            if (!loginResponse.ok) throw new Error("Erreur lors de la connexion");

            toast({
                title: "Inscription réussie",
                description: "Vous êtes maintenant connecté",
            });
            router.push("/");
            router.refresh();
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de l'inscription",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            submitText="S'inscrire"
            loadingText="Inscription en cours..."
        >
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="email@exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                            <ImageUpload
                                onUpload={(url) => field.onChange(url)}
                                defaultValue={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </AuthForm>
    );
}