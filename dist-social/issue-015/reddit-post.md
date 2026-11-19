# Reddit post for issue 015

Target: r/AI_Agents (r/ClaudeCode as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`Enterprises planned 1.9x AI spend growth and hit 4.7x on average. Notes on agent costs and pricing from 5 primary sources`

## Body

I read five reports from October and November 2026 on what agents are doing to AI budgets and pricing. They use different samples, so I kept each number with its own survey.

**Spend** ([Menlo Ventures](https://menlovc.com/perspective/2026-the-state-of-enterprise-ai/), nearly 400 U.S. decision-makers plus a run-rate model).

- Deployment spend: $33B last year, a $176.8B annualized run rate by September 2026.
- Planned growth 1.9x, actual average 4.7x. The median is calmer: 2.2x against 1.8x planned.
- Adoption only went from 55% to 65%. Menlo puts the gap down to agents running in parallel and scaling with work, not headcount.
- On OpenRouter, agents generate 80% of tokens (about 130.9T per week). OpenRouter skews toward developers and startups, so read it as a leading indicator.

**Cost traps** ([Cloudera](https://www.cloudera.com/about/news-and-blogs/press-releases/2026-10-26-the-ai-scale-trap-why-89-of-enterprises-are-forced-to-redesign-ai-use-cases-amid-rising-costs.html), 1,500 global IT leaders, separate sample).

- 89% limited or redesigned use cases because of token consumption.
- 98% pulled back a deployment after failures, hallucinations or unexpected behavior.
- 45% moved workloads over cost, but 58% say a move needs moderate or major redesign.

**Unit economics** (same Menlo report). Cache reads can be 95%+ of an agent's tokens. With Opus 5.5 at $0.20/M cache reads, $4 fresh input and $20 output, a 3%/2% mix comes to about $0.70 per million tokens. Per-token price falls while total spend climbs.

**Pricing** ([Stripe on Monetize 2026](https://stripe.com/blog/economics-of-ai-monetization), [Stripe platform survey](https://stripe.com/blog/saas-platform-trends-in-AI-era), [a16z](https://a16z.com/how-ai-applications-earn-their-premium/)).

- Replit charged 25¢ per agent checkpoint until long runs cost it several dollars each, then switched to usage billing.
- Clay split data credits from orchestration actions and passes reasoning-model token cost through with no markup.
- Seat-first SaaS platforms: 16% in 2026, 11% expected in 2027. One in four plan seats plus separate agent billing.
- a16z says to price on the full cost of a completed task: retries, evaluation, human review and failed attempts included.

Question for people running agents in production: do you track cost per finished task, or only per token? And what share of your tokens are cache reads?

Full write-up with all links: https://thetrendtimes.com/blog/enterprise-ai-spend-177b-cost-traps-pricing-shifts/
