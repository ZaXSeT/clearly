import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("rounded-2xl border border-border-subtle dark:border-border-dark bg-white dark:bg-bg-darkSubtle shadow-soft p-4 sm:p-6", className)}
            {...props}
        />
    );
}
