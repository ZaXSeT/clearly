import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Clearly",
    description: "A calm tool to clarify, simplify, organize, and prioritize your thoughts.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className={cn("min-h-screen bg-background text-primary font-sans antialiased")}>
                <main className="max-w-2xl mx-auto px-6 py-12">
                    {children}
                </main>
            </body>
        </html>
    );
}
