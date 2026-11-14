# Hacker News submission for issue 010

Draft only; not submitted.

URL: https://thetrendtimes.com/blog/agents-md-open-context-standard-ai-coding/

## Title candidates (HN limit: 80 characters)

1. `AGENTS.md in 10,000 open-source repos: what an MSR '26 study measured`
2. `Half of the AGENTS.md files in an MSR '26 sample were never edited again`
3. `AGENTS.md: nested precedence, Linux Foundation governance, and MSR '26 data`

Pick 1 by default. Candidate 2 is the sharper finding; use it if the first submission gets no traction.

## First comment by the submitter

> Primary sources, since the post is mostly a reading of them:
>
> - Format: https://agents.md/. Plain Markdown, no required fields. In a monorepo the file nearest the edited code wins, and an explicit chat prompt overrides every file. The site says over 60k open-source projects use it and that it is now stewarded by the Agentic AI Foundation under the Linux Foundation (https://aaif.io/projects/agents-md).
> - Paper: https://arxiv.org/abs/2510.21413 (Mohsenimofidi et al., MSR '26). Of 10,000 mature open-source repositories, 466 (5%) had at least one of Copilot instructions, CLAUDE.md, AGENTS.md or GEMINI.md.
> - AGENTS.md files averaged 142 lines with a standard deviation of 231, the widest spread of the four formats.
> - Heading categories across 155 AGENTS.md files: Conventions 50, Contribution guidelines 48, Architecture/structure 47, Build commands 40. Security had 6.
> - 77 of the 155 files (50%) were never changed after creation. In the 10 files with at least 10 commits, the most frequent of nine change categories were Add instruction(s) (78) and Modify instruction(s) (59).
> - Copilot support: https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/
>
> Caveat: the paper is a preliminary study of popular projects in ten languages, and it does not measure whether any content or phrasing style changes agent behavior. If you maintain one of these files, what made you edit it last?
