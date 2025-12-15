import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft disabled:pointer-events-none disabled:opacity-70 h-10 px-5 py-2.5",
                    {
                        "bg-primary dark:bg-primary-dark text-white hover:bg-primary-hover shadow-sm": variant === "primary",
                        "bg-bg-subtle text-text-primary hover:bg-bg dark:bg-bg-darkSubtle dark:text-text-darkPrimary dark:hover:bg-bg-dark": variant === "secondary",
                        "border border-border-subtle dark:border-border-dark bg-transparent hover:bg-bg-subtle dark:hover:bg-bg-darkSubtle text-text-secondary dark:text-text-darkSecondary": variant === "outline",
                        "hover:bg-bg-subtle dark:hover:bg-bg-darkSubtle hover:text-text-primary dark:hover:text-text-darkPrimary": variant === "ghost",
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";
