---
title: "SWE-agent: Why Agent-Computer Interfaces Beat Terminals"
description: "Princeton's SWE-agent shows why raw bash terminals break AI coders. How Agent-Computer Interfaces (ACI) turn LLMs into reliable software engineers."
pubDate: 2026-11-14
category: agents
sources:
  - label: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering (arXiv 2405.15793)"
    url: "https://arxiv.org/abs/2405.15793"
  - label: "SWE-agent Repository on GitHub"
    url: "https://github.com/SWE-agent/SWE-agent"
  - label: "SWE-agent Documentation and Project Site"
    url: "https://swe-agent.com/"
  - label: "SWE-bench Leaderboards"
    url: "https://www.swebench.com/"
  - label: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (arXiv 2310.06770)"
    url: "https://arxiv.org/abs/2310.06770"
---

An agent is asked to fix a parser bug in SymPy. It runs `cat` on the file, and about 1,079 lines land in its context. It tries a one-line `sed` insert, and the shell prints nothing back. Unsure whether the change landed, it starts writing a Python script to make the same change a second way. That trace is the "No edit" panel of Figure 6 in the SWE-agent paper, for the task `sympy__sympy-24102` ([Yang et al.](https://arxiv.org/abs/2405.15793), arXiv 2405.15793, 2024).

If you've wired a language model to a shell, you've watched some version of this. The model is working through an interface built for a person who can skim, scroll back and ignore noise.

The Princeton team's answer was the Agent-Computer Interface (ACI): a small set of commands and feedback formats designed for a language model instead of a person. Below: what breaks in a raw terminal, how the ACI's search, view and edit commands work, what the benchmarks measured, and where the project stands in 2026, now that the same team recommends a bash-only agent.

## The Terminal Trap: Why Giving LLMs Bash Access Fails in Production

The paper starts from an agent talking directly to a Linux shell and lists what goes wrong. The shell has no simple command for editing a small part of a file. It gives no feedback when an edit is invalid. Many of its commands document dozens of options ([Yang et al.](https://arxiv.org/abs/2405.15793), Sections 1 and 2, 2024).

Search has its own costs. The authors call chains of `cd`, `ls` and `cat` "extremely inefficient", and note that `grep` and `find` do better but sometimes return many lines of irrelevant results. A person skips those lines. For a language model, the paper says, all content has a fixed cost in memory and computation, and distracting context can lower performance ([Yang et al.](https://arxiv.org/abs/2405.15793), Sections 2 and 5.1, 2024).

Editing is where the errors pile up. Without an editor command, the agent either rewrites a whole file through redirection or uses `sed`, and neither confirms what changed. In the SymPy trace, the paper names three failure modes: no standard output causes uncertainty, `cat` floods the context window, and the model has to track line numbers and before-and-after state itself ([Yang et al.](https://arxiv.org/abs/2405.15793), Figure 6, 2024).

Interactive programs are a separate limit. SWE-agent's system prompt tells the model that the environment does not support interactive session commands such as `python` or `vim`, a constraint the authors attribute to running inside Docker containers ([Yang et al.](https://arxiv.org/abs/2405.15793), Appendix, 2024).

## What Is an ACI: Principles of Agent-Computer Interface Design

The paper borrows its framing from human-computer interaction (HCI), the field that studies how well interfaces fit the people using them. Its argument is that language model agents are "a new category of end user, with their own needs and abilities". An ACI is meant to do for a model what an integrated development environment (IDE) does for a human engineer ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 2, 2024).

The ACI covers more than the command list. It specifies the commands the model can call, how the state of the environment is reported back, and how earlier commands and observations are trimmed into the next prompt. The authors kept the model fixed and changed only this layer.

Reading agent runs on a development set gave them four design principles ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 2, 2024):

1. **Actions should be simple and easy to understand.** A few options and short documentation, so the model needs fewer demonstrations.
2. **Actions should be compact and efficient.** One action for one meaningful operation, instead of many small steps spread over several turns.
3. **Environment feedback should be informative but concise.** After an edit, show the revised code and little else.
4. **Guardrails mitigate error propagation and hasten recovery.** A syntax checker that catches a mistake at the moment it is made.

None of this replaces the shell. SWE-agent is built on top of it, and the agent can still run ordinary Linux commands.

## Search, View, and Edit: The Three Pillars of SWE-agent Architecture

**Search.** Three commands cover it. `find_file` looks for filenames in the repository, `search_file` looks for a string inside one file, and `search_dir` looks for a string across a directory. Each returns a summary of matches, capped at 50 results per query. Past that cap, the tool reports no results and suggests a more specific query ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 3, 2024).

**File viewer.** `open` shows a window of at most 100 lines. `scroll_down`, `scroll_up` and `goto` move the window. Every view carries the file path, the total line count, the number of lines omitted above and below, and a line number in front of each visible line ([Yang et al.](https://arxiv.org/abs/2405.15793), Figure 3a, 2024).

**File editor.** The agent calls `edit` with a start line and an end line, such as `edit 404:407`, followed by the replacement text and a closing `end_of_edit`. One call replaces the whole range. The viewer then shows the updated file without another command. A linter runs inside `edit`: if the change introduces an error, the agent sees the error with the code before and after, and the edit is discarded ([Yang et al.](https://arxiv.org/abs/2405.15793), Figure 3b, 2024).

A fourth component is context management. Observations older than the last five are each collapsed to a single line. A command that prints nothing gets an explicit message saying it ran successfully and produced no output, which closes the gap that confused the agent in the SymPy trace ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 3, 2024).

The search design came from a failure. The team also tested an iterative search modeled on Vim and VSCode, with `next` and `prev` commands to step through matches. Agents called `next` until every match was inspected, which could use up the cost budget or the context window. That version scored 12.0% on SWE-bench Lite, below the 15.7% the agent reached with no search tools at all. The summarized search scored 18.0% ([Yang et al.](https://arxiv.org/abs/2405.15793), Table 3, 2024).

## Benchmarking the ACI: How Scaffolding Drove SWE-bench from 1.96% to 12.47%

The two numbers in that heading come from two papers, so read them as a timeline, not as an experiment. SWE-bench launched in October 2023 with 2,294 problems taken from real GitHub issues in 12 Python repositories. The best model at release, Claude 2, resolved 1.96% of them. It used BM25 keyword retrieval to pick files and wrote its patch in one pass ([Jimenez et al.](https://arxiv.org/abs/2310.06770), arXiv 2310.06770, 2023).

Seven months later, SWE-agent with GPT-4 Turbo (`gpt-4-1106-preview`) resolved 12.47% of the same test set, 286 of 2,294 tasks. The paper's own baseline for that jump is the retrieval-augmented generation (RAG) setup from SWE-bench, rerun with newer models: 3.79% for Claude 3 Opus and 1.31% for GPT-4 Turbo ([Yang et al.](https://arxiv.org/abs/2405.15793), Table 1, 2024).

For the interface question, the fair comparison is the Shell-only agent: same model, a plain Linux shell. The paper ran it on SWE-bench Lite, a 300-task subset of self-contained bug fixes.

| System on SWE-bench Lite ([Yang et al.](https://arxiv.org/abs/2405.15793), Table 1) | Resolved | Average cost |
|---|---|---|
| RAG with GPT-4 Turbo | 2.67% | $0.13 |
| RAG with Claude 3 Opus | 4.33% | $0.25 |
| Shell-only agent with GPT-4 Turbo, no demonstration | 7.33% | $0.79 |
| Shell-only agent with GPT-4 Turbo | 11.00% | $1.46 |
| SWE-agent with Claude 3 Opus | 13.00% | $2.18 |
| SWE-agent with GPT-4 Turbo | 18.00% | $1.67 |

So the ACI moved GPT-4 Turbo from 11.00% to 18.00% (54 of 300), which the authors report as a 64% relative increase. That is the measured effect of the interface. The shell agent alone, with no ACI, already reached 11.00%, which suggests much of the distance from 1.96% came from newer models and multi-turn interaction ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 5, 2024).

The gain has a price. Against RAG on Lite, the paper puts SWE-agent at 8 to 13 times the cost for a 6.7-fold higher resolve rate, with a $4 budget per task ([Yang et al.](https://arxiv.org/abs/2405.15793), Sections 4 and 5, 2024).

On HumanEvalFix, a benchmark of short bug-fixing tasks, SWE-agent with GPT-4 Turbo reached pass@1 scores of 87.7 in Python, 89.7 in JavaScript and 87.9 in Java. The next-best system in the table, WaveCoder-DS-6.7B, scored 57.9 in Python ([Yang et al.](https://arxiv.org/abs/2405.15793), Table 2, 2024).

## Syntax Feedback and Guardrails: Eliminating Infinite Loops and Hallucinations

The loop the paper documents is specific: a model edits the same snippet again and again, usually after its own edit introduced a syntax error such as wrong indentation or an extra parenthesis ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 5.1, 2024).

Go back to the SymPy task. With the full interface, the agent sends `edit 1055:1059` and adds a stray `{`. The linter answers with an `E999 IndentationError`, a view of how the edit would have looked, the original code, and the line "Your changes have NOT been applied." The agent spots the extra brace and sends a corrected `edit 1055:1060`. Nothing broken was written to disk ([Yang et al.](https://arxiv.org/abs/2405.15793), Figure 6, 2024).

The ablation table prices each piece on SWE-bench Lite with GPT-4 Turbo:

| Change to the interface ([Yang et al.](https://arxiv.org/abs/2405.15793), Table 3) | Resolved | Drop from 18.0% |
|---|---|---|
| `edit` without linting | 15.0% | 3.0 points |
| No `edit` command | 10.3% | 7.7 points |
| File viewer window of 30 lines | 14.3% | 3.7 points |
| File viewer shows the full file | 12.7% | 5.3 points |
| Full history kept instead of the last five observations | 15.0% | 3.0 points |

The heading above says "eliminating", and the paper's own numbers call for a smaller word. Of the 2,294 full-benchmark runs, 1,185 (51.7%) had at least one failed edit. An edit attempt had a 90.5% chance of succeeding eventually, and that fell to 57.2% after one failed edit. Among unresolved Lite tasks, 23.4% were labeled as failures to recover from an edit, and about half (52.0%) were incorrect or overly specific fixes that no linter would flag ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 5.2, 2024). The guardrail keeps a bad edit from landing. It can't tell whether a clean edit is the right one.

## Where SWE-agent Stands Now: mini-SWE-agent and the Bash-Only Baseline

The project has since moved away from the tool-heavy interface. The [SWE-agent repository](https://github.com/SWE-agent/SWE-agent) README opens with a warning that most development effort is now on mini-SWE-agent, "which has superseded SWE-agent", and its news list carries a July 24 item: "Mini-SWE-Agent achieves 65% on SWE-bench verified in 100 lines of python". The [project site](https://swe-agent.com/) adds that SWE-agent is in maintenance-only mode. The [SWE-bench leaderboard site](https://www.swebench.com/) dates the 65% news to July 2025 and now offers a Bash Only view of 500 instances, described as "every model in the same mini-SWE-agent environment". On 14 November 2026, the top mini-SWE-agent row in that page's data was Claude 4.5 Opus at 76.8%.

Read that next to the 2024 result. An ACI lifted GPT-4 Turbo by seven points on Lite, and the same project now gets far higher scores from newer models through a bash-only agent of about 100 lines. Neither the README nor the leaderboard reruns the Shell-only comparison with a current model, so the size of the ACI effect today is unmeasured in these sources.

## Primary Sources Behind This SWE-agent Analysis

Every number above comes from one of these five sources.

| Source | Publisher and date | What we used it for |
|---|---|---|
| [SWE-agent paper](https://arxiv.org/abs/2405.15793) | Yang, Jimenez et al. (Princeton), arXiv, May 2024, revised November 2024, NeurIPS 2024 | ACI definition and principles, command design, Tables 1 to 3, failure analysis, case studies |
| [SWE-agent repository](https://github.com/SWE-agent/SWE-agent) | SWE-agent, GitHub | The mini-SWE-agent warning and the news list |
| [SWE-agent documentation site](https://swe-agent.com/) | SWE-agent team | Maintenance-only notice |
| [SWE-bench leaderboards](https://www.swebench.com/) | SWE-bench team | Bash Only view, news dates, current scores |
| [SWE-bench paper](https://arxiv.org/abs/2310.06770) | Jimenez et al., arXiv, October 2023, ICLR 2024 | Benchmark size and the 1.96% Claude 2 result |

A note on the numbers. The SWE-agent body text gives 88.3% for HumanEvalFix where Table 2 gives 87.7 for Python, and we use the table. The leaderboard lists SWE-agent with Claude 3 Opus at 11.67 on Lite where Table 1 gives 13.00%; we quote the paper ([Yang et al.](https://arxiv.org/abs/2405.15793), 2024; [SWE-bench leaderboards](https://www.swebench.com/)).

## Practical Agent-Computer Interface and Scaffolding Hardening Checklist

The 2024 ablations put a measured price on each interface change. Whether your model still needs them is a question for your own tasks.

### This week

- Isolate raw `bash -c` execution in your team's internal coding agent: run it in a container and tell the model not to call interactive commands such as `vim`, as SWE-agent's system prompt does.
- Add two ACI wrappers in front of the shell: a file viewer that prints line numbers and pages 100 lines at a time, and a range editor that takes `start:end` lines plus replacement text and shows the file after each edit ([Yang et al.](https://arxiv.org/abs/2405.15793), Section 3, 2024).

### This month

- Put an automatic syntax check, an abstract syntax tree (AST) parse or a linter, directly after every agent edit. On a compile error, reject the edit and return the error with the before and after code to the agent before anything is committed.
- Run your own ablation: the same internal tasks through the wrapped tools and through plain bash. Keep the wrappers that raise your resolve rate.

Start with the syntax check. It was worth 3.0 points in the paper, and it is the one piece that stops a broken file from reaching the next step.
