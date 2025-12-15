import { Card } from "@/components/ui/Card";
import type { ClarifyResponse, SimplifyResponse, OrganizeResponse, PrioritizeResponse, StartResponse } from "@/lib/types";

export type Tool = "clarify" | "simplify" | "organize" | "prioritize" | "start";

export default function ResultDisplay({ tool, data }: { tool: Tool, data: any }) {
    switch (tool) {
        case "clarify":
            const clarify = data as ClarifyResponse;
            return (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="h-px bg-border-subtle dark:bg-border-dark w-full" />
                    <Section title="The Goal">
                        <p className="text-text-primary dark:text-text-darkPrimary font-medium">{clarify.goal}</p>
                    </Section>
                    <Section title="Action Items">
                        <ul className="space-y-2 text-text-secondary dark:text-text-darkSecondary list-disc pl-5">
                            {clarify.tasks?.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                    </Section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Section title="Constraints">
                            <ul className="space-y-1 text-text-secondary dark:text-text-darkSecondary list-disc pl-4 text-sm">
                                {clarify.constraints?.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                        </Section>
                        <Section title="Common Mistakes">
                            <ul className="space-y-1 text-text-secondary dark:text-text-darkSecondary list-disc pl-4 text-sm">
                                {clarify.mistakes?.map((m, i) => <li key={i}>{m}</li>)}
                            </ul>
                        </Section>
                    </div>
                    <Section title="Direction">
                        <Card className="bg-bg-subtle dark:bg-bg-darkSubtle shadow-none border-none p-4">
                            <p className="text-text-primary dark:text-text-darkPrimary italic">{clarify.direction}</p>
                        </Card>
                    </Section>
                </div>
            );

        case "simplify":
            const simplify = data as SimplifyResponse;
            return (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="h-px bg-border-subtle dark:bg-border-dark w-full" />
                    <Section title="Core Idea">
                        <p className="text-xl font-medium text-text-primary dark:text-text-darkPrimary">{simplify.core_idea}</p>
                    </Section>
                    <Section title="Key Points">
                        <ul className="space-y-2 text-text-secondary dark:text-text-darkSecondary list-disc pl-5">
                            {simplify.key_points?.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                    </Section>
                    <Section title="Simple Explanation">
                        <p className="text-text-secondary dark:text-text-darkSecondary leading-relaxed">{simplify.simple_explanation}</p>
                    </Section>
                </div>
            );

        case "organize":
            const organize = data as OrganizeResponse;
            return (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="h-px bg-border-subtle dark:bg-border-dark w-full" />
                    <Section title="Main Issue">
                        <p className="text-lg font-medium text-text-primary dark:text-text-darkPrimary">{organize.main_issue}</p>
                    </Section>

                    <div className="grid gap-6">
                        {organize.grouped_ideas?.map((group, i) => (
                            <Card key={i} className="bg-white dark:bg-bg-darkSubtle border border-border-subtle dark:border-border-dark shadow-sm p-4">
                                <h4 className="font-medium text-text-primary dark:text-text-darkPrimary mb-3 border-b border-border-subtle dark:border-border-dark pb-2">{group.group_name}</h4>
                                <ul className="space-y-1 text-text-secondary dark:text-text-darkSecondary list-disc pl-4 text-sm">
                                    {group.items?.map((item, j) => <li key={j}>{item}</li>)}
                                </ul>
                            </Card>
                        ))}
                    </div>

                    <Section title="Summary">
                        <p className="text-text-secondary dark:text-text-darkSecondary">{organize.summary}</p>
                    </Section>
                    <Section title="Next Step">
                        <div className="inline-block bg-bg-subtle dark:bg-bg-darkSubtle px-4 py-2 rounded-lg text-text-primary dark:text-text-darkPrimary font-medium">
                            {organize.next_step}
                        </div>
                    </Section>
                </div>
            );

        case "prioritize":
            const prioritize = data as PrioritizeResponse;
            return (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="h-px bg-border-subtle dark:bg-border-dark w-full" />
                    <Section title="Top Priorities">
                        <div className="space-y-4">
                            {prioritize.top_priorities?.map((p, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <span className="flex-none flex items-center justify-center w-8 h-8 rounded-full bg-text-primary dark:bg-primary text-white font-bold text-sm">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="font-medium text-text-primary dark:text-text-darkPrimary">{p.item}</p>
                                        <p className="text-sm text-text-muted dark:text-text-darkMuted">{p.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                    <Section title="Ignore For Now">
                        <div className="flex flex-wrap gap-2">
                            {prioritize.ignore_for_now?.map((item, i) => (
                                <span key={i} className="text-sm text-text-muted dark:text-text-darkMuted bg-bg-subtle dark:bg-bg-darkSubtle px-3 py-1 rounded-full border border-border-subtle dark:border-border-dark">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </Section>
                </div>
            );

        case "start":
            const start = data as StartResponse;
            return (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="h-px bg-border-subtle dark:bg-border-dark w-full" />
                    <Section title="The Objective">
                        <p className="text-xl font-medium text-text-primary dark:text-text-darkPrimary">{start.task}</p>
                    </Section>

                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-xl p-6">
                        <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest mb-2">First Step (2 Mins)</p>
                        <p className="text-2xl font-bold text-text-primary dark:text-green-50">{start.first_step}</p>
                    </div>

                    <Section title="After That">
                        <p className="text-text-secondary dark:text-text-darkSecondary">{start.after_that}</p>
                    </Section>
                </div>
            );

        default:
            return null;
    }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h3 className="text-xs font-bold text-text-muted dark:text-text-darkMuted uppercase tracking-widest">{title}</h3>
            <div>{children}</div>
        </div>
    );
}
