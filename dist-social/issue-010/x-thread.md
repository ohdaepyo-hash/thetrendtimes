# X thread for issue 010

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/agents-md-open-context-standard-ai-coding/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

A README tells people how to start. A coding agent needs the rest: build steps, test commands, the rules you keep retyping in chat.

AGENTS.md is the shared file for that. Its site counts over 60k open-source projects, and a Linux Foundation body now stewards it:

### 2/7

How it works:

Put AGENTS.md at the repo root. Plain Markdown, no required fields.
In a monorepo, add one per package. The file nearest the edited code wins.
An explicit chat prompt overrides every file.

The site says the main OpenAI repo had 88 of them.

### 3/7

Governance: the format came out of work by OpenAI Codex, Amp, Jules, Cursor and Factory. It is now an Agentic AI Foundation (AAIF) project under the Linux Foundation.

The repo is MIT licensed, created 19 August 2025, with 25,493 stars on 15 November 2026.

### 4/7

What an MSR '26 study measured in 10,000 mature open-source repos:

466 (5%) had an AI context file: Copilot instructions, CLAUDE.md, AGENTS.md or GEMINI.md
AGENTS.md averaged 142 lines (SD 231)
Most common pair: AGENTS.md with CLAUDE.md, in 25 repos

### 5/7

Headings in 155 AGENTS.md files: Conventions 50, Contribution guidelines 48, Architecture 47, Build commands 40. Security: 6.

77 of the 155 (50%) were never changed after creation. In the 10 busiest files, the top of nine change categories was adding instructions (78).

### 6/7

Five ways teams phrase a rule: descriptive, prescriptive, prohibitive, explanatory, conditional. The study doesn't rank them.

This week: add a root AGENTS.md with build and test commands and your "never" rules.
This month: nest one per package and update it with every CI fix.

### 7/7

Full analysis with both tables from the paper, the primary sources and a this-week / this-month checklist:
https://thetrendtimes.com/blog/agents-md-open-context-standard-ai-coding/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
