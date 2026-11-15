# X thread for issue 011

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/octoverse-2026-coding-agents-github-workflows/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

Developers pushed code to GitHub 17.9 billion times in 12 months, more than in 2024 and 2025 combined.

That's from the Octoverse 2026 report (Oct 2025 to Sep 2026). We read it against four companion sources. What the telemetry says about coding agents:

### 2/7

Scale, per Octoverse 2026:

34.3B commits, over 3x two years ago
1.3B merged pull requests, 3.5M a day
2.5B public contributions, vs 1.12B in 2025
GitHub Actions: 1,440 jobs every second

New repos with an agent config file logged 8x the commits of those without.

### 3/7

By September 2026, more than 40% of pull requests on GitHub started with an agent's first draft. In March it was 17%.

110M agent-started PRs in September alone.
87% change multiple files (79% without agents).
90% merge within two weeks (about 86% without).

### 4/7

Model choice: 61% of Copilot users who pick their own model used more than one in September, up from 50% four months earlier.

Paid plans went from 29 models in May to 47. No single model carried more than 25% of requests. 63% of paying users tried auto selection.

### 5/7

HydraFusion routes a task across models: single, cascade or critique.

Offline results vs Claude Opus 5:
TerminalBench 2.1: +4.9 pts, 67% cheaper
DeepSWE: -1.5 pts, 36% cheaper
CheckpointBench: -0.1 pts, 65% cheaper

Octoverse says it's now GA as Copilot Fusion.

### 6/7

TypeScript stays #1. Among repos created in 2026, it's the primary language in 35% of those with an agent signal and 24% of those without.

This week: add AGENTS.md with build, test and "never" rules.
This month: route models per stage and gate CI on type checks.

### 7/7

Full analysis with the HydraFusion table, the community vs vendor repo ranking, five primary sources and a this-week / this-month checklist:
https://thetrendtimes.com/blog/octoverse-2026-coding-agents-github-workflows/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
