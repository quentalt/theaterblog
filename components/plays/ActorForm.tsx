"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ActorForm() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "actors",
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Comédiens</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: "", imageUrl: "", bio: "", role: "" })}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un comédien
                </Button>
            </div>

            {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <FormField
                        control={control}
                        name={`actors.${index}.name`}
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
                        control={control}
                        name={`actors.${index}.role`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rôle</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`actors.${index}.imageUrl`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo URL</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`actors.${index}.bio`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Biographie</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            ))}
        </div>
    );
}