"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import ToolSwitch from "@/components/ToolSwitch";
import DevIndicator from "@/components/DevIndicator";
import ResultDisplay from "@/components/ResultDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { toolMeta } from "@/lib/toolMeta";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const toolsList: Tool[] = ["clarify", "simplify", "organize", "prioritize", "start"];

type Tool = "clarify" | "simplify" | "organize" | "prioritize" | "start";

export default function HomePage() {
    const [tool, setTool] = useState<Tool>("clarify");
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [source, setSource] = useState<"ai" | "fallback" | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setResult(null);
        setSource(null);
        setError(null);
    }, [tool]);

    const vibrate = () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(10);
        }
    };

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setResult(null);
        setSource(null);
        setError(null);

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: tool, input }),
            });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse API response:", text);
                throw new Error("Server returned an invalid response (not JSON).");
            }

            if (!res.ok) {
                throw new Error(data.error || "Failed to process request");
            }

            setResult(data.result);
            setSource(data.source);
            vibrate();
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
            vibrate();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative bg-bg dark:bg-bg-dark transition-colors duration-200">
            {/* Full Width Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-6 py-4 sm:px-8 sm:py-6 bg-bg/80 dark:bg-bg-dark/80 backdrop-blur-md transition-colors duration-200">
                <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>
                <ThemeToggle />
            </header>

            {/* Main Content with padding for header */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="max-w-2xl mx-auto px-4 sm:px-6 pt-32 pb-32 sm:pb-12 space-y-6 sm:space-y-10 relative"
            >
                {/* Tool Switcher & Titles */}
                <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <ToolSwitch value={tool} onChange={setTool} />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tool}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="select-none"
                        >
                            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-text-primary dark:text-text-darkPrimary">
                                {toolMeta[tool].title}
                            </h1>
                            <p className="text-sm sm:text-lg text-text-secondary dark:text-text-darkSecondary min-h-[3rem] pt-2">
                                {toolMeta[tool].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Input Area (Static, No Drag) */}
                <motion.div
                    className="space-y-4"
                >
                    <Textarea
                        placeholder={toolMeta[tool].placeholder}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-[140px] sm:min-h-[200px] text-base sm:text-lg p-4 sm:p-6 leading-relaxed"
                        autoFocus
                    />

                    {/* Example Button (Desktop) */}
                    <div className="flex justify-end hidden sm:flex">
                        <button
                            onClick={() => setInput(toolMeta[tool].example)}
                            className="text-sm text-text-muted dark:text-text-darkMuted hover:text-text-primary dark:hover:text-text-darkPrimary transition"
                        >
                            Use example
                        </button>
                    </div>

                    {/* Desktop Controls (Run, Error) */}
                    <div className="hidden sm:flex justify-between items-center">
                        {error && (
                            <span className="text-sm text-red-500 dark:text-red-400 font-medium animate-in fade-in">
                                {error}
                            </span>
                        )}
                        <div className="flex-1 text-right">
                            <Button onClick={handleSubmit} isLoading={isLoading} disabled={!input.trim()}>
                                {isLoading ? "Running..." : "Run"}
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Sticky Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg dark:bg-bg-dark border-t border-border-subtle dark:border-border-dark sm:hidden z-50">
                    <div className="flex flex-col gap-2">
                        {error && (
                            <span className="text-xs text-center text-red-500 dark:text-red-400 font-medium animate-in fade-in">
                                {error}
                            </span>
                        )}
                        <Button onClick={handleSubmit} isLoading={isLoading} disabled={!input.trim()} className="w-full">
                            {isLoading ? "Running..." : "Run"}
                        </Button>
                        <button
                            onClick={() => setInput(toolMeta[tool].example)}
                            className="text-xs text-center text-text-muted dark:text-text-darkMuted py-1"
                        >
                            Tap to use example
                        </button>
                    </div>
                </div>

                {/* Result Output Area */}
                <div className="min-h-[100px]">
                    <AnimatePresence mode="wait">
                        {!result && !isLoading && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="bg-transparent border-dashed border-border-subtle dark:border-border-dark shadow-none">
                                    <p className="text-sm text-text-muted dark:text-text-darkMuted text-center py-8">
                                        {toolMeta[tool].emptyState}
                                    </p>
                                </Card>
                            </motion.div>
                        )}

                        {isLoading && (
                            <div className="flex justify-center py-12">
                                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            </div>
                        )}

                        {result && (
                            <ResultDisplay tool={tool} data={result} />
                        )}
                    </AnimatePresence>
                </div>
                <DevIndicator source={source} />
            </motion.div>
        </div>
    );
}
