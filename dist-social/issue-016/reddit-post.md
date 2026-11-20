# Reddit post for issue 016

Target: r/ExperiencedDevs (r/AI_Agents as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`AI now writes or heavily assists 65% of committed code, and 76% say review can't keep up. Notes from 5 primary sources`

## Body

I read five reports from June to November 2026 on AI-written code, review and measurement. They use different samples and definitions, so I kept each number with its own survey. All of it is self-reported.

**Code share** ([Sonar](https://www.sonarsource.com/blog/state-of-code-developer-survey-report-2027/), 1,026 developers and engineering managers).

- AI generates or heavily assists 65% of committed code, up from 42%. A year ago respondents expected 65% in two years.
- 76% use AI coding tools on business-critical or mission-critical services, up from 58%.

**A stricter definition** ([JetBrains](https://blog.jetbrains.com/research/2026/08/how-much-code-do-developers-really-let-agents-write/), 15,000+ professional developers).

- About 47% fully agent-generated, 38% AI-assisted, 27% manual. These are averages of range midpoints, so they sum past 100%.
- Only around 22% let agents write over 80% of their code. Not comparable with Sonar's 65%, which includes assisted code.

**Review and trust** (Sonar again).

- 53% spend more time reviewing than creating code, vs 18% before AI tools. Still, 76% agree "we generate AI code faster than we can verify it."
- 45% agree AI code is functionally correct, 6% agree completely. "Always check before committing" fell from 48% to 39%.
- Teams with inline automated review report better code security (61% vs 46%) and code quality (75% vs 63%). Sonar says these are associations, not proof of cause, and Sonar sells verification tools.

**Measurement** ([GitKraken](https://www.gitkraken.com/reports/state-of-ai), 554 respondents from its own community; [JetBrains](https://blog.jetbrains.com/research/2026/11/state-of-developer-ecosystem-2026/), 28,945 developers).

- 84% feel more productive, 20% can measure it. 39% of organizations have no way to measure AI's impact and another 33% rely on self-reports.
- 51% of tech managers say their org tracks token usage, but only 30% rank it among the most insightful metrics. Net time gain: 39% find it insightful, 28% track it.

**Alternatives to token leaderboards** ([DORA](https://dora.dev/insights/finding-balance-in-the-era-of-tokenmaxxing/), commentary, not a survey). Salesforce counts completed Agentic Work Units. Shopify replaced its leaderboard with a usage dashboard plus circuit breakers for abnormal daily spend. DORA suggests pairing its core metrics with cost per accepted change and code rework rate.

Question for people reviewing agent output every day: has your review time per PR gone up, and do you track rework on AI-written changes separately?

Full write-up with all links: https://thetrendtimes.com/blog/ai-coding-trust-gap-verification-roi/
