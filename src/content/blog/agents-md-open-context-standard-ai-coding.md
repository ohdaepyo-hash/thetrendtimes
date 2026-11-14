---
title: "AGENTS.md Standard: How Open Context Files Guide AI Coders"
description: "Over 60,000 repos use AGENTS.md under the Linux Foundation AAIF. Empirical MSR data shows how teams structure and evolve context files for coding agents."
pubDate: 2026-11-15
category: tools
sources:
  - label: "AGENTS.md Official Specification and Documentation"
    url: "https://agents.md/"
  - label: "agentsmd/agents.md Official GitHub Repository"
    url: "https://github.com/agentsmd/agents.md"
  - label: "Agentic AI Foundation (Linux Foundation): AGENTS.md Project"
    url: "https://aaif.io/projects/agents-md"
  - label: "Mohsenimofidi et al., Context Engineering for AI Agents in Open-Source Software (MSR '26, arXiv 2510.21413)"
    url: "https://arxiv.org/abs/2510.21413"
  - label: "GitHub Copilot Coding Agent Changelog: AGENTS.md Support (2025-08-28)"
    url: "https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/"
---

One commit in the rsyslog project carries this message: "AI support: Agent shall no longer call stylecheck.sh". The commit deleted an instruction from a file named `AGENTS.md`, which the project keeps for coding agents to read. Four researchers quote it in a study accepted at the Mining Software Repositories conference, MSR '26 ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.3, 2026).

If you run a coding agent against a real repository, you've written instructions like that one, in a chat prompt, a tool-specific rules file, or a README that keeps growing. Switch tools and you write them again.

