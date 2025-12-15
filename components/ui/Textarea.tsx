import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    "flex min-h-[140px] sm:min-h-[160px] w-full rounded-xl border border-border-subtle dark:border-border-dark bg-white dark:bg-bg-darkSubtle px-3 py-3 sm:px-4 sm:py-4 text-sm sm:text-base leading-relaxed text-text-primary dark:text-text-darkPrimary placeholder:text-text-muted dark:placeholder:text-text-darkMuted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-colors",
                    className
                )}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";
