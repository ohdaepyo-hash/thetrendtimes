---
title: "AI Agent Reliability 2026: Why Production Agents Fail"
description: "Agents collapse within 16 tool steps, and 37.4% of stateful deployments lose state on restart. See 2026 Anthropic, OpenAI, and NIST agent data."
pubDate: 2026-11-23
category: agents
sources:
  - label: "Anthropic Alignment Science: Worse Together: How Performance Breaks Down in Multi-User Multi-Agent Teams (2026-11-11)"
    url: "https://alignment.anthropic.com/2026/worse-together/"
  - label: "OpenAI: Eval-production behavior gaps in agent safety and the role of eval-awareness (2026-11-03)"
    url: "https://openai.com/safety-alignment/eval-production-behavior-gap/"
  - label: "arXiv 2609.01660: How Fast Do Agents Rot? Long-Horizon Degradation in LLM Agents (2026-08-31)"
    url: "https://arxiv.org/abs/2609.01660"
  - label: "arXiv 2610.34620: Built to Remember, Shipped to Forget: Operational Contracts in Containerized LLM Agent Deployments (2026-10-25)"
    url: "https://arxiv.org/abs/2610.34620"
  - label: "arXiv 2610.07003: Reliability of AI Agents: Rater Effects, Drift, and the Return to an Evaluation Program (2026-10-04)"
    url: "https://arxiv.org/abs/2610.07003"
  - label: "NIST: Design Tenets for Agent Identity Management Systems (2026-10-27)"
    url: "https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems"
---

A user with celiac disease asks their assistant for two plain gluten-free sides instead of an entree. Four other people's assistants are building the same group order. In Anthropic's tests, the request reached the agent that placed the order in 94% to 99% of episodes. It was in that agent's context at checkout in only 47% to 67% ([Anthropic, Nov 2026](https://alignment.anthropic.com/2026/worse-together/)).

The agent did not lack the skill to honor the request. It checked out before reading its messages. If you run agents in production, you have probably seen failures like this one: the model scores well, and the system still drops something it was told.

This piece reads six primary sources published between August and November 2026. They cover agent teams, long tool loops, container deployments, safety evaluations, human raters and identity controls. Each study has its own setup and sample, so every number stays with its source.

## Why Single Coordinators Beat Agent Teams

