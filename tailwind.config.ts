import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    DEFAULT: "#fafafa",
                    subtle: "#f5f5f5",
                    dark: "#0b0f1a",        // background utama
                    darkSubtle: "#111827", // card
                },
                text: {
                    primary: "#0f172a",
                    secondary: "#475569",
                    muted: "#94a3b8",
                    darkPrimary: "#e5e7eb",
                    darkSecondary: "#9ca3af",
                    darkMuted: "#6b7280",
                },
                border: {
                    subtle: "#e5e7eb",
                    dark: "#1f2933",
                },
                primary: {
                    DEFAULT: "#4f46e5", // Indigo-600-ish
                    hover: "#6366f1",   // Indigo-500-ish
                    soft: "rgba(79,70,229,.15)",
                    dark: "#6366f1",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            boxShadow: {
                soft: "0 1px 2px rgba(0,0,0,0.04)",
            },
        },
    },
    plugins: [],
};
export default config;