`AGENTS.md` gives those instructions one address. The [official AGENTS.md site](https://agents.md/) says over 60k open-source projects use the format, and it is now stewarded by the Agentic AI Foundation under the Linux Foundation. Below: why a README falls short, how root and nested files resolve, who governs the format, and what the MSR study measured across 10,000 repositories. A checklist for your own repository closes the piece.

## Why Coding Agents Need Dedicated Context Beyond README.md

The site's case is short. README files are for humans: quick starts, project descriptions and contribution guidelines. `AGENTS.md` holds "the extra, sometimes detailed context coding agents need: build steps, tests, and conventions that might clutter a README or aren't relevant to human contributors" ([AGENTS.md site](https://agents.md/)).

The MSR paper puts a name on the practice: context engineering, "the deliberate process of designing, structuring, and providing task-relevant information" to large language models (LLMs). Prompt engineering is about how a task is described. Context engineering is about what information the model can reach, and a context file is the version-controlled form of it: the agent adds the file's content to its prompts automatically ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 1, 2026).

Before a shared name existed, each tool had its own file. The paper notes that Claude Code looks for `CLAUDE.md` by default, GitHub Copilot introduced `copilot-instructions.md`, and OpenAI's Codex relies on `AGENTS.md`. That can mean three files saying the same thing in one repository.

The shared name now reaches across vendors. The site lists Codex, Cursor, Devin, Amp, Jules, Gemini CLI, Windsurf, Zed, Warp, Aider, goose, VS Code and the GitHub Copilot coding agent among compatible tools ([AGENTS.md site](https://agents.md/)). GitHub confirmed its side on 28 August 2025: the Copilot coding agent "now supports AGENTS.md custom instructions" ([GitHub Changelog](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/), 2025).

## How AGENTS.md Works: Root Conventions and Nested Monorepo Precedence

The format has no schema. The site's FAQ answers "Are there required fields?" with "No. AGENTS.md is just standard Markdown", and adds that the agent parses whatever headings and text you provide ([AGENTS.md site](https://agents.md/)).

Setup is four steps on the site. Create `AGENTS.md` at the repository root. Cover what matters, where the popular choices are a project overview, build and test commands, code style guidelines, testing instructions and security considerations. Add whatever else you'd tell a new teammate, such as commit message rules or deployment steps. The fourth step is for large monorepos (single repositories that hold many packages): place another `AGENTS.md` inside each package.

Precedence between those files follows distance. "Agents automatically read the nearest file in the directory tree, so the closest one takes precedence," the site says, and it gives a scale reference: at the time of writing, the main OpenAI repository had 88 `AGENTS.md` files ([AGENTS.md site](https://agents.md/)).

```text
repo/
  AGENTS.md                  # default rules for the whole repository
  packages/
    api/
      AGENTS.md              # wins for edits under packages/api/
      src/handlers/user.ts
    web/
      src/App.tsx            # no nearer file, so the root AGENTS.md applies
```

The FAQ sets out the full order in one line: the closest `AGENTS.md` to the edited file wins, and "explicit user chat prompts override everything".

Two more answers in the FAQ matter in daily use. If you list test commands, the agent "will attempt to execute relevant programmatic checks and fix failures before finishing the task". And if you already keep an older file, the site suggests a rename plus a symbolic link for backward compatibility: `mv AGENT.md AGENTS.md && ln -s AGENTS.md AGENT.md`.

GitHub's implementation matches that model. The changelog says you can create one `AGENTS.md` in the repository root and nested files "which apply to specific parts of your project". The agent keeps reading `.github/copilot-instructions.md`, `.github/instructions/**.instructions.md`, `CLAUDE.md` and `GEMINI.md` as well ([GitHub Changelog](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/), 2025).

## Governance Under the Linux Foundation Agentic AI Foundation

The site's About section says the format "emerged from collaborative efforts across the AI software development ecosystem", and names OpenAI Codex, Amp, Jules from Google, Cursor and Factory. It then says AGENTS.md "is now stewarded by the Agentic AI Foundation under the Linux Foundation". The page footer reads "AGENTS.md a Series of LF Projects, LLC" ([AGENTS.md site](https://agents.md/)).

The foundation lists AGENTS.md on its own [AAIF project page](https://aaif.io/projects/agents-md) with a public dashboard. On 15 November 2026 that page showed 354 total contributors, 135 contributing organizations, a first commit dated August 19, 2025, and a health score of "Fair (65)". The page defines the score as a measure of maintainer health, security and supply chain, and development activity.

The [agentsmd/agents.md repository](https://github.com/agentsmd/agents.md) holds the site and the format description under an MIT license. GitHub's API reported a creation date of 19 August 2025 and, on 15 November 2026, 25,493 stars and 1,963 forks. The AAIF dashboard shows lower counts on the same day (17,529 stars and 1,432 forks), so treat the dashboard as a lagging snapshot.

For you, the file is the same Markdown either way. What the footer changes is where the rules live: it points to lfprojects.org for the trademark policy and other project policies.

## Empirical MSR Study: What 10,000 Open-Source Repositories Reveal

The authors call their paper, to their knowledge, the first holistic empirical study of these files. They started from the SEART GitHub search tool and 228,890 repositories that were non-fork, licensed, had at least two contributors, were created before 2024 and had commits since 1 June 2024. Filters for license, language, commit count and watchers left 48,795. From those they ranked 10,000 by popularity and maturity, cloned them, and scanned the default branch for four formats: Copilot instructions, `CLAUDE.md`, `AGENTS.md` and `GEMINI.md` ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 3, 2026).

The headline result is small. Only 466 repositories, which the paper rounds to 5%, had adopted at least one of the four formats. The authors read that as "an early stage of adoption" ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.1, 2026).

By main language, the 466 split into 135 TypeScript, 58 Go, 58 Python, 56 C#, 36 Java, 34 JavaScript, 32 C++, 29 Rust, 19 PHP and 9 C repositories. C# projects leaned toward Copilot files, and Claude Code was popular in TypeScript. The pair of files most often found together was `AGENTS.md` with `CLAUDE.md`, in 25 repositories.

File length differs by format, and `AGENTS.md` is the least predictable of the four.

| Context file ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.2) | Mean lines | Standard deviation |
|---|---|---|
| Copilot instructions | 310 | 127 |
| `CLAUDE.md` | 287 | 112 |
| `AGENTS.md` | 142 | 231 |
| `GEMINI.md` | 106 | 65 |

A standard deviation larger than the mean says some files are short and others run long.

For content, the team took the section headings of the 155 `AGENTS.md` files in the sample and grouped them into 14 categories. The counts below are level 1 and level 2 headings, not files. Files created before 1 January 2025 (15 of them) and five repositories whose files had no headings were left out of this step ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Table 1, 2026).

| Category in `AGENTS.md` headings ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Table 1) | Headings |
|---|---|
| Conventions | 50 |
| Contribution guidelines | 48 |
| Architecture/structure | 47 |
| Build commands | 40 |
| Goals/purposes | 32 |
| Test execution | 32 |
| Metadata | 29 |
| Test strategy | 24 |
| Tech stack | 15 |
| Setup | 11 |
| References | 9 |
| Troubleshooting | 8 |
| Patterns/examples | 8 |
| Security | 6 |

Compare the bottom row with the site's advice. "Security considerations" is one of five popular section choices on [agents.md](https://agents.md/), and Security is the least common category in the sample, with six headings. The abstract's summary is that "there is no established content structure yet".

Keep the scope in mind. The sample covers mature, popular projects in ten languages, the paper calls itself a preliminary study, and its first version reached arXiv on 24 October 2025. The 5% figure describes that sample at that time and can't be set against the site's 60k count, which covers all of GitHub ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), 2026).

## Five Writing Styles and Nine Change Categories in Practice

The authors read all 50 sections labeled Conventions and found five ways of phrasing a rule ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.2, 2026).

