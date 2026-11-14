# Reddit post for issue 010

Target: r/programming (r/LocalLLaMA as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`An MSR '26 study scanned 10,000 open-source repos for AI context files: 466 had one, and half of the AGENTS.md files were never edited again`

## Body

I read the AGENTS.md site, its GitHub repo, the Agentic AI Foundation project page, GitHub's Copilot changelog and an MSR '26 paper to see what is known about context files for coding agents. Every number below comes from those sources. The paper calls itself a preliminary study and its sample is mature, popular projects, so read it as a snapshot.

**What the format is.**

- [agents.md](https://agents.md/): plain Markdown with no required fields, described as a "README for agents". The site says over 60k open-source projects use it.
- Nested files: put one in each package of a monorepo. The file closest to the edited code wins, and an explicit chat prompt overrides every file. The site says the main OpenAI repo had 88 of them at the time of writing.
- Governance: now stewarded by the [Agentic AI Foundation](https://aaif.io/projects/agents-md) under the Linux Foundation. The [repo](https://github.com/agentsmd/agents.md) is MIT licensed and was created on 19 August 2025.
- [GitHub's changelog](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/) (28 August 2025): the Copilot coding agent reads root and nested `AGENTS.md`, plus `.github/copilot-instructions.md`, `CLAUDE.md` and `GEMINI.md`.

**What the study measured** ([arXiv 2510.21413](https://arxiv.org/abs/2510.21413)).

- Sample: 228,890 repositories from SEART, filtered to 48,795, then the top 10,000 by popularity and maturity.
- 466 (5%) had at least one of Copilot instructions, `CLAUDE.md`, `AGENTS.md` or `GEMINI.md`. Most common pair: `AGENTS.md` with `CLAUDE.md`, in 25 repositories.
- Mean length in lines: Copilot instructions 310 (SD 127), `CLAUDE.md` 287 (SD 112), `AGENTS.md` 142 (SD 231), `GEMINI.md` 106 (SD 65).

**What people put in AGENTS.md** (155 files, counts are level 1 and 2 headings).

- Conventions 50, Contribution guidelines 48, Architecture/structure 47, Build commands 40, Goals/purposes 32, Test execution 32.
- At the bottom: Troubleshooting 8, Patterns/examples 8, Security 6.
- Five phrasing styles in the Conventions sections: descriptive, prescriptive, prohibitive, explanatory, conditional. The paper does not test which one works better.

**How the files change.**

- 77 of 155 (50%) were never changed, 36 (23%) once, 32 (21%) two to seven times, 10 (6%) at least 10 times.
- In the 169 commits to those 10 files, the nine change categories were: Add instruction(s) 78, Modify instruction(s) 59, Add section(s) 26, Remove instruction(s) 23, Modify heading(s) 23, Modify text 19, Reformat style 10, Remove section(s) 2, Update reference(s) 2.
- `neomjs/neo` had 49 changes in 19 days; `gofiber/fiber` had 11 in 148 days. The authors found no clear pattern in when or how often files change.

For people who keep one of these files: do you update it when an agent gets something wrong, or did you write it once and leave it? And has anyone measured whether "never do X" rules work better than descriptions?

Full write-up: thetrendtimes.com
