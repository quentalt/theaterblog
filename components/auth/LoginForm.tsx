"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginSchema, type LoginData } from "@/lib/validations/auth";
import AuthForm from "./AuthForm";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginData) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("Erreur de connexion");

            toast({
                title: "Connexion réussie",
                description: "Vous êtes maintenant connecté",
            });
            router.push("/");
            router.refresh();
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Email ou mot de passe incorrect",
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
            submitText="Se connecter"
            loadingText="Connexion..."
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
        </AuthForm>
    );
}