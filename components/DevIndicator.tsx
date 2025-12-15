export default function DevIndicator({
    source,
}: {
    source: "ai" | "fallback" | null;
}) {
    if (process.env.NODE_ENV !== "development") return null;
    if (!source) return null;

    return (
        <div className="fixed bottom-4 right-4 rounded-lg bg-neutral-900 text-white text-xs px-3 py-2 shadow-lg opacity-80 z-50 pointer-events-none">
            Source: {source === "ai" ? "AI" : "Fallback"}
        </div>
    );
}
