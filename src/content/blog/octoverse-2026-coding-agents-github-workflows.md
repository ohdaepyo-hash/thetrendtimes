---
title: "Octoverse 2026: How Coding Agents Reshaped GitHub Workflows"
description: "GitHub Octoverse 2026 telemetry shows 40% of September PRs started with agents, 61% of Copilot users rotate models, and TypeScript leads AI repos."
pubDate: 2026-11-16
category: market
sources:
  - label: "GitHub Octoverse 2026 Report (2026-10-28, updated 2026-11-06)"
    url: "https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/"
  - label: "Octoverse 2026 Interactive Site"
    url: "https://octoverse.github.com/"
  - label: "GitHub Octoverse 2025 Baseline Report (2025-10-28, updated 2026-02-28)"
    url: "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/"
  - label: "Project HydraFusion: Frontier Quality via Multi-Model Orchestration (GitHub Copilot research preview, 2026-09-04)"
    url: "https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/"
  - label: "GitHub Changelog: Configure Cost and Quality in Copilot Auto Model Selection (2026-09-14)"
    url: "https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/"
---

Developers pushed code to GitHub 17.9 billion times in 12 months, more than in 2024 and 2025 combined. The figure opens the [GitHub Octoverse 2026 report](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/), published on October 28, 2026 and updated on November 6. The report covers October 1, 2025 through September 30, 2026, and it counts public and private repositories unless it says otherwise.

If you lead an engineering team, you've felt what sits behind that number. Pull requests arrive faster than reviewers can read them, some drafted by an agent nobody watched, and each month somebody wants to switch models. From inside one team it's hard to tell which of these changes are local habits and which are the new baseline.

This piece reads GitHub's telemetry for the answer. It covers agent-started pull requests, model rotation in GitHub Copilot, the TypeScript gap in repositories built with agents, and the split between community and vendor projects. Every figure is traced to the report or to one of four companion sources, and the last section is a checklist you can start this week. GitHub also hosts an [interactive Octoverse 2026 site](https://octoverse.github.com/) that serves as the entry point to the report.

## Record Activity Driven by Persistent Coding Agents

According to the GitHub Octoverse 2026 report, commits across public and private repositories reached 34.3 billion, more than three times the level of two years ago. Merged pull requests more than tripled over the same period to 1.3 billion, an average of 3.5 million a day ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)). Public open-source contributions hit 2.5 billion, more than double the 1.12 billion recorded in the [Octoverse 2025 report](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/).

Automation grew with it. GitHub Actions ran a job 1,440 times every second, or 124 million times a day, more than three times last year's total. Developers merged more than 30 million Dependabot pull requests, about double the 2025 pace. Push protection, which screens pushes for exposed secrets such as API keys, ran 5.8 billion scans, nearly four times the 2025 pace ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

The curve wasn't smooth. The report says activity climbed steadily from January and then surged around June. It places a cluster of shifts "right around then": better models, better harnesses (the tooling wrapped around a model), and agents that "moved from single-session tools to persistent ones that could track progress across days and orchestrate other specialized agents." Agents also started running work in the cloud as well as on local machines. The report describes this as timing. It doesn't isolate a cause.

One repository-level number supports the connection. Among repositories created this year, the average repo with an agent configuration file logged eight times as many commits as the average new repo without one. The report's glossary defines an agent configuration file as a repository file that sets up or directs an AI coding agent, and it adds that repositories without one may still use AI. So the comparison is between repos that declare agent use and repos that don't. It isn't AI against no AI.

The report names one account that shows what a persistent agent workflow produces. The developer @kinlane made more than 1 million contributions across public repositories during the year, using agentic workflows to keep a machine-readable catalog of public API information current.

From June onwards, about 55% of all commits came from brand new repositories. GitHub now serves more than 225 million developers, led by the United States (38.3 million), India (32 million), China (12.4 million), Brazil (10.2 million) and Japan (7.15 million). By pushes to public repositories, adjusted by profile location, Korea ranks seventh ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

## Agent-Started Pull Requests and Review Tooling Shifts

By September 2026, more than 40% of pull requests on GitHub started with an agent's first draft, up from 17% in March. That's 110 million pull requests in September alone, about six times March's volume ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)). The glossary counts a pull request as agent-started only when GitHub can detect the agent, so the share is a floor.

