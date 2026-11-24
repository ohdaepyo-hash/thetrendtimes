---
title: "Coding Agent Harnesses 2026: What Swapping Tools Buys"
description: "Swapping Claude Code, OpenCode, or mini-SWE-agent moves pass rates only 2 to 5 points while costs swing up to 4x. Compare 2026 harness benchmarks."
pubDate: 2026-11-25
category: tools
sources:
  - label: "arXiv 2610.04433v2: What Does a Harness Buy? Tokens, Mostly. (Liu and Han, 2026-11-18)"
    url: "https://arxiv.org/abs/2610.04433v2"
  - label: "GitHub Changelog: GitHub Copilot benchmarks site adds harness comparisons (2026-11-17)"
    url: "https://github.blog/changelog/2026-11-17-github-copilot-benchmarks-site-adds-harness-comparisons/"
  - label: "GitHub Changelog: GitHub Copilot Fusion updates: more availability, benchmarks, and models (2026-11-17)"
    url: "https://github.blog/changelog/2026-11-17-github-copilot-fusion-updates-more-availability-benchmarks-and-models/"
  - label: "JetBrains: Kotlin Benchmark 2.0: How AI Coding Agents Handle Harder Tasks and Closed-Source Code (2026-11-23)"
    url: "https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/"
  - label: "Vercel: Introducing eve 1.0 (2026-11-17)"
    url: "https://vercel.com/blog/eve-is-now-generally-available"
  - label: "arXiv 2611.30517: sudo L7: Can Coding Agents Act Like Staff Engineers? (Surge AI, 2026-11-23)"
    url: "https://arxiv.org/abs/2611.30517"
---

