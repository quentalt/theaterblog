import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppBar } from "@/components/layout/AppBar";
import { Toaster } from "@/components/ui/toaster";
import {getSession} from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Théâtre Blog",
    description: "Blog de théâtre avec les dernières pièces et critiques",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AppBar user={session} />
            {children}
            <Toaster />
        </ThemeProvider>
        </body>
        </html>
    );
}