| Style | What it does | Example quoted in the paper |
|---|---|---|
| Descriptive | Documents an existing convention without an instruction | "This project uses the Linux Kernel Style Guideline." |
| Prescriptive | Gives a direct imperative | "Follow the existing code style and conventions." |
| Prohibitive | Says what not to do | "Never commit directly to the main branch." |
| Explanatory | Adds the reason after the rule | "Avoid hard-coded waits to prevent timing issues in CI environments." |
| Conditional | Says what to do in a given situation | "If you need to use reflection, use ReflectionUtils APIs." |

The paper doesn't rank the styles. Whether one of them makes an agent behave better is listed as future work.

How do the files change after the first commit? Half of them don't. Of the 155 files, 77 (50%) had never been changed, 36 (23%) had been changed once, and 32 (21%) between two and seven times. The remaining 10 files (6%) had at least 10 commits each, and the authors annotated those 169 commits, 37% of all the commits they collected ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.3, 2026).

The busy files look nothing alike. `neomjs/neo` logged 49 changes over 19 days. `gofiber/fiber` logged 11 changes across 148 days. The authors say plainly that they "did not identify clear patterns in terms of when and how often changes occur".

What they did identify is nine categories of change. A commit can carry more than one, and 111 of the 169 commits (66%) carried one ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.3, 2026).

| Change category ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Table 2) | Occurrences |
|---|---|
| Add instruction(s) | 78 |
| Modify instruction(s) | 59 |
| Add section(s) | 26 |
| Remove instruction(s) | 23 |
| Modify heading(s) | 23 |
| Modify text | 19 |
| Reformat style | 10 |
| Remove section(s) | 2 |
| Update reference(s) | 2 |

Adding and modifying instructions lead the table, and in every examined file one of the two was the first or second change in its history. The paper's reading: changes are "mostly made to fine-tune and adjust instructions".

Two commits show what that tuning looks like. The rsyslog one from the top of this article is a Remove instruction(s) change: the agent was told to stop calling a style script. In `eclipse-rdf4j/rdf4j`, a commit fixed a flaky test and updated `AGENTS.md` in the same change, so the agent would handle flaky tests during test execution ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.3, 2026). In both, someone watched an agent do the wrong thing and wrote the correction into the file.

## Primary Sources Behind This AGENTS.md Analysis

Every number above comes from one of these five sources, read on 15 November 2026.

| Source | Publisher and date | What we used it for |
|---|---|---|
| [AGENTS.md site](https://agents.md/) | AGENTS.md, a Series of LF Projects, LLC | The 60k adoption figure, compatible tools, setup steps, nested precedence, FAQ |
| [agentsmd/agents.md repository](https://github.com/agentsmd/agents.md) | agentsmd, GitHub, created 19 August 2025 | License, creation date, star and fork counts |
| [AAIF project page](https://aaif.io/projects/agents-md) | Agentic AI Foundation, Linux Foundation | Project listing, contributor and health metrics |
| [Context Engineering for AI Agents in Open-Source Software](https://arxiv.org/abs/2510.21413) | Mohsenimofidi, Galster, Treude and Baltes, arXiv, October 2025, revised February 2026, MSR '26 | Sampling, adoption, file length, Tables 1 and 2, writing styles, commit analysis |
| [GitHub Changelog entry](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/) | GitHub, 28 August 2025 | Copilot coding agent support for root and nested files |

A note on the numbers. The paper reports 466 of 10,000 as 5%; the exact share is 4.66%. Its commit groups run "between two and seven times" and then "at least 10", while a later sentence mentions files with two to eight commits, so we quote the groups as printed. Star counts differ between GitHub and the AAIF dashboard, and we use GitHub's ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), 2026; [agentsmd/agents.md repository](https://github.com/agentsmd/agents.md)).

## Practical AGENTS.md and Context Engineering Checklist

The study measured what teams write, and it didn't measure what works. Use it as a map of common practice and test the rest on your own tasks.

### This week

- Add `AGENTS.md` at the repository root with the exact build and test commands, plus the prohibitive rules you'd otherwise repeat in chat, in the style of "Never commit directly to the main branch" ([Mohsenimofidi et al.](https://arxiv.org/abs/2510.21413), Section 4.2, 2026).
- Settle how it coexists with `CLAUDE.md`, `GEMINI.md` or `.github/copilot-instructions.md` if you already keep one. Either symlink the old name to `AGENTS.md`, as the [AGENTS.md site](https://agents.md/) FAQ shows, or write down which file owns which rules.

### This month

- Split a monorepo's instructions into one nested `AGENTS.md` per package, and confirm with a test task that your agent picks up the nearest file.
- Add a review check: any commit that fixes a test or continuous integration (CI) failure caused by an agent also updates `AGENTS.md`, as the `eclipse-rdf4j/rdf4j` commit did.

Start with the test command. The site says an agent will run the checks you list and fix failures before it finishes, and a root file with one working command is enough to see that happen.
