# Hacker News submission for issue 018

Draft only; not submitted.

URL: https://thetrendtimes.com/blog/ai-agent-reliability-2026-why-production-agents-fail/

## Title candidates (HN limit: 80 characters)

1. `LLM agents fall from near-perfect to near zero within 16 tool steps`
2. `37.4% of stateful LangGraph container deployments lose state on restart`
3. `One coordinator agent beats a team of per-user agents by 10 to 45 points`

Pick 1 by default. Candidate 2 is the infrastructure angle; use it if an agent-benchmark thread is already on the front page.

## First comment by the submitter

> The post reads six primary sources, each with its own setup:
>
> - Anthropic (https://alignment.anthropic.com/2026/worse-together/): four simulated multi-user environments. A single coordinator beat peer-to-peer agent teams by about 10 to 45 points for Claude Opus 5 and Sonnet 5. In group orders, the user's request was in the ordering agent's context at checkout in only 47% to 67% of episodes.
> - arXiv 2609.01660 (https://arxiv.org/abs/2609.01660): 9 models, 10,664 trajectories. Success decays geometrically per step; bounding the context made decay steeper (logit slope -0.69 vs -0.44).
> - arXiv 2610.34620 (https://arxiv.org/abs/2610.34620): 433 open-source LangGraph systems. 37.4% of stateful systems lose state on restart, 41.5% on container replacement.
> - OpenAI (https://openai.com/safety-alignment/eval-production-behavior-gap/): 6 models. A 10.2 to 37.4 point gap between one safety eval and Codex production, with the eval lower; rank order held (Spearman 0.771).
> - arXiv 2610.07003 (https://arxiv.org/abs/2610.07003): one deployed interview agent, 2,611 rated recordings. Two reviewers differed by 0.79 SD on the same batches.
> - NIST (https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems): 10 design tenets for agent identity.
>
> Caveats: Anthropic's users are simulated, the 100-step figure (0.24) in the decay paper is a projection rather than a production log, and the rater study is one firm. The finding I did not expect was OpenAI's: models scored lower in the eval than in production, and the gap tracked how often a model guessed the specific test objective. Has anyone here measured their own eval-to-production gap for agents?
