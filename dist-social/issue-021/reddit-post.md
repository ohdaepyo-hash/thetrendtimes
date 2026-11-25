# Reddit post for issue 021

Target: r/ClaudeCode (r/AI_Agents as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`AI made code cheap to write, but review is now the bottleneck. Notes from 6 November 2026 sources`

## Body

I read six November 2026 sources on what happens after the agent finishes: review, rework and who learns from it. They survey different people with different definitions, so I kept each number with its source.

**Review capacity** ([LeadDev](https://leaddev.com/the-ai-code-review-report-2026), 377 engineers and leaders; detailed tables are behind a login).

- 45% say review capacity is the biggest drag on delivery. 38% say reviews got slower, 25% faster.
- 26% fully understand the AI code they review. 68% don't always know which changes need deeper scrutiny.

**Verification** ([SlashData](https://www.slashdata.co/research/faster-code-heavier-checks), 11,099 developers, 122 countries).

- 81% say AI cuts repetitive work but raises the need for review and verification.
- 96% don't fully trust AI code to be functionally correct; 48% always check it before committing.

**Telemetry** ([Atlassian AI SDLC Index](https://www.atlassian.com/blog/company-news/introducing-the-atlassian-ai-sdlc-index), DX data; [DX benchmark](https://newsletter.getdx.com/p/the-10x-org-is-in-your-grasp)).

- Atlassian: AI share of code 49% (April) to 69.7% (October, 227 companies). Share of AI code still present in later commits: 79.9% to 58.9% (September) to 68.2% (October). The author calls one month too early for a trend.
- DX: PR size up 122% over four quarters. Orgs with 80%+ AI code wait twice as long for a first review as orgs at 20% to 40%.

**Rework and learning** ([Sourcegraph](https://sourcegraph.com/blog/big-code-report-2026), 1,028 people at orgs with more than 250 developers; [IT Pro on Adaptavist's survey](https://www.itpro.com/software/development/organizations-need-to-help-developers-grow-alongside-the-technology-dejected-devs-lament-career-prospects-amid-ai-advances), 1,000 developers).

- Sourcegraph: 54% estimate more than 60% of AI-generated work needs substantial rework before release. That is an estimate, not a measurement. 77% expect AI changes to merge with less human review.
- Adaptavist: 63% say AI reduced how much they learn by coding. Seven in ten worry juniors will over-rely on it.

What none of them measure: review capacity in reviewer hours. Does anyone here track time to first review or post-merge survival for AI-written PRs? What did you find?

Full write-up with sources and a checklist: https://thetrendtimes.com/blog/ai-code-review-bottleneck-2026-verification-tax/
