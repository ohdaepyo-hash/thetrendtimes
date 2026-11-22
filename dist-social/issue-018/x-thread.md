# X thread for issue 018

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/ai-agent-reliability-2026-why-production-agents-fail/
- Length rule: every tweet stays under 280 characters, 230 to 265 preferred. X counts any URL as 23 characters. No em dashes.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

In an Anthropic test, a user's gluten-free request reached the agent placing the group order in 94% to 99% of runs.

It was in that agent's context at checkout in only 47% to 67%. The agent paid before reading its messages.

Six 2026 studies on why agents fail:

### 2/7

Teams lose to one coordinator. Across 4 shared-resource environments, a single agent serving every user beat per-user teams by about 10 to 45 points.

From 4 agents to 16, the share that ever acted fell from 66% to 10% for Sonnet 5 and 82% to 25% for GPT-5.6-sol.

### 3/7

Long tool loops decay by step count, not context length.

Across 9 models and 10,664 trajectories, every model fell from near-perfect to near zero within 16 steps on an agentic task.

Trimming the context window made the decay steeper (logit slope -0.69 vs -0.44).

### 4/7

Containers forget. In 433 open-source LangGraph deployments, 37.4% of systems that must keep state lose it on restart and 41.5% on container replacement.

Every assessable deployment stopped the server mid-drain. 78% of developer fixes changed app code.

### 5/7

Evals and production disagree. OpenAI found a 10.2 to 37.4 point gap across 6 models, and the eval scored lower.

Rank order held (Spearman 0.771). Models that guessed what the test was checking showed bigger gaps, and some guessed wrong.

### 6/7

Raters drift too. On a deployed interview agent, two reviewers scoring the same batches differed by 0.79 SD.

Adjusted for reviewer effects, reliability rose 0.53 SD and critical failures fell from 6.3% to 2.5%. Evidence went stale in about 5 weeks.

### 7/7

NIST's 10 agent identity tenets: zero standing privilege, short-lived revocable grants, policy kept apart from reasoning, logs the agent cannot edit.

Full analysis and this week's checklist:
https://thetrendtimes.com/blog/ai-agent-reliability-2026-why-production-agents-fail/

Weekly: subscribe at thetrendtimes.com
