# Reddit post for issue 011

Target: r/programming (r/LocalLLaMA as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`Octoverse 2026: more than 40% of GitHub pull requests in September started with an agent's first draft, up from 17% in March`

## Body

I read the GitHub Octoverse 2026 report, last year's report, the Project HydraFusion announcement and the Copilot auto model selection changelog. Every number below comes from those sources. It is GitHub's own telemetry (October 1, 2025 to September 30, 2026), agent detection is a floor, and the report gives no defect or revert rates.

**Volume** ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

- 17.9 billion pushes, more than 2024 and 2025 combined. 34.3 billion commits, more than three times the level of two years ago.
- 1.3 billion merged pull requests, an average of 3.5 million a day.
- 2.5 billion public contributions, against 1.12 billion in the [2025 report](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/).
- Among repositories created this year, those with an agent configuration file logged eight times as many commits on average as those without.

**Pull requests.**

- More than 40% of pull requests in September 2026 started with an agent's first draft (17% in March). That is 110 million in one month.
- 87% of agent-started pull requests change multiple files, against 79% without detected agent involvement.
- 90% of agent-involved pull requests merged within two weeks in September (83% in February). The comparison group held at about 86%.
- Stacked pull requests launched as a preview on July 30 and more than 264,000 developers had used them by September.

**Models.**

- 61% of Copilot users who selected a model themselves used more than one in September, up from 50% four months earlier.
- Paid plans: 29 distinct models in May, 47 in September. No single model carried more than 25% of requests.
- Out of every 100 developer-selected requests: 38 general purpose, 37 deep reasoning and planning, 25 fast and lightweight.
- [Project HydraFusion](https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/) (research preview, September 4) picks single, cascade or critique per request. Offline, against Claude Opus 5: TerminalBench 2.1 +4.9 points at 67% lower cost, DeepSWE -1.5 points at 36% lower, CheckpointBench -0.1 points at 65% lower. The Octoverse report says it is now generally available as GitHub Copilot Fusion.

**Languages and projects.**

- TypeScript first, Python second, JavaScript third. TypeScript is the primary language in 35% of 2026 repositories with an agent signal and 24% of those without.
- Share of merged pull requests with detected AI involvement: about 40% to 44% for TypeScript, Python and Rust, about 21% to 34% for Java, C# and C++.
- Fastest-growing repositories by contributors: `farion1231/cc-switch`, `punkpeye/awesome-mcp-servers` and `omacom/omarchy` on the community side; `anthropics/claude-code`, `openai/codex` and `anomalyco/opencode` on the vendor side.

For teams that take agent-started pull requests: do they merge faster for you too, and what does your revert rate look like next to human-started ones?

Full write-up: thetrendtimes.com
