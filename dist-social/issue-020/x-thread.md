# X thread for issue 020

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/coding-agent-harnesses-2026-what-swapping-tools-buys/
- Length rule: every tweet stays under 280 characters, 230 to 265 preferred. X counts any URL as 23 characters. No em dashes.
- Tweet 7 carries only the thetrendtimes.com link, so X attaches the article card and no other domain.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

Swap Claude Code for OpenCode on the same model and 45 hard SWE-bench Verified tasks: 13% of task outcomes change at the median.

Rerun Claude Code with nothing changed: also 13%.

Six November 2026 sources on what a coding agent harness buys:

### 2/7

The paper ran seven models through Claude Code, mini-SWE-agent and OpenCode, offline.

Averaged over models, harness gaps on hard tasks were 0.4 to 1.5 points, all inside the noise. On 445 tasks, 8 of 12 single-model gaps were bounded within 5 points.

### 3/7

Pairings break the pattern. With Qwen3.8-27B, OpenCode trailed by 8 to 9 points: it does not continue responses cut off at the output cap.

With DeepSeek-V4.1-Flash on hard tasks, the same OpenCode led mini-SWE-agent by 14 points.

### 4/7

Cost is where harnesses split. Same model, same tasks: 3.2 to 4.0x per trial with GLM-5.3-Flash, under 10% with Claude Opus 5.5.

Preamble per step: Claude Code 16.6k tokens, OpenCode 7.0k, mini-SWE-agent 0.8k. Step count can outweigh it.

### 5/7

GitHub's new Harnesses view compares Copilot CLI, Claude Code and Codex CLI on one model, with run-to-run spread drawn in.

Copilot Fusion, which routes across models, posted 71.2% on Terminal-Bench 4.1, 5.4 points above Opus 5.5 and Fable 5.2.

### 6/7

Kotlin Benchmark 2.0: Claude Code with Opus 5.5 led at 75.3% and $0.84 per task. On private code, OpenCode with DeepSeek V4.1 Flash hit 58.9% at $0.08.

sudo L7 grades judgment, not tests alone: the top model passes 52.2% of attempts.

### 7/7

This week: run your task set twice in your current harness and treat any harness gain smaller than that gap as unproven. Then log cost per task per harness.

Full analysis with all six sources:
https://thetrendtimes.com/blog/coding-agent-harnesses-2026-what-swapping-tools-buys/

Weekly: subscribe at thetrendtimes.com