These pull requests touch more files and merge sooner. About 87% of agent-started pull requests change multiple files, against 79% of pull requests without detected agent involvement. In February, 83% of agent-involved pull requests merged within two weeks, a little behind the roughly 86% for the comparison group. By September the agent figure was 90%, while the comparison group held at about 86% ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

Read that merge rate with care. The report publishes no defect or revert rates for either group, so the number describes throughput. It says nothing about quality.

Delegation is growing fastest in its most hands-off form. Among GitHub Copilot's monthly active users, 55% now use agentic features, up from 35% a year ago. Copilot cloud agent, where a developer assigns a task and the agent works alone, grew 230% year over year, against 85% for agent chat. The tasks are getting bolder too: public repositories mentioning interoperability or reverse engineering rose more than 300%, from about 30,000 created in 2025 to more than 130,000 in 2026 ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

Review tooling is following the volume. Stacked pull requests, which split related work into a sequence of smaller changes reviewed in order, launched as a preview on July 30, and more than 264,000 developers had used them by September. Usage of AI-assisted code review and of GitHub Advanced Security each grew more than 90% year over year ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

## Multi-Model Routing and Copilot Model Selection Data

Do developers settle on one model? The data says no. In September 2026, 61% of GitHub Copilot users who selected a model themselves used more than one across their sessions, up from 50% four months earlier. Developers on paid Copilot plans used 29 distinct models in May and 47 in September, and no single model carried more than 25% of requests that month ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

The report then groups models by purpose. Out of every 100 developer-selected requests, 38 went to general purpose models, 37 to deep reasoning and planning models, and 25 to fast and lightweight ones. The methodology note limits that split to a seven-day period ending October 13, 2026. It excludes auto model selection, staff usage and requests made with a developer's own API key, and it states that the figures "describe observed use, not model quality" ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

Many developers hand the choice over. In September 2026, 63% of paying Copilot developers used auto model selection at least once ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)). A [GitHub changelog entry from September 14, 2026](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/) split that setting into three tiers: efficiency, balance and intelligence. All three draw on the same pool of models and evaluate each prompt on its own. The feature is rolling out in Visual Studio Code, Copilot CLI and the GitHub Copilot app, and paid subscribers keep a 10% discount on usage billed through auto.

Routing inside a single task goes one step further. On September 4, 2026, GitHub announced [Project HydraFusion](https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/) as a research preview in Copilot CLI, reached through `/experimental` and then `/model`. For each request it picks one of three execution patterns:

- **Single.** One selected model solves the task directly.
- **Cascade.** An efficient model drafts a solution, and a quality gate decides whether to accept it or escalate to a stronger model.
- **Critique.** One model drafts, a read-only critic from a different model family reviews, and the drafting model revises once.

The announcement reports offline results on three agentic coding benchmarks, relative to Claude Opus 5:

| Benchmark ([HydraFusion, Table 1](https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/)) | Estimated cost vs. Opus 5 | Verified task quality vs. Opus 5 |
|---|---|---|
| TerminalBench 2.1 | 67% lower | +4.9 points |
| DeepSWE | 36% lower | -1.5 points |
| CheckpointBench | 65% lower | -0.1 points |

HydraFusion beat the baseline on quality in one benchmark of three. On DeepSWE and on CheckpointBench, GitHub's internal benchmark built from real Copilot sessions, quality slipped by 1.5 and 0.1 percentage points while cost fell by 36% and 65%. The [announcement](https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/) calls these controlled offline results. They show the best tuned configuration, with fixed policies and every model at the same medium reasoning level.

The team also reports what went wrong during tuning. Between August 11 and August 25, two operational failures in the evaluation harness produced invalid runs on TerminalBench 2.1. The team excluded those runs from the trend, corrected the harness, and reached its strongest recorded configurations by August 25 ([HydraFusion](https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/)).

The preview didn't stay a preview. According to the GitHub Octoverse 2026 report, HydraFusion routed almost 60,000 sessions in the CLI and the GitHub Copilot app, and the work is now generally available as GitHub Copilot Fusion, which combines model orchestration with auto model selection ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

## How Agent Workflows Reinforce TypeScript Dominance

TypeScript overtook Python and JavaScript in August 2025, according to the [Octoverse 2025 report](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/). The order held in 2026: TypeScript first, Python second, JavaScript third. From September 2025 to September 2026, TypeScript added 3.62 million monthly contributors, Python 3.23 million and JavaScript 1.82 million. Rust grew fastest by percentage among the top languages, doubling in a year ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

