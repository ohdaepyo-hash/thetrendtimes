---
title: "AI Code Review 2026: Why Verification Became the Bottleneck"
description: "AI writes 69.7% of code in a 227-company panel, yet 45% say review capacity drags delivery. See 2026 LeadDev, SlashData, Sourcegraph, and Atlassian data."
pubDate: 2026-11-26
category: sentiment
sources:
  - label: "LeadDev: The AI Code Review Report 2026 (n=377)"
    url: "https://leaddev.com/the-ai-code-review-report-2026"
  - label: "SlashData: Faster code, heavier checks (2026-11-12, 32nd Developer Survey, n=11,099)"
    url: "https://www.slashdata.co/research/faster-code-heavier-checks"
  - label: "Sourcegraph: AI writes the code. Engineers still have to understand it. (2026 Big Code report, 2026-11-16)"
    url: "https://sourcegraph.com/blog/big-code-report-2026"
  - label: "Atlassian: Introducing the Atlassian AI SDLC Index (Mike Cannon-Brookes, 2026-11-18)"
    url: "https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index"
  - label: "DX: The 10x org is in your grasp (Justin Reock and Scott Carey, 2026-11-11)"
    url: "https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp"
  - label: "IT Pro: Organizations need to help developers grow alongside the technology (Emma Woollacott, 2026-11-04)"
    url: "https://www.itpro.com/software/development/organizations-need-to-help-developers-grow-alongside-the-technology-dejected-devs-lament-career-prospects-amid-ai-advances"
---

