# Reddit post for issue 019

Target: r/LocalLLaMA (r/devops as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`Token prices fell 34% since July and AI bills still rose. Cost per task data from 5 November 2026 reports`

## Body

I read five reports from November 2026 on why AI bills rise while token prices fall. Each has its own sample, so I kept each number with its source.

**Price vs spend** ([CloudZero](https://www.cloudzero.com/blog/ai-economics-pulse-november-2026/), [Ramp](https://ramp.com/data/ai-index-nov-2026)).

- CloudZero's effective price per million tokens, cache hits included: $1.03 (July), $0.85, $0.86, $0.69 (October), from 22 to 32 organizations.
- Median monthly AI spend growth in its 340+ company panel: 13.3%, 3.9%, 6.2%, 1.8%. Never negative.
- Ramp: price per million tokens down 21% over the last month; October AI spend up 1.65%.

**Cost per task** ([Databricks AI Index](https://www.databricks.com/blog/introducing-databricks-ai-index-state-enterprise-ai-tokenomics), coding-agent benchmark on private PRs, hidden tests, July 20 to November 7).

- GPT-6 Luna and Claude Opus 5.5: both 89.1% success, $0.05 vs $1.62 per task.
- Gemini 3.8 Flash: low token price, 140 turns per task, $11.97 per task.
- Claude Fable 5.1 at 96.0% ($7.47) vs Muse Wonder at 94.9% ($1.53).

**Open weights** (same Databricks source, plus [Jellyfish](https://jellyfish.co/ai-engineering-trends/)).

- Open-weight share of gateway token traffic: 7.3% in July to 30.9% in November. DeepSeek V4.1 and GLM 5.3 tie for third at 93.1%.
- Inside coding tools, Jellyfish found 0.5% of engineers picked an open-weight model in late October, and under 2% of companies use open-weight models or routers regularly.

**What gets measured** ([JetBrains](https://blog.jetbrains.com/research/2026/11/state-of-developer-ecosystem-2026/), 28,945 developers).

- 51% of tech managers track token usage; 30% call it a top metric. Net time gain: 39% value it, 28% track it.

What I could not find: any of the five isolating prompt caching savings. If you route between a hosted model and a local open-weight model, how do you compare cost per completed task?

Full write-up with sources: https://thetrendtimes.com/blog/ai-token-economics-2026-why-cheaper-tokens-raise-bills/
