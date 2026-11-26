// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "The Trend Times";
export const SITE_DESCRIPTION =
	"Signals, Not Noise. Independent 30-day technology intelligence from communities, builders, and markets.";

export const CATEGORIES = {
	agents: "AI Agents",
	saas: "Micro-SaaS",
	sentiment: "Raw Sentiment",
	market: "Market Signals",
	tools: "Dev Tools",
} as const;
export type Category = keyof typeof CATEGORIES;
export const CATEGORY_KEYS = Object.keys(CATEGORIES) as [Category, ...Category[]];

// ~230 words per minute, minimum one minute.
export const readMinutes = (body = "") => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 230));

// One-line scope for each category hub (/category/<key>/).
export const CATEGORY_BLURBS: Record<Category, string> = {
	agents: "How AI agents are built, benchmarked and run in production: protocols, evaluations, failure modes and the data behind adoption claims.",
	saas: "The economics of small software businesses: pricing, churn, payments data and what changes when AI enters the product.",
	sentiment: "What developers and buyers report in surveys and public data: trust, adoption and the gap between AI claims and daily practice.",
	market: "Spending, token pricing and platform activity data that show where technology money and developer time are moving.",
	tools: "Developer tooling for AI coding: open standards such as AGENTS.md and MCP, coding-agent harnesses and the benchmarks used to judge them.",
};