Ask 377 engineers and engineering leaders what slows delivery now, and 45% name review capacity as the biggest drag. Only 26% say they fully understand the AI-written code they review ([LeadDev AI Code Review Report 2026](https://leaddev.com/the-ai-code-review-report-2026)). Writing code got cheap. Reading it did not.

You have probably felt this on your own team. Pull requests arrive faster and larger, the review queue grows, and the person approving a change often did not write any of it. The agent finished in minutes. The merge still waits on someone's afternoon.

This piece puts six November 2026 sources side by side: four surveys, one telemetry index and one vendor benchmark. They measure different people with different definitions, so each number stays with its source. Read together, they describe one shift. The limit on AI-assisted delivery has moved from generating code to checking it, and teams that plan only for faster generation will keep missing dates. The last section is a checklist for measuring review capacity this week.

## What 377 Reviewers Report About Code Review

LeadDev built its AI Code Review Report 2026 on a survey of 377 engineers and engineering leaders. Four headline numbers frame the problem. 45% say review capacity is the biggest drag on delivery. 38% say reviews have become slower, while 25% say they became faster ([LeadDev](https://leaddev.com/the-ai-code-review-report-2026)).

The other two numbers are about comprehension. 26% say they fully understand the AI code they review, and 68% say they don't always know which changes need deeper scrutiny ([LeadDev](https://leaddev.com/the-ai-code-review-report-2026)). The report frames AI as having moved the bottleneck: larger and more frequent pull requests pile up in review and slow delivery. Its detailed tables sit behind a login, so this article quotes only those four figures.

That frame is narrower than a debate about trust. It is a capacity question. A team can trust its tools and still run out of reviewer hours.

## Why Delivery Slows When Generation Gets Faster

SlashData asked the same question at a larger scale. Its 32nd Developer Survey drew 11,099 professional developers from 122 countries, and the results came out on November 12, 2026. 81% agree that AI reduces repetitive work but increases the need for review and validation. Two in five agree strongly, the strongest agreement anywhere in the survey ([SlashData](https://www.slashdata.co/research/faster-code-heavier-checks)).

The pressure comes from above. 76% say managers now expect more output from the same team size because of AI tools, and 68% report pressure to adopt tools before their value is clear ([SlashData](https://www.slashdata.co/research/faster-code-heavier-checks)). SlashData sums it up in one line: "AI makes code cheaper to write but not software cheaper to deliver." In its reading, the effort AI saves shows up again where people check AI output.

The checking itself is uneven. 96% of developers don't fully trust that AI-generated code is functionally correct, yet only 48% always check it before they commit ([SlashData](https://www.slashdata.co/research/faster-code-heavier-checks)). Who has time to evaluate AI work? 67% of engineering leaders say their team does, compared with 60% of people in software and architecture roles. The group closest to the code is the least sure.

Put the two surveys next to each other and the story holds. Expectations rose with generation speed. Review hours did not.

## How AI-Authored Code Survives in Later Commits

Surveys report what people think. Atlassian's AI SDLC Index, announced by Mike Cannon-Brookes on November 18, 2026, reports what repositories record. It is built on DX data covering more than 340,000 engineers at more than 500 engineering organizations ([Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index)).

The share of code written by AI rose from 49% in April 2026 to 69.7% in October, across 227 companies that self-report the figure. Over the same months, code survival fell from 79.9% in April to 58.9% in September, then recovered to 68.2% in October ([Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index)). Survival here means the share of AI-authored code still present in later commits. It is not a defect rate. Code can be rewritten because requirements changed, not because it was wrong.

Atlassian also tracks AI spend per unit of output, where output is merged pull requests weighted by size and complexity. Across 488 companies, spend went from $8.85 in April to $39.98 in September, about 4.5 times higher. It then dropped to $29.11 in October, roughly 28% lower in one month ([Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index)). The spend figures are floor values.

The October rebound is one month of data, and the index's author says so: too early to call it a trend. One detail from that month fits the review story, though. Human pull request review volume grew faster in October than in the months before ([Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index)). The post's own phrase is "cheaper code doesn't remove the bottleneck; it moves it."

Time spent on innovation barely moved through all of this. It was 57.8% in October 2026 across 214 companies, and it stayed between 54.9% and 58.5% from January 2025 through October 2026 ([Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index)). Nearly two years of faster generation did not free much time for new work.

## What a 54% Rework Estimate Means for Review Queues

Sourcegraph's 2026 Big Code report, published November 16, surveyed 1,028 people at organizations with more than 250 developers. Dimensional Research ran the fieldwork in September 2026. Among respondents at organizations that use AI, 54% estimate that more than 60% of AI-generated engineering work needs substantial human rework before release ([Sourcegraph](https://sourcegraph.com/blog/big-code-report-2026)).

Read that sentence slowly, because it is easy to misquote. It does not say 54% of AI code is reworked. It says 54% of respondents believe the rework share is above 60%. Either way, it is self-reported estimation, not a measurement from version control.

The rework lands on teams that already spend much of their time reading. 65% say they spend more than a quarter of team time reading, searching and understanding code, and 25% say more than half. 41% say engineers regularly or frequently recreate functionality that already exists ([Sourcegraph](https://sourcegraph.com/blog/big-code-report-2026)). More than half (51%) run over 1,000 repositories.

Meanwhile, the push for more AI keeps coming. 79% report moderate to intense pressure to prove a return on AI investment, and 58% name scaling AI and agent adoption as an engineering priority for the next 12 months ([Sourcegraph](https://sourcegraph.com/blog/big-code-report-2026)). 77% expect AI-written changes to merge with less human review in the future. If that happens while the rework estimate holds, the rework moves past review and into production.

## How Reviewers Approve Code They Only Partly Understand

A reviewer can't judge a change without context, and agents often lack it too. In Sourcegraph's survey, 10% say all their agents share a common view of the codebase, its dependencies and its history. 33% say their tools need detailed background on architecture, dependencies, conventions and history before they can work on a new task ([Sourcegraph](https://sourcegraph.com/blog/big-code-report-2026)).

The same gap shows up in security work. 54% estimate that finding and fixing every impact of a critical dependency vulnerability takes days or longer, or can't be done at all ([Sourcegraph](https://sourcegraph.com/blog/big-code-report-2026)). A reviewer approving an agent's patch to that dependency faces the same search problem in a smaller window.

Connect this to LeadDev's numbers. If 26% fully understand the AI code they review and 68% can't always tell which changes deserve more scrutiny, many approvals rest on partial understanding ([LeadDev](https://leaddev.com/the-ai-code-review-report-2026)). That is not carelessness. It is what happens when a reviewer reads code nobody on the team wrote, in a codebase too large for one person to hold.

DX's benchmark adds the queue side. Pull request size grew 122% over four quarters. Organizations where AI writes 80% or more of the code wait twice as long for a first review as organizations at 20% to 40% ([DX](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp)). Bigger changes take longer to understand, and the wait grows with them.

## Where Review Load Lands on Junior Developers

Review is also how junior developers used to learn. Adaptavist's New Developer Realities survey of 1,000 developers in the UK, US, Germany, Spain and the Netherlands, as reported by IT Pro on November 4, 2026, suggests that path is narrowing. 63% say AI has reduced how much they learn by coding directly ([IT Pro](https://www.itpro.com/software/development/organizations-need-to-help-developers-grow-alongside-the-technology-dejected-devs-lament-career-prospects-amid-ai-advances)).

The career signals are mixed and mostly negative. Nearly half think AI is making software development a less attractive career. Three in ten say AI already hurts their career progress, and 44% say it makes core engineering skills less important. 43% report fewer learning opportunities, rising to 45% among experienced developers ([IT Pro](https://www.itpro.com/software/development/organizations-need-to-help-developers-grow-alongside-the-technology-dejected-devs-lament-career-prospects-amid-ai-advances)).

Then there is the split by career stage. 44% of mid-career developers would remove AI from their workplace if they could, against 31% of early-career developers. Seven in ten worry that junior developers will come to rely on the technology too much ([IT Pro](https://www.itpro.com/software/development/organizations-need-to-help-developers-grow-alongside-the-technology-dejected-devs-lament-career-prospects-amid-ai-advances)). The article also lists an ongoing "verification tax", which respondents described as spending more time reviewing and verifying code than before. The tax is the checking work that comes with every AI output. A junior who can't yet judge the output pays it without learning from it.

Supervision has become part of the job. About 70% say monitoring and overseeing agents is now an explicit part of their daily role, and 82% regularly assign several agents to one task. After recent incidents, four in 10 review AI output more carefully, 29% want stronger human oversight and 21% plan to give agents less full autonomy ([IT Pro](https://www.itpro.com/software/development/organizations-need-to-help-developers-grow-alongside-the-technology-dejected-devs-lament-career-prospects-amid-ai-advances)).

DX's data offers a counterpoint. The median time for a new developer to reach their 10th merged pull request fell from 70 days in Q3 2025 to 30 days in Q2 2026 ([DX](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp)). New hires ship sooner. Whether they understand what they ship is the question the Adaptavist answers raise.

## Why These Six Sources Disagree on AI Code Share

The sources don't agree on how much code AI writes, and they shouldn't be forced to. DX puts it at about 62% of new code, up 15% from the prior quarter, with more than 95% weekly active AI users as of Q2 2026 ([DX](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp)). Atlassian's index reports 69.7% for October 2026 across a 227-company panel ([Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index)).

| Source | AI code share | Period | Population |
|---|---|---|---|
| [DX](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp) | About 62% of new code | Q2 2026 | DX benchmark customers |
| [Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index) | 69.7% | October 2026 | 227 companies, self-reported |

The two figures come from different panels and different months. Averaging them, or reading them as one line rising from 62% to 69.7%, would invent a trend neither source reports.

The spend numbers diverge in the same way. DX reports that median AI spend at large organizations (750 or more developers) tripled quarter over quarter, and that token spend across all sizes grew about 21 times over four quarters ([DX](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp)). Atlassian measures spend per weighted unit of output, which fell in October. One counts total cost, the other counts cost per result.

DX also cautions against reading every slowdown as an AI effect. Its analysis finds that non-AI factors such as meeting-heavy days and interruptions still outweigh the time AI saves. One point of improvement on its DXI score is worth about 10 hours per engineer per year ([DX](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp)).

## What Review Capacity Cannot Be Measured Here

None of the six sources measures review capacity directly in hours per reviewer. LeadDev and SlashData report perceptions. Sourcegraph's rework figure is an estimate by respondents. Atlassian's survival rate counts code that stays in later commits, which mixes rework with ordinary change.

The populations differ as well. LeadDev surveyed 377 engineers and leaders, SlashData 11,099 professional developers and Sourcegraph 1,028 people at large organizations. Atlassian and DX draw on telemetry from their own customers, who chose to buy measurement tools. The Adaptavist figures reach this article through IT Pro's secondary reporting, and the original survey's exact wording isn't quoted here.

Atlassian adds a cost signal from its monthly pulse: 40% of knowledge workers recently faced one of four limits on AI use, from being asked to justify it to losing access ([Atlassian](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index)). If budgets tighten, generation slows before review does. No source here has measured that effect yet.

## Primary Sources Behind This Analysis

- [LeadDev's AI Code Review Report 2026](https://leaddev.com/the-ai-code-review-report-2026) supplies the four review figures. Detailed tables need a login and are not used.
- [SlashData's Faster code, heavier checks](https://www.slashdata.co/research/faster-code-heavier-checks) supplies the manager expectation, verification and evaluation-time figures from its 32nd Developer Survey.
- [Sourcegraph's 2026 Big Code report](https://sourcegraph.com/blog/big-code-report-2026) supplies the rework estimate, code-reading time, agent context and future review expectations.
- [Atlassian's AI SDLC Index](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index) supplies AI code share, code survival, spend per output, innovation time and the monthly pulse.
- [DX's The 10x org is in your grasp](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp) supplies adoption, pull request size, first-review wait, spend growth and onboarding time.
- [IT Pro's report](https://www.itpro.com/software/development/organizations-need-to-help-developers-grow-alongside-the-technology-dejected-devs-lament-career-prospects-amid-ai-advances) on Adaptavist's survey supplies the learning, career and agent oversight figures.

## Review Capacity Checklist for Teams

### This week

- Pick the AI-written pull requests merged last week. Record the time to first review and the number of review comments on each, then write one line on what made a reviewer decide a change needed a closer look. Share that line with the team.
- If AI writes more than 80% of your code, log review queue length alongside pull request size. That tells you whether the delay comes from bigger changes or from more of them.

### This month

- Turn review capacity into tracked metrics: time to first review, review time per pull request and the share of changes sent back for rework.
- Set a cap on pull request size or on the AI share of a change, and add a survival measure (code still present 30 days after merge) to your quarterly metrics.
- Give junior developers a regular review round in which they explain an AI-generated change in their own words before it merges.