Take one model, swap Claude Code for OpenCode, and rerun 45 hard SWE-bench Verified tasks. At the median, the swap changes the outcome of 13% of tasks. Rerun Claude Code with nothing changed, and the median is also 13% ([Liu and Han, arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

That result, from a Shandong University paper revised on November 18, 2026, cuts against a common belief. Vendors credit their harness for score gains, and teams switch coding agents on the strength of one leaderboard row. If you choose tools for a team, you have probably wondered how much of a gap survives a second run.

This piece reads six primary sources from November 17 to 23: two arXiv papers, two GitHub changelogs, a JetBrains benchmark and [Vercel's eve 1.0 launch](https://vercel.com/blog/eve-is-now-generally-available). Together they point one way. A harness swap alone moves pass rates about as much as rerun noise, while cost per task can move three to four times on one model. The real differences sit in model pairings, multi-model routing and stricter grading. Each source uses its own tasks, so every number stays with its source.

## What a Harness Adds Beyond the Model

The paper starts from a plain definition. A coding agent is a language model inside a harness: the system prompt, the tools and the context management that let a chat model work in a repository. Claude Code, OpenCode and mini-SWE-agent are harnesses. Claude Opus 5.5 or DeepSeek-V4.1-Flash is the model inside ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

Vercel's eve 1.0 describes it from the builder's side. Its harness is the loop that calls models, runs tools and delegates work to subagents, and the team that deploys it picks the model, tools, instructions and which actions need approval. Vercel shipped 230+ releases between the June preview and general availability ([Vercel, Nov 2026](https://vercel.com/blog/eve-is-now-generally-available)).

A harness also owns overhead the model never sees. In Vercel's hosted stress test, 100 turns with an instant mock-model reply and no tool calls, median turn latency fell from 3.036 seconds at the September 1 baseline to 414 milliseconds in version 1.0.0 on November 15. The p95 fell to 633 milliseconds ([Vercel](https://vercel.com/blog/eve-is-now-generally-available)). That test isolates harness and workflow time, not answer quality. Whether a harness also sets the pass rate is what the first paper tests.

## Why a Harness Swap Moves Scores Like a Rerun

Liu and Han ran seven models through three production harnesses: Claude Code 2.1, mini-SWE-agent 2.4.6 and OpenCode 1.18. SWE-bench Verified, a set of real GitHub issues with tests, was split in two. Hard45 holds the 45 tasks in the two hardest difficulty bands, and pool447 holds the other 447, of which 445 can be scored ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

Every run was offline, with traffic limited to the model endpoint. In early runs with web access, 71% of DeepSeek and Qwen trials fetched the upstream fix from GitHub, so those runs were thrown out ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

On hard45, averaged over seven models, Claude Code sits 0.4 points above mini-SWE-agent and 1.5 above OpenCode. Mini-SWE-agent sits 1.1 above OpenCode. All three 95% intervals cover zero, and each harness has the top pass rate on some model ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

Pool447 is large enough to put a ceiling on the gap. Eight of the 12 single-model harness comparisons there are bounded within 5 points. Averaged over four models, Claude Code and mini-SWE-agent differ by 0.2 points, with a 90% interval of −0.9 to +1.2 ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

The sharper test is the flip rate, the share of tasks that pass in one run and fail in the other. On hard45, reruns flip 13% of tasks at the median, harness swaps 13% and model swaps 26%. With DeepSeek-V4.1-Flash on pool447, a harness swap flips 7 to 8% and a rerun 6 to 8%. Edited files agree too: Jaccard similarity is 0.80 for reruns, 0.79 for harness swaps and 0.74 for model swaps ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

Noise sets the floor for any claim. Two runs on hard45 disagree on about six tasks, so a 13-point gap is caught only about half the time. On 445 tasks, a gap of about 5 points is caught with 80% probability. The paper also cites earlier work where 10 reruns of one setup on SWE-bench Verified spread by 2.2 to 6.0 points (Bjarnason et al., 2026, cited in [arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

## Where Model and Harness Pairings Break the Pattern

The averages hide pairings that move a lot. With Qwen3.8-27B on pool447, OpenCode trails Claude Code and mini-SWE-agent by 8 to 9 points. That is more than this task set's 5-point detection floor ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

The trials point at the output cap. Claude Code's responses hit the cap in 52 trials, and it prompted the model to continue. OpenCode does not continue a cut-off response, and 34 of its trials ended that way, all but one of them failing. On the affected tasks, a larger cap lifted OpenCode from 86 to 99 passes out of 146 trials ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

The direction flips with another model. With DeepSeek-V4.1-Flash on hard45, OpenCode passed 27 of 45 tasks in each of two runs, while mini-SWE-agent passed 21 and 20. That is a 14-point lead, with a 90% interval of 7 to 23. On pool447, the same two harnesses land within 2 points of each other ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

Claude Opus 5.5 runs natively in all three harnesses, the setting most favorable to Claude Code. On hard45, Claude Code passed 36, 37 and 36 tasks over three runs, against 37 for mini-SWE-agent and 38 for OpenCode. On pool447 its lead of about 2 points did not survive correction for multiple comparisons ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

So "which harness is best" has no answer apart from the model. Ask which pairing works for yours.

## How Token Spend Swings Four Times on One Model

Cost is where harnesses part ways. For the same model on the same tasks, the priciest harness costs 3.2 to 4.0 times the cheapest per trial with GLM-5.3-Flash on hard45. The ratio is 1.7 to 2.0 for HY4-Preview and 1.5 for DeepSeek-V4-Flash. It drops to 1.3 for DeepSeek-V4.1-Flash on hard45, 1.03 on pool447 and 1.08 for Claude Opus 5.5 ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

The extra spend bought no detectable gain. With GLM-5.3-Flash over two runs, Claude Code passed 41 of 90 trials and OpenCode 36. A solved task cost 4.28 CNY under Claude Code against 1.36 CNY under OpenCode, about 3.15 times as much ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

Three terms drive the bill. The first is the preamble sent with every step, meaning the system prompt plus tool definitions: 16.6k tokens in Claude Code, 7.0k in OpenCode and 0.8k in mini-SWE-agent. The second is what the history keeps, and Claude Code also keeps the model's own reasoning. The third is the number of steps ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

Step count can outweigh the preamble. With DeepSeek-V4-Flash on hard45, mini-SWE-agent took 141 steps to Claude Code's 104. Its history grew with each step, and the lightest harness ended up consuming the most tokens ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)). A short system prompt does not promise a small bill.

## What GitHub's Harness View Measures

On November 17, GitHub added a Harnesses view to its Copilot benchmarks site, in public preview. It compares GitHub Copilot CLI with Claude Code and Codex CLI on the same model at medium reasoning effort ([GitHub Changelog, harness view](https://github.blog/changelog/2026-11-17-github-copilot-benchmarks-site-adds-harness-comparisons/)).

A scatter plot places each result by resolution rate against mean cost per task, with shaded ellipses for run-to-run variation. A paired panel shows Copilot CLI's advantage in points and its cost savings in percent, with approximate 95% bootstrap intervals ([GitHub Changelog, harness view](https://github.blog/changelog/2026-11-17-github-copilot-benchmarks-site-adds-harness-comparisons/)). Copilot-only setups such as Copilot Fusion, and results without an exact model match, are left out.

The same update added Terminal-Bench-Science 0.1, with tasks written by experts in five science domains ([GitHub Changelog](https://github.blog/changelog/2026-11-17-github-copilot-benchmarks-site-adds-harness-comparisons/)). The harness view follows the paper's advice to show rerun spread next to the gap. The changelog gives no scores, and it is GitHub grading its own harness.

Fusion is the other GitHub story. Copilot Fusion picks and coordinates several models for each task at an effort level the user sets. On the public Terminal-Bench 4.1 leaderboard, hosted by Stanford, Harbor and the Laude Institute, Copilot Fusion Max posted a 71.2% resolution rate. GitHub puts that 5.4 points ahead of Opus 5.5 and Fable 5.2, at 88% lower cost than Fable 5.2 and 57% lower than Opus 5.5 ([GitHub Changelog, Fusion](https://github.blog/changelog/2026-11-17-github-copilot-fusion-updates-more-availability-benchmarks-and-models/)).

Fusion is now selectable on github.com, Visual Studio and GitHub Mobile beta, and Claude Sonnet 5.5 joins Fusion Max. A router that changes the model per task acts more like a model swap than a harness swap. In the harness paper, model swaps flipped 26% of hard tasks, twice the harness rate ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)).

## Why Kotlin Benchmark 2.0 Ranks Configurations

JetBrains ranks agent and model configurations, not harnesses or models alone. Kotlin Benchmark 2.0 has 100 tasks. Seventy come from 25 open-source repositories, and 30 from private JetBrains server-side projects. The July release had 105 tasks, and scores do not compare across versions ([JetBrains, Nov 2026](https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/)).

Open-source tasks run in a sandbox that allows only model calls, because preliminary runs caught agents fetching published fixes. Each task gets 30 minutes, and every configuration runs the full suite three times.

On the full suite, Claude Code with Opus 5.5 led at 75.3% and $0.84 per task. The other 12 configurations resolved 54.3% to 73.7% of tasks at $0.02 to $3.14 per task ([JetBrains](https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/)).

| Task split ([JetBrains](https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/)) | Configuration | Resolved | Cost per task |
|---|---|---|---|
| Open-source | Claude Code with Fable 5.1 | 86.2% | $2.38 |
| Open-source | Claude Code with Opus 5.5 | 84.8% | $0.68 |
| Open-source | Junie using Opus 5.5 and GPT 6 Luna | 79.5% | $0.33 |
| Closed-source | Antigravity CLI with Gemini 3.8 Flash | 60% | $1.74 |
| Closed-source | OpenCode with DeepSeek V4.1 Flash | 58.9% | $0.08 |

The split shows the pairing effect at a different scale. On open-source code, the leader costs 3.5 times as much per task as the runner-up for 1.4 more points. On private code, OpenCode with DeepSeek V4.1 Flash costs $0.08 per task and lands 1.1 points behind a $1.74 setup. JetBrains counts a task as done only when the patch passes the required tests, and calls its scores a comparison signal, not a guarantee ([JetBrains](https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/)).

## What Staff-Level Grading Tests Besides Passing Tests

Every score so far has one judge: the tests. Surge AI's sudo L7, posted November 23, grades what tests miss. Engineers at staff level or above wrote its 60 tasks, 38 of them in private production codebases. Each task is built around a place where a frontier model failed ([arXiv 2611.30517](https://arxiv.org/abs/2611.30517)).

Each task hides a rubric of atomic criteria, 1,287 in all, tagged with eight behavioral dimensions from functional correctness to truthful reporting. An attempt passes only if it meets every criterion in the two top severities, crux and critical. Of the 374 gating criteria, 203, or 54%, carry no functional-correctness tag ([arXiv 2611.30517](https://arxiv.org/abs/2611.30517)).

The November 2026 leaderboard covers 19 models from 12 developers. Each ran three attempts per task in its developer's own harness or in OpenCode. Claude Fable 5.2 passes 52.2% of attempts, Claude Sonnet 5.5 50.6% and Claude Opus 5.5 46.1%. GPT-6.1 Sol, Claude Fable 5.1 and GPT-6 Astra pass 31% to 34%, and the other 13 models at most 18.9% ([arXiv 2611.30517](https://arxiv.org/abs/2611.30517)).

The grader holds up against people. Three candidate model graders each agreed with a software engineer on 85% to 86% of criterion verdicts, about as often as two engineers agreed with each other ([arXiv 2611.30517](https://arxiv.org/abs/2611.30517)). Because each model runs in one fixed harness, sudo L7 ranks models in their home harness, not harnesses.

## What These Six Sources Do Not Cover

The harness paper runs only one model on its two non-coding benchmarks. On SpreadsheetBench Verified, no harness pair differed by more than 2 points, and on DABstep the harness order flipped between runs ([arXiv 2610.04433v2](https://arxiv.org/abs/2610.04433v2)). Copilot CLI, Codex CLI, Junie and eve were not part of it.

GitHub's changelogs report vendor results. Vercel's customer numbers are self-reported: Rillet tripled its shipping rate in three months, and 30% to 40% of Clay's staff used its monty agent weekly after just over two months ([Vercel](https://vercel.com/blog/eve-is-now-generally-available)). JetBrains tests Kotlin only, and sudo L7 fixes one harness per model.

None of the six puts hard45, pool447, the Kotlin suite, Terminal-Bench 4.1 and sudo L7 on one scale. Read each score as a ranking inside its own benchmark.

## Primary Sources Behind This Analysis

- [What Does a Harness Buy? Tokens, Mostly.](https://arxiv.org/abs/2610.04433v2) (arXiv 2610.04433v2, November 18, 2026): harness swaps against reruns.
- [GitHub Copilot benchmarks site adds harness comparisons](https://github.blog/changelog/2026-11-17-github-copilot-benchmarks-site-adds-harness-comparisons/) (November 17, 2026): matched-model harness comparisons.
- [GitHub Copilot Fusion updates](https://github.blog/changelog/2026-11-17-github-copilot-fusion-updates-more-availability-benchmarks-and-models/) (November 17, 2026): multi-model routing results.
- [Kotlin Benchmark 2.0](https://blog.jetbrains.com/kotlin/2026/11/kotlin-benchmark-2-0-how-ai-coding-agents-handle-harder-tasks-and-closed-source-code/) (November 23, 2026): 100 Kotlin tasks, 13 configurations.
- [Introducing eve 1.0](https://vercel.com/blog/eve-is-now-generally-available) (November 17, 2026): an open-source agent harness.
- [sudo L7](https://arxiv.org/abs/2611.30517) (arXiv 2611.30517, November 23, 2026): staff-level grading rubrics.

## Harness Evaluation Checklist for Teams

### This week
- Run the same task set twice in your current harness and record the pass-rate gap. Treat any harness gain smaller than that gap as unproven.
- Pull tokens and cost per task for one model across the harnesses you use. Check whether the preamble, the history or the step count drives the bill, and make sure responses cut off at the output cap get continued.

### This month
- Build a small internal suite that scores model and harness pairs together, offline, with at least two runs each. Test a multi-model router such as Copilot Fusion or an eve-based harness on pass rate and cost per task.
- Add at least one grading axis beyond passing tests, such as unreported risks or unneeded changes, and fail attempts that miss it.