The fastest-growing languages are also where AI shows up most. TypeScript, Python and Rust have the highest shares of merged pull requests with detected AI involvement, about 40% to 44%. Java, C# and C++ sit between about 21% and 34% ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)).

Repository data sharpens the picture. Among repositories created in 2026, TypeScript was the primary language in 35% of those with an observed agent signal, compared to 24% without one. For repositories created before 2026 the gap was similar: 27% against 17% ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)). An agent signal is an observed sign such as an agent-opened pull request, and the glossary calls it a floor.

Why TypeScript? The report offers a reading without claiming proof: the gap "suggests developers who work with agents gravitate toward languages where agent output is easier to check." The 2025 report made the same case from the other side, citing a 2025 academic study in which 94% of compilation errors in model-generated code were type-check failures ([Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)).

## Governance Split Across Community and Vendor Repositories

This year the report ranks open-source projects in two columns. Community and independent projects are foundation-governed, broadly maintained, or led by an individual without a clear commercial sponsor. Single-vendor and product-led projects may take outside contributions, but strategic control sits with one company. These are the fastest-growing repositories by contributors ([Octoverse 2026](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)):

| Rank | Community or independent | Single vendor or product-led |
|---|---|---|
| 1 | `farion1231/cc-switch` | `anthropics/claude-code` |
| 2 | `punkpeye/awesome-mcp-servers` | `openai/codex` |
| 3 | `omacom/omarchy` | `anomalyco/opencode` |

Further down the community column are `ggml-org/llama.cpp`, `sgl-project/sglang` and `vllm-project/vllm`. The vendor column continues with `microsoft/vscode`, `github/copilot-cli`, `zed-industries/zed` and `google-gemini/gemini-cli`.

The report reads the two lists as "a division of labor." The community side is mostly the layer underneath: inference engines such as vLLM, SGLang and llama.cpp, frameworks such as PyTorch, and languages and runtimes such as Rust and CPython. The vendor side is mostly what developers work with directly, meaning coding agents, editors and the orchestration around them.

Two details in the methodology matter if you plan to cite the ranking. "Fastest-growing" means the absolute year-over-year increase in distinct contributing accounts, not contribution counts. And the split describes governance and hosting, not funding: several community-hosted projects have commercial backers.

## Primary Sources Behind This Octoverse 2026 Analysis

- The [GitHub Octoverse 2026 report](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/) supplies every platform figure. It is GitHub's own telemetry, agent detection is a floor, and the report recalculated its 2024 and 2025 comparison figures on the new October-to-September window, so they can differ from earlier editions.
- The [interactive Octoverse 2026 site](https://octoverse.github.com/) is the entry point to the report. No figure here is taken from it.
- The [Octoverse 2025 report](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) is used only for year-over-year baselines.
- The [Project HydraFusion announcement](https://github.blog/ai-and-ml/github-copilot/project-hydrafusion-frontier-quality-via-multi-model-orchestration/) is used for the three patterns and the benchmark table. It describes a research preview. General availability and the session count come from the Octoverse report.
- The [auto model selection changelog](https://github.blog/changelog/2026-09-14-configure-cost-and-quality-in-copilot-auto-model-selection/) is used for the three tiers, the rollout surfaces and the discount.

None of these sources measures code quality after merge. That question stays open, and your own revert and incident data is the place to answer it.

## Practical Engineering and Agent Workflow Checklist

### This week

- Add an agent configuration file (`AGENTS.md` or `CLAUDE.md`) at the repository root. List the build and test commands and the rules an agent must never break. Our [AGENTS.md analysis](/blog/agents-md-open-context-standard-ai-coding/) covers the format.
- Audit the review path for agent-started pull requests. Try stacked pull requests on one multi-file change, and confirm that automated code review and push protection run on every pull request.

### This month

- Write a routing policy by work stage instead of pinning one model: a deep reasoning model for planning, a general purpose model for implementation, a fast model for lightweight checks. Record cost and merge outcomes per stage for four weeks.
- Make type checking a required CI gate. For TypeScript, run `tsc --noEmit` on every pull request and track how many agent-started pull requests fail it on the first push.
- Measure your own baseline: the share of pull requests that start with an agent, the two-week merge rate, and the revert rate. The report gives no figure for the third.
