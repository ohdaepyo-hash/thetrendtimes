# Hacker News submission for issue 020

Draft only; not submitted.

URL: https://thetrendtimes.com/blog/coding-agent-harnesses-2026-what-swapping-tools-buys/

## Title candidates (HN limit: 80 characters)

1. `Swapping coding agent harnesses flips as many task outcomes as a plain rerun`
2. `Same model, different coding agent harness: pass rates flat, costs up to 4x`
3. `Claude Code's 16.6k-token preamble vs mini-SWE-agent's 0.8k: what it buys`

Pick 1 by default. Candidate 2 is the cost angle; use it if a benchmark thread is already on the front page.

## First comment by the submitter

> The post reads six November 2026 sources, each with its own tasks:
>
> - Liu and Han, arXiv 2610.04433v2 (https://arxiv.org/abs/2610.04433v2): seven models in Claude Code, mini-SWE-agent and OpenCode on SWE-bench Verified, offline, with reruns. On the 45 hardest tasks a harness swap flips 13% of outcomes at the median, the same as a rerun; a model swap flips 26%. Exceptions are pairings: OpenCode -8 to 9 points with Qwen3.8-27B (output cap truncation), +14 vs mini-SWE-agent with DeepSeek-V4.1-Flash. Cost per trial differs 3.2 to 4.0x on GLM-5.3-Flash and under 10% on Claude Opus 5.5.
> - GitHub (https://github.blog/changelog/2026-11-17-github-copilot-benchmarks-site-adds-harness-comparisons/): new harness view, Copilot CLI vs Claude Code vs Codex CLI on matched models with run-to-run spread. Copilot Fusion Max reports 71.2% on Terminal-Bench 4.1.
> - JetBrains Kotlin Benchmark 2.0 (https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/): 100 tasks, 13 configurations, three runs each; Claude Code with Opus 5.5 led at 75.3% and $0.84 per task.
> - Vercel eve 1.0 (https://vercel.com/blog/eve-is-now-generally-available): open-source harness, median turn overhead 3.036s to 414ms.
> - sudo L7 (https://arxiv.org/abs/2611.30517): 60 staff-level tasks, 1,287 hidden criteria; top pass rate 52.2%.
>
> Caveats: the paper runs non-coding benchmarks on one model only, GitHub and Vercel figures are vendor-reported, and none of the six puts its scores on a common scale. Has anyone here measured rerun spread on their own tasks before switching agents?
