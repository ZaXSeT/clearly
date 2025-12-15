export type Tool = "clarify" | "simplify" | "organize" | "prioritize" | "start";

export const toolMeta: Record<
    Tool,
    {
        title: string;
        description: string;
        placeholder: string;
        example: string;
        emptyState: string;
    }
> = {
    clarify: {
        title: "Clarify",
        description:
            "Understand what is actually being asked before taking action.",
        placeholder:
            "Paste a task, question, or instruction you want to understand better…",
        example:
            "Create a short presentation explaining cloud computing for non-technical students.",
        emptyState:
            "Paste a task or question above, then click Run to see a clearer breakdown.",
    },
    simplify: {
        title: "Simplify",
        description:
            "Reduce complex text into clear and easy-to-read points.",
        placeholder:
            "Paste a paragraph or explanation you want to make simpler…",
        example:
            "Cloud computing refers to the delivery of computing services over the internet, including servers, storage, databases, and software.",
        emptyState:
            "Paste text above to turn it into simpler, easier-to-read points.",
    },
    organize: {
        title: "Organize",
        description:
            "Turn unstructured text into a clean, organized list.",
        placeholder:
            "Paste messy notes, ideas, or a list that needs organizing…",
        example:
            "Finish report, email lecturer, prepare slides, review notes",
        emptyState:
            "Paste notes or ideas above to see them organized into a clean list.",
    },
    prioritize: {
        title: "Prioritize",
        description:
            "Decide what matters most and what should be done first.",
        placeholder:
            "Paste tasks, goals, or to-do items you want to prioritize…",
        example:
            "Study for exam, submit assignment, group meeting, revise notes",
        emptyState:
            "Paste tasks above to see a suggested order of importance.",
    },
    start: {
        title: "Start",
        description:
            "Overcome inertia by identifying the very first small step.",
        placeholder:
            "Paste a goal or project you want to get started on…",
        example:
            "I want to learn how to code but I don't know where to start.",
        emptyState:
            "Paste a large goal or project above to break it down into an immediate first step.",
    }
};
