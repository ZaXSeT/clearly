/* ========== UTILITIES ========== */

function splitSentences(text: string): string[] {
    return text
        .split(/[.!?]\s*/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
}

function extractBulletCandidates(text: string): string[] {
    // Split by newlines, commas, or common bullet markers
    return text
        .split(/[\n,;]|- \s*/)
        .map(s => s.trim())
        .filter(s => s.length > 3);
}

function extractMainVerb(text: string): string {
    const verbs = [
        "analyze", "explain", "create", "build", "write",
        "design", "compare", "summarize", "solve",
        "implement", "review", "fix", "improve", "clarify", "organize", "prioritize"
    ];

    const lower = text.toLowerCase();
    return verbs.find(v => lower.includes(v)) || "understand";
}

function detectConstraints(text: string): string[] {
    const constraints: string[] = [];
    const lower = text.toLowerCase();

    if (lower.includes("deadline") || lower.includes("due") || lower.includes("by")) {
        constraints.push("Time-related requirement detected");
    }
    if (lower.includes("word") || lower.includes("page") || lower.includes("limit")) {
        constraints.push("Length or volume constraint detected");
    }
    if (lower.includes("format") || lower.includes("pdf") || lower.includes("ppt") || lower.includes("json")) {
        constraints.push("Specific output format detected");
    }
    if (lower.includes("no ") || lower.includes("without") || lower.includes("don't")) {
        constraints.push("Explicit restrictions mentioned");
    }

    return constraints.length > 0 ? constraints : ["No explicit constraints found"];
}

function detectTaskType(text: string): string {
    if (text.trim().endsWith("?")) return "Question";
    const lower = text.toLowerCase();
    if (lower.startsWith("how") || lower.startsWith("what") || lower.startsWith("why")) {
        return "Question";
    }
    return "Instruction or task";
}

/* ========== FALLBACK IMPLEMENTATIONS ========== */

export function clarifyFallback(input: string) {
    const text = input.trim();
    if (text.length < 15) {
        return {
            goal: "Clarify the task or request",
            tasks: ["Determine intent"],
            constraints: ["Input too short"],
            mistakes: ["Providing insufficient context"],
            direction: "Add more details such as the goal, expected output, or context."
        };
    }

    const sentences = splitSentences(text);
    const coreSentence = sentences[0] || text;
    const taskType = detectTaskType(text);
    const mainVerb = extractMainVerb(text);
    const constraints = detectConstraints(text);

    return {
        goal: taskType === "Question" ? "Understand what information is being asked." : "Understand what action needs to be taken.",
        tasks: [
            coreSentence,
            ...(sentences.length > 1 ? sentences.slice(1, 4) : ["Review implicit requirements."])
        ],
        constraints: constraints,
        mistakes: [
            "Misinterpreting the main request",
            "Focusing on details before understanding the core task",
            "Adding assumptions not stated in the input"
        ],
        direction: `First ${mainVerb} the core request, then check if additional requirements or constraints need to be addressed.`
    };
}

export function simplifyFallback(input: string) {
    const sentences = splitSentences(input);
    const core = sentences[0] || input;

    return {
        core_idea: core.length > 100 ? core.substring(0, 100) + "..." : core,
        key_points: sentences.slice(0, 4).map(s => s.length > 10 ? s : null).filter(Boolean) as string[],
        simple_explanation: sentences.length > 0 ? `Simplified: ${sentences.join(". ")}` : "The text is too short to simplify further."
    };
}

export function organizeFallback(input: string) {
    const bullets = extractBulletCandidates(input);
    const mainIssue = splitSentences(input)[0] || "General Input";

    return {
        main_issue: mainIssue.length > 50 ? "Content Organization" : mainIssue,
        grouped_ideas: [
            {
                group_name: "Identified Points",
                items: bullets.slice(0, 10)
            },
            {
                group_name: "Notes",
                items: ["Automatically extracted from text", "Review for completeness"]
            }
        ],
        summary: "The input has been broken down into distinct points for better readability.",
        next_step: "Review the organized list above and categorize if necessary."
    };
}

export function prioritizeFallback(input: string) {
    const items = extractBulletCandidates(input);

    return {
        top_priorities: items.slice(0, 3).map((item, i) => ({
            item: item,
            reason: i === 0 ? "Identified as the most immediate task based on structure." : "Sequential priority logic."
        })),
        ignore_for_now: items.slice(3, 8)
    };
}

export function startFallback(input: string) {
    const sentences = splitSentences(input);

    return {
        task: sentences[0] || "Get Started",
        first_step: "Define the very first small action you can take in under 2 minutes.",
        after_that: "Once started, review the remaining requirements."
    };
}

/* ========== MAIN EXPORT ========== */

export function getFallbackResponse(mode: string, input: string) {
    switch (mode) {
        case "clarify": return clarifyFallback(input);
        case "simplify": return simplifyFallback(input);
        case "organize": return organizeFallback(input);
        case "prioritize": return prioritizeFallback(input);
        case "start": return startFallback(input);
        default: return { error: "Fallback not available for this mode" };
    }
}
