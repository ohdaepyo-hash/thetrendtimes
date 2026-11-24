# Reddit post for issue 020

Target: r/ClaudeCode (r/AI_Agents as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`Swapping coding agent harnesses moves pass rates about as much as a rerun. Notes from 6 November 2026 sources`

## Body

I read six sources from November 2026 on how much the harness (system prompt, tools, context handling) matters next to the model. Each uses its own tasks, so I kept each number with its source.

**Harness swap vs rerun** ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2), seven models, Claude Code 2.1 / mini-SWE-agent 2.4.6 / OpenCode 1.18, SWE-bench Verified, offline).

- On the 45 hardest tasks, a harness swap flips 13% of task outcomes at the median. A plain rerun also flips 13%. A model swap flips 26%.
- Averaged over seven models, the harness gaps are 0.4 to 1.5 points, and every 95% interval covers zero. On 445 other tasks, 8 of 12 single-model gaps are bounded within 5 points.
- Exceptions depend on the pairing: OpenCode trails by 8 to 9 points with Qwen3.8-27B (it does not continue responses cut off at the output cap) and leads mini-SWE-agent by 14 points with DeepSeek-V4.1-Flash on the hard set.

**Cost** (same paper).

- Same model, same tasks: the priciest harness costs 3.2 to 4.0x the cheapest per trial with GLM-5.3-Flash, and under 10% more with Claude Opus 5.5.
- Preamble per step: Claude Code 16.6k tokens, OpenCode 7.0k, mini-SWE-agent 0.8k. With DeepSeek-V4-Flash, mini-SWE-agent took 141 steps to Claude Code's 104 and used the most tokens.

**Other benchmarks** (not comparable with each other).

- [Kotlin Benchmark 2.0](https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/): Claude Code with Opus 5.5 led the 100-task suite at 75.3% and $0.84 per task. On private code, OpenCode with DeepSeek V4.1 Flash reached 58.9% at $0.08.
- [GitHub](https://github.blog/changelog/2026-11-17-github-copilot-fusion-updates-more-availability-benchmarks-and-models/): Copilot Fusion Max, which routes across models, reports 71.2% on Terminal-Bench 4.1. GitHub also added a [harness comparison view](https://github.blog/changelog/2026-11-17-github-copilot-benchmarks-site-adds-harness-comparisons/) with run-to-run spread drawn in.
- [sudo L7](https://arxiv.org/abs/2611.30517): 60 tasks graded on 1,287 hidden criteria, more than half of the gating ones beyond functional correctness. Top pass rate is 52.2%.

What I could not find: any source that tests Copilot CLI, Codex CLI or Junie against reruns the way the arXiv paper does. Has anyone measured their own rerun spread before switching harnesses?

Full write-up with sources: https://thetrendtimes.com/blog/coding-agent-harnesses-2026-what-swapping-tools-buys/
