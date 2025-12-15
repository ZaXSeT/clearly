"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const [dark, setDark] = useState(false);
    // Use mounted state to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("theme");
        if (stored === "dark") {
            setDark(true);
            document.documentElement.classList.add("dark");
        } else if (stored === "light") {
            setDark(false);
            document.documentElement.classList.remove("dark");
        } else {
            const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDark(system);
            document.documentElement.classList.toggle("dark", system);
        }
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-lg text-text-secondary dark:text-text-darkSecondary hover:text-text-primary dark:hover:text-text-darkPrimary hover:bg-bg-subtle dark:hover:bg-bg-darkSubtle transition-colors focus:outline-none focus:ring-2 focus:ring-primary-soft"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                        scale: dark ? 0 : 1,
                        rotate: dark ? -90 : 0,
                        opacity: dark ? 0 : 1
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </motion.svg>

                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                        scale: dark ? 1 : 0,
                        rotate: dark ? 0 : 90,
                        opacity: dark ? 1 : 0
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
            </div>
        </button>
    );
}
