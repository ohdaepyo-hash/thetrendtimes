---
title: "SWE-bench Verified: What Real Bug Fixes Prove for AI Coding"
description: "SWE-bench Verified subsets 500 clean tasks from 2,294 GitHub issues. What the leaderboard proves about autonomous coding, scaffolding, and test harnesses."
pubDate: 2026-11-08
category: tools
sources:
  - label: "SWE-bench Official Leaderboards (accessed 2026-11-08)"
    url: "https://www.swebench.com/"
  - label: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (ICLR 2024, arXiv 2310.06770)"
    url: "https://arxiv.org/abs/2310.06770"
  - label: "OpenAI: Introducing SWE-bench Verified (2024-08-13)"
    url: "https://openai.com/index/introducing-swe-bench-verified/"
  - label: "SWE-bench Official Repository on GitHub"
    url: "https://github.com/SWE-bench/SWE-bench"
---

A scikit-learn user once filed a short issue: `TfidfVectorizer` accepts a `copy` argument and then ignores it. Is that a bug or a design choice? The issue doesn't say. The pull request that closed it settled on a deprecation warning, and the test it added checks for one exact warning string that was agreed in PR comments. In the original SWE-bench, an AI agent had to pass that test from the issue text alone. OpenAI's annotators later rated the task "nearly impossible" ([OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 2024).

That one sample explains why the most-cited coding benchmark had to be rebuilt. The original SWE-bench holds 2,294 real GitHub issues from 12 Python repositories, and the best model in the paper resolved 1.96% of them ([Jimenez et al.](https://arxiv.org/abs/2310.06770), ICLR 2024). The human-checked subset, SWE-bench Verified, keeps 500 of those tasks. On it, the top leaderboard entry resolves 79.2% as of this week ([SWE-bench leaderboard](https://www.swebench.com/), accessed 2026-11-08).

Our [last issue](/blog/mcp-in-production-adoption-data/) looked at how production teams run MCP servers. This one asks what a coding benchmark can prove, and what it can't. Below: how the 2,294 tasks were mined from pull requests, how 93 developers cut them to 500, why the scaffold around a model moves the score more than the model's price, and why the evaluation harness moved to Docker. The closing checklist gives you a this-week and a this-month plan for testing a coding agent on your own code.

## Benchmark Evolution: From Synthetic Puzzles to 2,294 GitHub Pull Requests

Earlier code benchmarks handed a model one function signature and graded one function body. SWE-bench changed the unit of work to a repository. In the authors' words, resolving its issues "frequently requires understanding and coordinating changes across multiple functions, classes, and even files simultaneously, calling for models to interact with execution environments, process extremely long contexts and perform complex reasoning that goes far beyond traditional code generation tasks" ([Jimenez et al.](https://arxiv.org/abs/2310.06770), 2024).

The dataset came out of pull request history, not out of a prompt writer's head. The authors pulled about 90,000 PRs from 12 popular Python repositories, including django, sympy and scikit-learn, and kept only the ones that resolved a linked issue, changed test files and still installed. Each survivor needed at least one test that fails before the fix and passes after it, which the paper calls a fail-to-pass test. That filter left 2,294 task instances. According to the [paper](https://arxiv.org/abs/2310.06770), 40% of instances have at least two fail-to-pass tests, and a median of 51 extra tests run to check that nothing else broke.

Grading is mechanical. The model gets the issue text and the codebase at the commit before the fix. Its patch is applied with the Unix `patch` program and the tests run. Pass every fail-to-pass test and every regression test, and the issue counts as resolved. There is no partial credit and no human in the loop.

The first results were humbling. The ICLR 2024 paper reports that "the best-performing model, Claude 2, is able to solve a mere 1.96% of the issues" ([Jimenez et al.](https://arxiv.org/abs/2310.06770), 2024). That setup gave the model one shot: retrieve some files with BM25, read them, emit a patch. No test run, no second attempt, no shell. Keep that setup in mind, because the scores that followed come from changing it.

## The Verified Curation: How 500 Unit-Tested Tasks Fixed the Flaky Benchmark Problem

By August 2024, the top agent on the full benchmark scored 20%, and 43% on the easier Lite subset ([OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 2024). OpenAI, which uses the benchmark inside its Preparedness Framework, wanted to know how much of the remaining 80% was model failure and how much was the benchmark's own fault.

The answer came from a human annotation campaign. According to [OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 93 Python developers screened 1,699 random samples from the SWE-bench test set. Each sample got three independent labels, and the most severe label won. Annotators checked two things: is the issue text specific enough to act on, and do the fail-to-pass tests reject valid fixes? They also estimated how long a developer would need for each task.

The numbers were worse than the authors of either benchmark expected. [OpenAI](https://openai.com/index/introducing-swe-bench-verified/) reports that 38.3% of samples were flagged for underspecified problem statements, 61.1% for unit tests that could mark valid solutions wrong, and 68.3% were filtered out overall. What remained, after the SWE-bench team and OpenAI agreed on the cut, became SWE-bench Verified: 500 samples released on 2024-08-13 together with the full annotation set.

A good sample looks like the sympy one the annotators chose as an example. The issue pastes four lines of code and the exact `UnboundLocalError` they raise. The test added by the fix asserts that those four lines now return the expected expression. Severity label for both criteria: zero. Compare the scikit-learn case from the opening, where the test demanded a warning message that existed only in PR discussion ([OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 2024).

Did the cut just make the benchmark easier? Partly. Fewer than 10% of Verified tasks are estimated to take a developer more than an hour, and 196 are tagged as under-15-minute fixes. But [OpenAI](https://openai.com/index/introducing-swe-bench-verified/) also plotted resolve rates within each difficulty bucket, and the rates went up inside the buckets, which is what you'd expect from removing impossible tasks rather than hard ones. The headline effect: GPT-4o with the Agentless scaffold went from 16% on the original set to 33.2% on Verified.

## Scaffolding Beats Model Size: What Modern Leaderboard Submissions Share

The leaderboard today lists two kinds of entries. The full Verified board accepts any system, "from simple LM agent loops to RAG systems to multi-rollout and review type systems." The Bash Only view runs every model through the same minimal harness, mini-SWE-agent, which the maintainers describe as "No tools, no special scaffold structure; just a simple ReAct agent loop" ([SWE-bench](https://www.swebench.com/), accessed 2026-11-08).

Put the two side by side and the scaffold's share of the score becomes visible.

| Setup | Model | Scaffold | Resolved | Source and date |
|---|---|---|---|---|
| Single-shot, BM25 retrieval | Claude 2 | None (one patch) | 1.96% | [ICLR 2024 paper](https://arxiv.org/abs/2310.06770) |
| Open-source scaffold on original set | GPT-4o | Agentless | 16% | [OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 2024-08-13 |
| Same scaffold on Verified | GPT-4o | Agentless | 33.2% | [OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 2024-08-13 |
| Bash Only, top entry | Claude 4.5 Opus (high) | mini-SWE-agent | 76.8% | [Leaderboard](https://www.swebench.com/), entry dated 2026-02-17 |
| Full board, top entry | Claude 4.5 Opus | Sonar Foundation Agent | 79.2% | [Leaderboard](https://www.swebench.com/), entry dated 2025-12-05 |

Three things stand out in that table and in the rows below it.

**The loop matters more than the parameter count.** The jump from 1.96% to the 60% to 79% range did not come from a model reading more carefully. It came from letting the model run code, see a traceback, edit again and run the tests. mini-SWE-agent gives a model nothing but a shell and still lands 76.8% ([SWE-bench leaderboard](https://www.swebench.com/), 2026). Every top entry shares that shape: iterate, execute, read the output, iterate again.

**With the same scaffold, price spreads far more than score.** On the Bash Only board, MiniMax M2.5 resolves 75.8% at an average cost of $0.07 per task, while the top entry resolves 76.8% at $0.75 ([SWE-bench leaderboard](https://www.swebench.com/), accessed 2026-11-08). One point of resolve rate, 10 times the cost. If you're choosing a model for an internal agent, that column deserves as much attention as the score.

**A richer scaffold still adds a few points.** The same Claude 4.5 Opus model scores 79.2% under Sonar's agent on the full board and 76.8% under mini-SWE-agent ([SWE-bench leaderboard](https://www.swebench.com/), accessed 2026-11-08). Review steps, multiple rollouts and retrieval buy roughly 2 to 3 points on top of the basic loop. That's real, but it's the smaller lever.

One caution on what the scores prove. Verified tasks are Python, drawn from 12 repositories that were public before 2024 and have likely appeared in training data. A leaderboard number tells you an agent can close a well-specified issue with a reproducing test in a familiar codebase. It says nothing about your proprietary TypeScript monorepo. That's why the checklist at the end asks you to build a small benchmark of your own.

## Execution Isolation: Why Production Coding Agents Need Strict Docker Sandboxes

The third problem OpenAI's annotators found had nothing to do with the issues or the tests. It was the environment. "It is sometimes difficult to reliably set up the SWE-bench development environments for the agents, inadvertently causing unit tests to fail regardless of the solution," the announcement says, and valid patches were being graded wrong ([OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 2024).

The fix was a new harness. In June 2024 the SWE-bench maintainers announced the move to "a fully containerized evaluation harness using Docker for more reproducible evaluations," and the README now states it in one line: "SWE-bench uses Docker for reproducible evaluations" ([SWE-bench repository](https://github.com/SWE-bench/SWE-bench), 2024). Each task pins a repository version and an environment setup commit, and the harness builds an image for it. The recommended machine is x86_64 with at least 120GB of free disk, 16GB of RAM and 8 CPU cores, which tells you how many images a full run produces.

Running the official evaluation on a predictions file is one command:

```sh
swebench eval verified -p predictions.json --run-id my-first-run -j 8
```

Build logs land in `logs/build_images` and per-task results in `logs/evaluation/<run_id>/results.json` ([SWE-bench repository](https://github.com/SWE-bench/SWE-bench)).

The production lesson is the same one the benchmark learned, in reverse. The benchmark needs containers so that a failing test means a wrong patch and not a broken machine. A production coding agent needs them because the loop that makes agents score well, run the code and read the result, is also a loop that executes model-written code on your infrastructure. An agent that can run `pytest` can run anything else. Give it one container per task with the repository mounted, no credentials it doesn't need, and a network policy, then throw the container away when the task ends. The harness already works this way, and it's the cheapest part of the setup to copy.

## Primary Sources Behind This SWE-bench Analysis

Every number and quote above comes from one of these four documents.

| Source | Publisher and date | What we used it for |
|---|---|---|
| [SWE-bench Official Leaderboards](https://www.swebench.com/) | SWE-bench team, accessed 2026-11-08 | Verified and Bash Only resolve rates, costs, mini-SWE-agent description |
| [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770) | Jimenez et al., ICLR 2024 (arXiv 2310.06770) | 2,294 tasks, 12 repositories, fail-to-pass construction, 1.96% baseline |
| [Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/) | OpenAI, 2024-08-13 | 93 annotators, 1,699 samples, 38.3% / 61.1% / 68.3% filtering, 500 tasks, GPT-4o 16% to 33.2% |
| [SWE-bench Official Repository](https://github.com/SWE-bench/SWE-bench) | SWE-bench team, GitHub | Docker harness, hardware requirements, evaluation command |

One note on the citation trail. The Verified subset has no paper of its own. The SWE-bench site and repository point to the OpenAI announcement for its methodology and to the ICLR 2024 paper for citation, so that's what we link.

## Practical Coding Agent Benchmark Checklist

The benchmark's own history gives the order of operations: get the tests right, then the loop, then the sandbox, then measure.

### This week

- Audit your CI pipeline for bug reports that arrive without a reproducing test, and add a step that asks for one before an agent touches the issue. Verified exists because 61.1% of original tasks had tests that didn't match the issue ([OpenAI](https://openai.com/index/introducing-swe-bench-verified/), 2024).
- Replace any single-prompt "generate a patch" call in your tooling with a loop that runs the linter and the failing test and feeds the output back. That change, not a bigger model, is what moved the leaderboard from 1.96% ([Jimenez et al.](https://arxiv.org/abs/2310.06770), 2024).

### This month

- Build a private benchmark of 50 tasks from your own closed issues, each with a fail-to-pass test, and score your agent on it with the `swebench eval` harness as the template ([SWE-bench repository](https://github.com/SWE-bench/SWE-bench)).
- Deploy a one-container-per-task sandbox for agent runs, with no shared credentials and an explicit network policy, before you let an agent execute tests on anything that matters.
- Record cost per resolved task alongside resolve rate, the way the Bash Only board does, so the model decision is made on both columns ([SWE-bench leaderboard](https://www.swebench.com/), accessed 2026-11-08).

Once your 50-task set has a baseline score, rerun it every time you change the scaffold and keep the model fixed. If the score moves, you'll know which lever did it.
