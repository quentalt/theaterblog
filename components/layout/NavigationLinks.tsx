"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {Theater, Heart, PlusCircle, UserPlus, TagIcon} from "lucide-react";

interface NavigationLinksProps {
    className?: string;
}

const links = [
    {
        href: "/",
        label: "Pièces",
        icon: Theater,
    },
    {
        href: "/favorites",
        label: "Favoris",
        icon: Heart,
    },
    {
        href: "/plays/new",
        label: "Nouvelle Pièce",
        icon: PlusCircle,
    },
];

export function NavigationLinks({ className }: NavigationLinksProps) {
    const pathname = usePathname();

    return (
        <nav className={className}>
            {links.map(({ href, label, icon: Icon }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                        pathname === href
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </Link>
            ))}
        </nav>
    );
}