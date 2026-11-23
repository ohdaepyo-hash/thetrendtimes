---
title: "AI Token Economics 2026: Why Cheaper Tokens Raise Bills"
description: "Token prices fell 34% since July, yet median AI spend keeps rising. See 2026 Databricks, CloudZero, Ramp, and Jellyfish data on cost per task."
pubDate: 2026-11-24
category: market
sources:
  - label: "Databricks: Introducing the Databricks AI Index: The state of enterprise AI tokenomics (2026-11-16)"
    url: "https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics"
  - label: "CloudZero: AI Economics Pulse, November 2026 (2026-11-10)"
    url: "https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/"
  - label: "Ramp: November 2026 Ramp AI Index (2026-11-11)"
    url: "https://ramp.com/data/ai-index-nov-2026"
  - label: "Jellyfish: AI Engineering Trends, November 2026 (2026-11-12)"
    url: "https://jellyfish.co/ai-engineering-trends/"
  - label: "JetBrains: The State of Developer Ecosystem 2026 (2026-11-10)"
    url: "https://blog.jetbrains.com/research/2026/11/state-of-developer-ecosystem-2026/"
---

In October, the average price companies paid for AI inference fell to $0.69 per million tokens. That is 20% below September and 34% below July, when it sat at $1.03. Over the same four months, the median company's AI spend grew every month ([CloudZero, Nov 2026](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)).

If you own an AI budget, you have probably seen this gap. The rate card goes down and the invoice goes up. Finance asks where the savings went, and engineering points at the price list.

This piece reads five primary sources published between November 10 and November 16, 2026, from Databricks, CloudZero, Ramp, Jellyfish and JetBrains. Together they show where the gap comes from: models that need more turns per task, spend that moves into production, and teams that track tokens instead of results. Each source has its own sample, so every number stays with its source.

## Why Cheaper Tokens Raise Enterprise Bills

CloudZero's price is an effective rate, not a list price. It divides total inference cost by total tokens across every model and route, so cache hits and usage mix pull it down. The October figure comes from inference telemetry across 32 organizations, a separate group from the firm's 430-company panel ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)).

The price did not fall in a straight line. It read $1.03 in July, $0.85 in August, $0.86 in September and $0.69 in October. Median month-over-month AI spend growth, from a same-store panel of 344 to 352 companies, ran 13.3%, 3.9%, 6.2% and 1.8% ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)). Growth slowed, but it never turned negative.

CloudZero's explanation is blunt: companies spend the savings. Every efficiency gain becomes headroom, and usage fills it. Caching is a big part of the falling average, because a token served from cache costs a fraction of a fresh one ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)). A budget built on unit price would have forecast a smaller bill.

Ramp sees the same pattern in its business spend data. Its average price per million tokens fell 21% over the last month, while October AI spend rose 1.65% from September to a new peak ([Ramp, Nov 2026](https://ramp.com/data/ai-index-nov-2026)). Ramp's note adds that token volume growth keeps outpacing token spend as models get cheaper.

Where the bill lands matters as much as its size. At the median company in CloudZero's panel, 82.0% of environment-classified spend, AI included, ran production workloads in October, up from 78.8% in September. That leaves about 18% in development and testing, the part a team can trim without customers noticing ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)).

The heaviest users keep pulling away. In October, 9.8% of the 430-company panel spent at least a quarter of their cloud bill on AI, more than four times the 2.2% of a year earlier. Companies at the 10% threshold now make up 30.1% of the panel ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)).

## Cost per Task Beats Cost per Token

The Databricks AI Index includes a coding-agent benchmark built from real pull requests in Databricks' private codebase. It scores runs against hidden tests rather than an LLM judge and estimates spend from publicly listed provider prices. The dataset covers July 20 to November 7, 2026 ([Databricks, Nov 2026](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)).

GPT-6 Luna and Claude Opus 5.5 both completed 89.1% of tasks. Luna averaged $0.05 per task and Opus 5.5 averaged $1.62, a gap of roughly 32x ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)). The success rate was identical. The bill was not.

A low token price does not guarantee a cheap task. Gemini 3.8 Flash has a low token price, yet it averaged 140 turns per task and finished among the most expensive models in the benchmark at $11.97 per task ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)). Extra turns, long outputs and failed attempts all add cost.

