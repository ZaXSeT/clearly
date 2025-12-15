import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFallbackResponse } from "@/lib/fallback";

export async function POST(req: Request) {
    try {
        const { mode, input } = await req.json();

        if (!input || typeof input !== "string") {
            return NextResponse.json({ error: "Input is required." }, { status: 400 });
        }

        if (input.trim().length < 3) {
            return NextResponse.json({ error: "Input is too short. Please provide more detail." }, { status: 400 });
        }

        if (input.length > 5000) {
            return NextResponse.json({ error: "Input is too long. Please keep it under 5000 characters." }, { status: 400 });
        }

        // Define System Prompts per mode
        const systemPrompts: Record<string, string> = {
            clarify: `You are an expert at clarifying confusing instructions. 
      Analyze the input and output a JSON object with the following structure: 
      {
        "goal": "The core objective of the user's input.",
        "tasks": ["List of specific actionable items"],
        "constraints": ["List of limitations or rules identified"],
        "mistakes": ["List of potential pitfalls or common errors"],
        "direction": "A single clear guidance sentence on how to proceed."
      }
      Keep the tone strictly professional, calm, and objective. No conversational filler. JSON only. Be concise.`,

            simplify: `You are an expert at simplifying complex information.
      Analyze the input and output a JSON object with the following structure:
      {
        "core_idea": "The single most important concept.",
        "key_points": ["List of 3-5 critical takeaways"],
        "simple_explanation": "A paragraph explaining it to a 5-year-old or layperson."
      }
      Keep the tone calm and educational. JSON only. Be concise.`,

            organize: `You are an expert organizer.
      Analyze the unstructured input and output a JSON object with the following structure:
      {
        "main_issue": "The primary theme or problem.",
        "grouped_ideas": [
          { "group_name": "Category Name", "items": ["Item 1", "Item 2"] }
        ],
        "summary": "A brief summary of the organized thoughts.",
        "next_step": "The most logical immediate action."
      }
      Keep it structured and clean. JSON only. Be concise.`,

            prioritize: `You are an expert strategist.
      Analyze the list of tasks and output a JSON object with the following structure:
      {
        "top_priorities": [
          { "item": "High priority task", "reason": "Why this must be done first" }
        ],
        "ignore_for_now": ["List of tasks that can wait"]
      }
      Limit top_priorities to exactly 3 items. Be ruthless but rational. JSON only. Be concise.`,

            start: `You are an expert productivity coach helping users overcome inertia.
      Analyze the task and output a JSON object with the following structure:
      {
        "task": "The user's stated goal. Refine it to be specific.",
        "first_step": "A ridiculously small step that takes < 10 minutes.",
        "after_that": "The immediate follow-up step once momentum is built."
      }
      Focus on actionability and low friction. JSON only. Be concise.`,
        };

        const systemPrompt = systemPrompts[mode];

        if (!systemPrompt) {
            return NextResponse.json({ error: "Invalid mode selected." }, { status: 400 });
        }

        // Check for API Key
        const apiKey = process.env.GOOGLE_API_KEY;
        console.log("API Key present:", !!apiKey);

        // FALLBACK: If no API key is set, return a high-quality mock for demonstration/testing.
        if (!apiKey) {
            console.warn("GOOGLE_API_KEY not found, using mock response.");
            // Simulate network delay for realistic skeleton UI testing
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const mocks: Record<string, any> = {
                clarify: {
                    goal: "Demonstrate the 'Clarify' tool functionality without an active API key.",
                    tasks: ["Configure the .env.local file.", "Review the codebase structure.", "Test the UI."],
                    constraints: ["Requires an internet connection.", "Requires an API key."],
                    mistakes: ["Assuming the AI is broken when it returns this mock.", "Using this in production without adding the key."],
                    direction: "Add your GOOGLE_API_KEY to .env.local to unlock full AI capabilities."
                },
                simplify: {
                    core_idea: "Complexity is the enemy of execution.",
                    key_points: ["Mock data allows rapid UI testing.", "Real AI requires an API key.", "Simplicity scales."],
                    simple_explanation: "This is a pretend answer because you haven't given me the secret password (API Key) yet. Once you do, I'll be smart!"
                },
                organize: {
                    main_issue: "Unstructured Data Handling",
                    grouped_ideas: [
                        { group_name: "Frontend", items: ["React Components", "Tailwind Styles"] },
                        { group_name: "Backend", items: ["Next.js API Routes", "Google Gemini Integration"] }
                    ],
                    summary: "The application is split into clear concerns, but the API layer is currently in simulation mode.",
                    next_step: "Add the API Key to proceed."
                },
                prioritize: {
                    top_priorities: [
                        { item: "Add API Key", reason: "Required for real functionality." },
                        { item: "Test All Routes", reason: "Ensure no 404 errors exist." },
                        { item: "Deploy", reason: "Get it in front of users." }
                    ],
                    ignore_for_now: ["Advanced Analytics", "User Authentication", "Dark Mode Toggle"]
                },
                start: {
                    task: "Start using the Clearly App",
                    first_step: "Create a .env.local file in the root directory.",
                    after_that: "Paste your Google API key into that file."
                }
            };

            return NextResponse.json(mocks[mode] || { error: "Mock not found" });
        }

        // Real AI Call via Google Gemini
        const genAI = new GoogleGenerativeAI(apiKey);

        // Use 'gemini-flash-lite-latest' (confirmed available) but move system prompt to message body
        // to avoid potential support issues with systemInstruction on lite models.
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-lite-latest",
        });

        const combinedPrompt = `${systemPrompt}\n\nIMPORTANT: Return only raw JSON. No markdown formatting.\n\nUser Input:\n${input}`;

        try {
            const result = await model.generateContent({
                contents: [
                    { role: "user", parts: [{ text: combinedPrompt }] }
                ],
                generationConfig: {
                    responseMimeType: "application/json",
                }
            });

            const responseText = result.response.text();
            console.log("AI Raw Response:", responseText); // Debug: Log exact output

            if (!responseText) throw new Error("Empty response from AI");

            // Sanitize JSON if model adds markdown code blocks
            const cleanText = responseText.replace(/```json|```/g, "").trim();

            const responseData = JSON.parse(cleanText);
            return NextResponse.json({ result: responseData, source: "ai" });

        } catch (aiError: any) {
            console.error("AI Gen Failed Details:", aiError?.message, aiError?.response);
            console.warn("AI Generation Failed, attempting fallback to rule-based logic.", aiError);
            const fallbackData = getFallbackResponse(mode, input);
            return NextResponse.json({ result: fallbackData, source: "fallback" });
        }

    } catch (error: any) {
        console.error("API Route Fatal Error:", error);
        return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
    }
}



