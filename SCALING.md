# How to Scale "Clearly"

To add the remaining tools (Simplify, Organize, Prioritize, Start), follow this pattern:

## 1. Create the Page
Duplicate `app/clarify/page.tsx` to `app/[tool]/page.tsx` (e.g., `app/simplify/page.tsx`).

## 2. Update the Interface
Update the TypeScript interface to match the required output structure for that tool (see PROJECT OVERVIEW).
For example, for **Simplify**:
```typescript
interface SimplifyResponse {
  core_idea: string;
  key_points: string[];
  simple_explanation: string;
}
```

## 3. Update the API Call
In the new page, change the `mode` parameter in the `fetch` call:
```typescript
body: JSON.stringify({ mode: "simplify", input }),
```

## 4. Update the Render Logic
Modify the UI in the component to display the new structured data (e.g., rendering "Key Points" instead of "Constraints").

## 5. Add System Prompt
In `app/api/ai/route.ts`, add a new entry to the `systemPrompts` object:
```typescript
const systemPrompts = {
  clarify: `...`,
  simplify: `You are an expert simplifier. Output JSON with keys: core_idea, key_points, simple_explanation...`,
  // Add organize, prioritize, start here
};
```

This architecture separates the specific logic (prompts/rendering) from the shared infrastructure (API routing, layout, components).