The last few points of quality cost the most. Claude Fable 5.1 led the benchmark at 96.0% task success and $7.47 per task, while Muse Wonder scored 94.9% at $1.53. Those 1.1 extra percentage points cost nearly five times as much. Fable 5.1's share of proprietary tokens fell from 5.5% to 0.6% in the six weeks after launch ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)).

Databricks runs the same test on itself. When it weighed an upgrade from Opus 4.8 to Opus 5, it replayed traces from its own workloads and plotted the cost-quality frontier. The upgrade was not worth the extra cost for its use cases, so it stayed on 4.8. With Opus 5.5 the answer flipped: internal tests found better quality at 29% lower cost per session than its predecessor, and Databricks made it the default model for Claude Code ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)).

Cost per completed task folds in three things: token price, the number of turns, and how often the model fails and retries. A price sheet shows only the first. A finance team that compares models on price per million tokens is comparing one input, not the result.

## How Multi-Provider Routing Reshapes Spend

In July, about 64% of enterprises on Databricks' Unity Gateway relied on one model provider. By November 2, that share had fallen to 28% as more organizations adopted models from two or more providers ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)). The gateway data covers 10,000+ companies, including traffic to Anthropic and OpenAI.

Provider share now moves in weeks. Opus 5.5 rose from 7.2% to 37.9% of proprietary-model tokens in six weeks, lifting Anthropic's overall share from 57.6% to 68.8%. Before that launch, OpenAI's share had grown on its 6 series Sol and Astra models. Since May 2026, a new flagship proprietary or open-weight model has launched roughly every week ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)).

Ramp's adoption data points the same way. In October, 44.8% of Ramp businesses paid Anthropic and 40.6% paid OpenAI. SpaceXAI reached 6.3%, up 2.2 percentage points in a month ([Ramp](https://ramp.com/data/ai-index-nov-2026)). Ramp's lead economist expects a three-way race that puts more price pressure on the two leaders.

