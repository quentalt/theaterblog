"use client";

import { ReactNode } from "react";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

interface AuthFormProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit: (values: T) => Promise<void>;
    isLoading: boolean;
    submitText: string;
    loadingText: string;
    children: ReactNode;
}

export default function AuthForm<T extends IntrinsicAttributes & {
    children: ReactNode | ReactNode[];
} & UseFormReturn<FieldValues, any, undefined>>({
                                        form,
                                        onSubmit,
                                        isLoading,
                                        submitText,
                                        loadingText,
                                        children,
                                    }: AuthFormProps<T>) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {children}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? loadingText : submitText}
                </Button>
            </form>
        </Form>
    );
}