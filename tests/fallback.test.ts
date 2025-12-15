import { describe, it, expect } from "vitest";
import {
    clarifyFallback,
    simplifyFallback,
    organizeFallback,
    prioritizeFallback
} from "../lib/fallback";

describe("Clarify Fallback", () => {
    it("returns structured output", () => {
        const input = "Create a short presentation about renewable energy for students.";
        const result = clarifyFallback(input);

        // Verify JSON structure keys are present
        expect(result).toHaveProperty("goal");
        expect(result).toHaveProperty("tasks");
        expect(result).toHaveProperty("constraints");
        expect(result).toHaveProperty("mistakes");
        expect(result).toHaveProperty("direction");

        // Verify content contains logic-derived values (not just hardcoded strings)
        expect(result.direction).toContain("create"); // extracted main verb
        expect(result.tasks.length).toBeGreaterThan(0);
    });

    it("handles very short input", () => {
        const result = clarifyFallback("Hi");
        expect(result.constraints).toContain("Input too short");
    });
});

describe("Simplify Fallback", () => {
    it("simplifies text into keys", () => {
        const result = simplifyFallback(
            "This is a complex explanation. It has many parts."
        );
        expect(result).toHaveProperty("core_idea");
        expect(result).toHaveProperty("key_points");
        expect(result.key_points).toBeInstanceOf(Array);
        expect(result.key_points.length).toBeGreaterThan(0);
    });
});

describe("Organize Fallback", () => {
    it("organizes text into grouped structure", () => {
        const result = organizeFallback(
            "Finish report, send email, prepare slides"
        );
        expect(result).toHaveProperty("grouped_ideas");
        expect(result.grouped_ideas[0].items.length).toBeGreaterThan(0);
    });
});

describe("Prioritize Fallback", () => {
    it("returns prioritized list", () => {
        const result = prioritizeFallback(
            "Study for exam, submit assignment, group meeting"
        );
        expect(result.top_priorities.length).toBeGreaterThan(0);
        expect(result.top_priorities[0]).toHaveProperty("item");
        expect(result.top_priorities[0]).toHaveProperty("reason");
    });
});