Spend is also lopsided. According to Ramp, 1% of businesses drive 80% of the revenue to OpenAI and Anthropic. The top 1% of firms spend a median $10.2K per employee per month on AI, while the median firm spends $16.32 ([Ramp](https://ramp.com/data/ai-index-nov-2026)).

The skew shows up inside companies too. In Databricks' gateway data, the median user spent $2.49 on AI while the 99th-percentile user spent $699.74, roughly 281x more ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)). A flat per-seat budget fits neither user.

Routing is how teams act on the cost-per-task gap. The idea is simple: send routine tasks to cheaper models and keep premium models for complex, high-stakes work. Databricks offers its own router for this, but the method works with any gateway that logs cost and outcome per request.

## Where Open-Weight Tokens Win the Bill

Open-weight models took 30.9% of enterprise token traffic on Unity Gateway in November, up from 7.3% in July. Three open-weight models rank in the top 10 of Databricks' coding benchmark, and DeepSeek V4.1 and GLM 5.3 tie for third with a 93.1% pass rate ([Databricks](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics)).

That puts both models above GPT-6 Luna and Opus 5.5 on the same benchmark. The blog post does not list their cost per task, though. Check the live Index before you assume an open-weight model is cheaper per completed task, not only per token.

Coding-tool data tells a different story. Jellyfish found that 0.5% of engineers chose an open-weight model in the last week of its October data, down from a 0.8% peak in August but about 3.3x the March level. Under 2% of companies use open-weight models or model routers regularly ([Jellyfish, Nov 2026](https://jellyfish.co/ai-engineering-trends/)).

The two figures measure different things. Databricks counts tokens that flow through an enterprise gateway. Jellyfish counts which model a developer picks inside a coding tool, and says the metric describes developer usage rather than production usage ([Jellyfish](https://jellyfish.co/ai-engineering-trends/)). Read together, open weights are gaining in gateway traffic while most developers still pick proprietary models in their editors.

A cheap model does not have to be open-weight. Jellyfish also observed 13% more tokens but 16% less spend per engineer as usage shifted to cheaper per-token models. Separately, 33% of GitHub Copilot users used GPT-6 Luna in October ([Jellyfish](https://jellyfish.co/ai-engineering-trends/)).

## What Finance Teams Track Instead

CloudZero surveyed 252 finance leaders on FY2027 plans. The 23% who can both allocate AI spend and measure its return plan increases at the same rate as everyone else: 41% plan to grow AI spend by more than 20%, against 38% of the rest. Only 3% of them failed to secure an AI investment, against 19% of everyone else ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)).

Approval gates are the common first move. In the same survey, 27% named new approval gates as their main FY2027 change. Teams that led with gates killed or paused AI initiatives at a 20% rate, against 7% for teams that tied funding to ROI ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)).

Engineering managers face a similar mismatch. In JetBrains' survey of 28,945 developers across 198 countries and regions, 51% of tech managers say their organizations track token usage, but only 30% count it among the most insightful metrics. Net time gain runs the other way: 39% find it insightful, but only 28% track it ([JetBrains, Nov 2026](https://blog.jetbrains.com/research/2026/11/state-of-developer-ecosystem-2026/)).

Company size shapes how people feel about the return. More than half of tech managers at small organizations are satisfied with the return on their AI spending, against 34% at large ones. And 40% of managers at organizations that do not measure ROI say they are satisfied anyway ([JetBrains](https://blog.jetbrains.com/research/2026/11/state-of-developer-ecosystem-2026/)).

Jellyfish offers an engineering version of cost per task. Its data covers 1,300+ companies, 302K engineers and 113M pull requests. Over the past year, the median company's all-in cost per merged PR fell from $1,377 to $685, and AI's direct slice was about $17 of the $685 average ([Jellyfish](https://jellyfish.co/ai-engineering-trends/)). Throughput did the work, not cheaper tokens.

Token volume still climbed. The median developer consumed 58M tokens per week in October, about 8x the level of a year earlier, and the median company's bug rate went from 16.6 to 14.1 bugs per 100 merged PRs. A tenfold jump in weekly tokens from the median level bought about 2.3x the merged PRs ([Jellyfish](https://jellyfish.co/ai-engineering-trends/)). Jellyfish calls that link correlational, not causal.

Agents now carry part of the PR load. The median company had agent involvement in 35% of its merged PRs in October, and leading companies 67%. At the top 1% of companies, software factory agents opened 8.9% of PRs ([Jellyfish](https://jellyfish.co/ai-engineering-trends/)).

## What These Five Sources Do Not Cover

No source here measures prompt caching savings directly. CloudZero says caching pulls its average price down, but it does not split the cached share out. CloudZero's price and spend lines also come from different groups of companies, so they show a pattern, not one company's bill ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/)).

Databricks' benchmark uses one company's private codebase and prices tokens at public list rates. Negotiated discounts and non-coding work fall outside it. Ramp tracks American businesses that run spend through Ramp, and its department data is new this month.

Jellyfish covers coding tools only, and its productivity links are correlational. JetBrains reports what respondents say, from a survey that ran from May to July 2026 ([JetBrains](https://blog.jetbrains.com/research/2026/11/state-of-developer-ecosystem-2026/)). None of the five tracks one workload from price sheet to invoice to business result.

## Primary Sources Behind This Analysis

Each source answers a different question with its own sample:

- [Databricks AI Index](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics) (November 16, 2026): gateway data from 10,000+ companies and a coding-agent benchmark on private pull requests.
- [CloudZero AI Economics Pulse](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/) (November 10, 2026): a 430-company spend panel, inference telemetry from 32 organizations, and a survey of 252 finance leaders.
- [Ramp AI Index](https://ramp.com/data/ai-index-nov-2026) (November 11, 2026): October business spend and adoption, plus new department-level data.
- [Jellyfish AI Engineering Trends](https://jellyfish.co/ai-engineering-trends/) (November 12, 2026): 1,300+ companies, 302K engineers and 113M pull requests.
- [JetBrains State of Developer Ecosystem 2026](https://blog.jetbrains.com/research/2026/11/state-of-developer-ecosystem-2026/) (November 10, 2026): a survey of 28,945 developers.

## Token Cost Checklist for AI Teams

### This week
- Pull the last month of AI invoices and compute cost per completed task for your top workflows, separate from price per million tokens. Take success rates from your own logs.
- Set a turn cap for each coding agent and log every task that hits it. Check whether prompt caching is on for system prompts and repeated context, and record the cache hit rate.

### This month
- Route a small slice of real traffic through a second provider and one open-weight model. Measure price per token, success rate and cost per task side by side before you move more.
- Add net time gain and cost per merged PR to your AI dashboard next to token usage, and split production from non-production AI spend in the FY2027 plan.
