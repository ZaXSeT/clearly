"use client";

import { motion } from "framer-motion";

type Tool = "clarify" | "simplify" | "organize" | "prioritize" | "start";

interface Props {
    value: Tool;
    onChange: (tool: Tool) => void;
}

const tools: { id: Tool; label: string }[] = [
    { id: "clarify", label: "Clarify" },
    { id: "simplify", label: "Simplify" },
    { id: "organize", label: "Organize" },
    { id: "prioritize", label: "Prioritize" },
    { id: "start", label: "Start" },
];

export default function ToolSwitch({ value, onChange }: Props) {
    return (
        <div className="flex w-full sm:inline-flex sm:w-auto flex-wrap rounded-xl border border-border-subtle dark:border-border-dark bg-bg-subtle dark:bg-bg-darkSubtle p-1 gap-1 shadow-sm">
            {tools.map(tool => (
                <motion.button
                    key={tool.id}
                    onClick={() => onChange(tool.id)}
                    layout
                    transition={{ duration: 0.15 }}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
            ${value === tool.id
                            ? "bg-white dark:bg-bg-dark text-text-primary dark:text-text-darkPrimary shadow-sm border border-border-subtle dark:border-border-dark"
                            : "text-text-secondary dark:text-text-darkSecondary hover:text-text-primary dark:hover:text-text-darkPrimary hover:bg-bg dark:hover:bg-bg-dark"
                        }`}
                >
                    {tool.label}
                </motion.button>
            ))}
        </div>
    );
}