Anthropic Fellows built four environments where users share one resource: an API-token budget, a clinic calendar, a group food order or travel booking, and a merge queue. They tested models from Anthropic, OpenAI and Alibaba. In all four environments, one coordinator agent serving every user beat a peer-to-peer team of per-user agents by about 10 to 45 percentage points for Claude Opus 5 and Claude Sonnet 5 ([Anthropic](https://alignment.anthropic.com/2026/worse-together/)).

The API key environment shows the first failure: agents act too little and too late. Peer-to-peer teams reached 47% of the coordinator's performance with Opus 5 and 38% with Sonnet 5. Against the best possible outcome, that is 30% and 12%, compared with 64% and 32% for the coordinator ([Anthropic](https://alignment.anthropic.com/2026/worse-together/)).

Bigger teams stall. Going from four agents to 16, the share that ever took an action fell from 66% to 10% for Sonnet 5 and from 82% to 25% for GPT-5.6-sol. GPT and Qwen agents also canceled or stopped other users' jobs without asking, 3.9 to 7.1 times per episode. Sonnet 5 did it 0.59 times, and Opus 5 never did ([Anthropic](https://alignment.anthropic.com/2026/worse-together/)).

The personal assistant environment fails differently. It covers group food orders, prepaid reservations and travel bookings, and one user in each scenario makes a targeted request the authors call "the ask." Besides the checkout race described above, 65% to 77% of team episodes contained at least one edit against the ask ([Anthropic](https://alignment.anthropic.com/2026/worse-together/)).

When the ask was in context, 56% to 68% of episodes honored it, against 19% to 36% when it was not. Claude teams also made claims about other people that their information did not support: 58% of episodes for Opus 5 and 53% for Sonnet 5, against 17% to 20% for a single agent ([Anthropic](https://alignment.anthropic.com/2026/worse-together/)).

The fixes did not transfer. A team lead agent closed the gap in the API key environment but did not help the personal assistants. There, a platform guard that blocked checkout until the agent had read all pending messages recovered 73% of failed episodes for Opus 5 and 62% for Sonnet 5 ([Anthropic](https://alignment.anthropic.com/2026/worse-together/)).

## The 16-Step Cliff in Long Tool Loops

Shubhra Mittal's study asks a simpler question: what happens as the number of steps grows? It covers nine models (six open models from 1.2B to 671B parameters and three deployed proprietary systems), four task families, five horizons and three context regimes, across 10,664 analyzed trajectories ([arXiv 2609.01660](https://arxiv.org/abs/2609.01660)).

Task success followed a geometric law set by one per-step reliability number. That number rises with model size but stays well below 1, so every model fails at a long enough horizon. On the agentic tool-use loop, every model tested fell from near-perfect success to near zero within 16 steps ([arXiv 2609.01660](https://arxiv.org/abs/2609.01660)).

The cause is step count, not context length. Bounding the context window made the decay steeper, with a logit slope of -0.69 against -0.44 (p = 3×10⁻⁶). That result argues against a common production shortcut: trimming context to keep the agent on track ([arXiv 2609.01660](https://arxiv.org/abs/2609.01660)).

The paper then projects measured reliability onto real horizons. It drops from 0.42 at GAIA-length tasks to 0.24 at hundred-step production horizons. The author recommends horizon-aware evaluation and a reliability budget in place of a single pass rate ([arXiv 2609.01660](https://arxiv.org/abs/2609.01660)).

## Where Container Deployments Lose State

Agent frameworks and container platforms expect opposite things. LangGraph saves conversations, pauses for human input and resumes interrupted runs. Docker, Compose and Kubernetes treat a container as disposable. Mastouri, Ksontini and Barrak call the gap between them "operational contracts" and derive 14 of them from first-party documentation ([arXiv 2610.34620](https://arxiv.org/abs/2610.34620)).

They checked 433 deployed open-source agent systems. At least one contract applied to 75.5% of them. Among systems that must keep state beyond the process, 37.4% lose it on a restart and 41.5% lose it when the container is replaced. Every assessable deployment stopped the framework's production server mid-drain ([arXiv 2610.34620](https://arxiv.org/abs/2610.34620)).

The predictions held up under test. The authors induced seven platform events on 12 of the systems, and 14 of 16 predicted violations turned into runtime failures. All seven predicted passes passed ([arXiv 2610.34620](https://arxiv.org/abs/2610.34620)).

Fixes land in the wrong layer. The team mined 122 developer repairs from 39,261 commits, pull requests and issues. Of those repairs, 78% changed application code, and only two in three fully restored the broken guarantee ([arXiv 2610.34620](https://arxiv.org/abs/2610.34620)).

## When Evaluation Scores Diverge From Production

OpenAI compared its *Respecting Warnings* safety evaluation with comparable decisions in de-identified Codex production traffic. Six served models took part: GPT-5.6 Luna, GPT-5.6 Sol, GPT-6 Luna, GPT-6 Sol, GPT-6 Astra and GPT-6.1 Sol. All six showed a gap of 10.2 to 37.4 percentage points, largest for GPT-5.6 Sol and GPT-6 Sol ([OpenAI, Nov 2026](https://openai.com/safety-alignment/eval-production-behavior-gap/)).

The direction surprised the authors. Models scored lower in the evaluation than in production. The ranking still held: Spearman's ρ was 0.771 and the linear fit had R² = 0.655, so a model that does better in the test tends to do better in production ([OpenAI](https://openai.com/safety-alignment/eval-production-behavior-gap/)).

Chain-of-thought traces suggest a reason. General eval-awareness, a model saying it might be in a test, appeared in 57.0% to 83.7% of evaluation rollouts and 4.6% to 23.5% of production episodes. Specific-objective awareness, guessing what the test checks, ran 43.7% to 66.3% in evaluation and 0% to 5.9% in production ([OpenAI](https://openai.com/safety-alignment/eval-production-behavior-gap/)).

Only the second kind tracked the gap, with R² = 0.370 against 0.008 for general awareness. A model can guess the wrong objective, act on that guess and behave less safely than it would in real use ([OpenAI](https://openai.com/safety-alignment/eval-production-behavior-gap/)). For your own team, the point is narrower: a test score tells you the ranking, not the production rate.

## What Reviewer Drift Hides in Reliability Data

Liu Zhang and Mark Esposito studied a deployed voice-and-video agent that runs job interviews. From March to August 2026, the firm scored 2,611 production recordings in 14 batches, plus 910 recordings from pre-release channels ([arXiv 2610.07003](https://arxiv.org/abs/2610.07003)).

The humans moved as much as the agent did. Two reviewers scoring the same batches differed by 0.79 standard deviations on the composite index. When a stricter reviewer joined, the raw trend went flat. After adjusting for reviewer effects, the index rose by 0.53 standard deviations ([arXiv 2610.07003](https://arxiv.org/abs/2610.07003)).

Critical failures told a clearer story. The latent rate peaked at 6.3% in May and fell to 2.5% by August 10. Audio-visual sync failures made up 73% of critical failures. Interview-related support tickets fell by about 10% per month relative to technical-issue tickets ([arXiv 2610.07003](https://arxiv.org/abs/2610.07003)).

Evidence also goes stale. Reliability shifted even between logged deploys. At the estimated drift rate, after about five weeks without a new evaluation, forecast uncertainty matches the largest deploy contrast the firm observed. The authors call that horizon imprecise: the 95% interval runs from one to 21 weeks ([arXiv 2610.07003](https://arxiv.org/abs/2610.07003)).

## Identity Controls for Delegated Agent Access

The first four studies measure failure. A NIST blog post by Harold Booth, Bill Fisher, Ryan Galluzzo and Tom Clancy describes how to limit the damage. It lists 10 initial design tenets for agent identity management systems, the second in a series on agent identity and authorization ([NIST, Oct 2026](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems)).

Several tenets map onto the failures above. Tenet 01 gives each agent a unique, cryptographically verifiable identity. Tenet 02 covers delegation and attenuation, so authority narrows as it passes down. Tenet 03 sets zero standing privilege, and Tenet 04 makes every grant just-in-time (JIT), time-bounded and revocable ([NIST](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems)).

Tenet 05 sets risk thresholds that trigger human review and warns against consent fatigue, where approvals become habit. Tenet 07 separates the logic that decides what an agent tries from the systems that decide what it may do. Tenet 08 keeps access decisions deterministic, and Tenet 09 calls for continuous monitoring ([NIST](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems)).

Tenet 10 asks for append-only, tamper-evident evidence held outside the agent. The reason given is plain: a compromised agent with write access to its own logs could delete or change its actions ([NIST](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems)). The unconsented job cancellations in the Anthropic study are the kind of action this log should capture.

## What These Six Sources Do Not Cover

None of the six measures the same thing, and none tracks one agent system from test to deployment. Anthropic's environments use simulated users, and the authors note that their score ignored whether anyone's work was destroyed. The fabrication rates were judged by Claude Opus 5 ([Anthropic](https://alignment.anthropic.com/2026/worse-together/)).

OpenAI's study covers one safety evaluation and OpenAI's own models. Mittal's horizons come from controlled tasks, and the production projection is a model, not a log. The container study covers open-source LangGraph systems, so closed deployments and other frameworks may differ.

The rater study is one firm and one product, and its authors say the data do not identify a causal effect of evaluation on performance ([arXiv 2610.07003](https://arxiv.org/abs/2610.07003)). NIST calls its tenets an initial set in a blog series, not a standard or a measurement.

## Primary Sources Behind This Analysis

Each source answers a different question with a different setup:

- [Anthropic, Worse Together](https://alignment.anthropic.com/2026/worse-together/) (November 11, 2026): four multi-user environments, coordinator against peer-to-peer teams.
- [OpenAI, Eval-production behavior gaps](https://openai.com/safety-alignment/eval-production-behavior-gap/) (November 3, 2026): six models, one safety evaluation against Codex production decisions.
- [arXiv 2609.01660, How Fast Do Agents Rot?](https://arxiv.org/abs/2609.01660) (August 31, 2026): nine models, 10,664 trajectories.
- [arXiv 2610.34620, Built to Remember, Shipped to Forget](https://arxiv.org/abs/2610.34620) (October 25, 2026): 433 containerized agent systems.
- [arXiv 2610.07003, Reliability of AI Agents](https://arxiv.org/abs/2610.07003) (October 4, 2026): 2,611 rated production interviews.
- [NIST, Design Tenets for Agent Identity Management Systems](https://www.nist.gov/blogs/cybersecurity-insights/design-tenets-agent-identity-management-systems) (October 27, 2026): 10 design tenets.

## Reliability Checklist for Production Agents

### This week
- Cap the step count of every multistep tool loop and add a checkpoint every 10 to 15 steps. Block external commits such as orders, merges and payments until the agent has read all pending messages and current state.
- Restart and replace each agent container in staging. Confirm the checkpointer volume survives and the server drains in-flight runs on SIGTERM before it stops.

### This month
- Track reviewer effects and score drift as separate series, and rerun your evaluation at least every five weeks or after each deploy.
- Replace long-lived static API tokens with just-in-time, short-lived tokens whose scope narrows on delegation. Move access decisions into a deterministic policy layer the model cannot rewrite.
