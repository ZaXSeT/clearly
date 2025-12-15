export interface ClarifyResponse {
    goal: string;
    tasks: string[];
    constraints: string[];
    mistakes: string[];
    direction: string;
}

export interface SimplifyResponse {
    core_idea: string;
    key_points: string[];
    simple_explanation: string;
}

export interface OrganizeResponse {
    main_issue: string;
    grouped_ideas: { group_name: string; items: string[] }[];
    summary: string;
    next_step: string;
}

export interface PrioritizeResponse {
    top_priorities: { item: string; reason: string }[];
    ignore_for_now: string[];
}

export interface StartResponse {
    task: string;
    first_step: string;
    after_that: string;
}
