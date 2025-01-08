"use client";

import {usePathname} from "next/navigation";
import {useTheme} from "next-themes";
import {Theater, Sun, Moon, Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {NavigationLinks} from "./NavigationLinks";

interface AppBarProps {
    user?: { name: string; id: string }
}

export function AppBar({user}: AppBarProps) {
    const pathname = usePathname();
    const {theme, setTheme} = useTheme();

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                            <NavigationLinks className="flex flex-col gap-4 mt-4"/>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center gap-2 mr-4">
                    <Theater className="h-6 w-6"/>
                    <span className="font-bold hidden md:inline-block">Théâtre Blog</span>
                </div>

                <NavigationLinks className="hidden md:flex md:gap-6"/>

                <div className="flex items-center ml-auto gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                        <Moon
                            className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    </Button>
                    {/*<span className="text-sm text-muted-foreground">Visiteur</span>*/}
                </div>
            </div>
        </header>
    );
}