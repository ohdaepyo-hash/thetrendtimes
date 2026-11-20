# X thread for issue 016

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/ai-coding-trust-gap-verification-roi/
- Length rule: every tweet stays under 280 characters, 230 to 265 preferred. X counts any URL as 23 characters. No em dashes.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

A year ago developers told Sonar AI wrote or heavily assisted 42% of their committed code. They expected 65% in two years.

This year's survey of 1,026 says 65% already. And 76% say they generate AI code faster than they can verify it.

Here is what the data says.

### 2/7

65% is not "fully automated."

JetBrains asked 15,000+ professional developers to split last month's code: about 47% fully agent-generated, 38% AI-assisted, 27% by hand (range midpoints, so it tops 100%).

Only around 22% let agents write over 80% of their code.

### 3/7

Review time moved. Confidence did not.

Sonar: 53% now spend more time reviewing code than creating it, vs 18% before AI tools.

45% agree AI code is functionally correct, but only 6% agree completely. "Always check before committing" fell from 48% to 39%.

### 4/7

Checks still run late. Among teams that review AI code: 81% at pull request, 51% in CI/CD, 43% in real time as the agent writes.

Teams with inline automated review report better code security (61% vs 46%) and quality (75% vs 63%). Sonar calls it association.

### 5/7

GitKraken surveyed 554 developers and engineering leaders from its own community.

84% feel more productive with AI. Only 20% can measure it. That is a 64-point gap.

39% of organizations have no way to measure AI's impact, and another 33% rely on self-reports.

### 6/7

Token counts are the popular metric, not the trusted one.

JetBrains: 51% of tech managers say their org tracks token usage, but only 30% rank it among the most insightful metrics.

DORA: company-wide aggregates are meaningless, individual scores harmful.

### 7/7

This week: turn on inline checks for AI code, and baseline review time, rework rate and cost per accepted change before you count tokens. Report by team, not by person.

Full breakdown: https://thetrendtimes.com/blog/ai-coding-trust-gap-verification-roi/

Free, subscribe at thetrendtimes.com
