# Reddit post for issue 018

Target: r/AI_Agents (r/LocalLLaMA as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`Agents fall to near zero within 16 tool steps, and 37.4% of stateful container deployments lose state on restart. Notes from 6 primary sources`

## Body

I read six studies from August to November 2026 on why agents fail in production. Each has its own setup, so I kept each number with its source.

**Agent teams** ([Anthropic](https://alignment.anthropic.com/2026/worse-together/), four simulated multi-user environments, Anthropic, OpenAI and Alibaba models).

- One coordinator serving every user beat a peer-to-peer team of per-user agents by about 10 to 45 points in all four environments (Claude Opus 5 and Sonnet 5).
- From 4 to 16 agents, the share that ever acted fell from 66% to 10% (Sonnet 5) and 82% to 25% (GPT-5.6-sol).
- In group orders, the user's special request reached the ordering agent in 94% to 99% of episodes but was in its context at checkout in only 47% to 67%. A guard that blocks checkout until all messages are read recovered 73% (Opus 5) and 62% (Sonnet 5) of failed episodes.

**Long tool loops** ([arXiv 2609.01660](https://arxiv.org/abs/2609.01660), 9 models, 10,664 trajectories).

- Success decays geometrically with step count. On the agentic tool loop, every model went from near-perfect to near zero within 16 steps.
- Bounding the context window made it worse (logit slope -0.69 vs -0.44), so trimming context is not the fix.

**Containers** ([arXiv 2610.34620](https://arxiv.org/abs/2610.34620), 433 open-source LangGraph systems on Docker, Compose and Kubernetes).

- Of systems that must keep state beyond the process, 37.4% lose it on restart and 41.5% on container replacement.
- Every assessable deployment stopped the server mid-drain. 14 of 16 predicted violations became runtime failures under fault injection.

**Evals vs production** ([OpenAI](https://openai.com/safety-alignment/eval-production-behavior-gap/), 6 models, one safety eval vs Codex production decisions).

- Gaps of 10.2 to 37.4 points, with the eval scoring lower. Rank order held (Spearman 0.771).
- Guessing the specific test objective tracked the gap (R² 0.370); general "this is a test" awareness did not (R² 0.008).

**Human raters** ([arXiv 2610.07003](https://arxiv.org/abs/2610.07003), 2,611 rated interviews from one deployed voice-and-video agent).

- Two reviewers on the same batches differed by 0.79 SD. After adjusting, reliability rose 0.53 SD and critical failures fell from 6.3% to 2.5%.
- After about five weeks without a new eval, forecast uncertainty matched the largest deploy effect (95% interval: 1 to 21 weeks).

**Identity** ([NIST](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems), 10 design tenets): zero standing privilege, JIT revocable grants, attenuation on delegation, policy separated from reasoning, append-only logs the agent cannot touch.

Caveats: the Anthropic environments use simulated users, the OpenAI study is one eval on OpenAI's own models, and the rater study is one firm. The NIST tenets are an initial set, not a standard.

Full write-up with a this-week checklist: https://thetrendtimes.com/blog/ai-agent-reliability-2026-why-production-agents-fail/

Question for people running agents in production: do you cap step counts in tool loops, and where did you set the limit?
