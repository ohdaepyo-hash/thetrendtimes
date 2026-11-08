---
title: "GAIA Benchmark: Why Multi-Modal Tool Use Breaks AI Agents"
description: "GAIA benchmarks 466 assistant tasks across three tiers. Humans hit 92%, early agents 15%, and compounding multi-step tool execution errors explain the gap."
pubDate: 2026-11-09
category: agents
sources:
  - label: "GAIA: A Benchmark for General AI Assistants (ICLR 2024, arXiv 2311.12983)"
    url: "https://arxiv.org/abs/2311.12983"
  - label: "GAIA Official Leaderboard on Hugging Face (accessed 2026-11-09)"
    url: "https://huggingface.co/spaces/gaia-benchmark/leaderboard"
  - label: "GAIA Dataset on Hugging Face"
    url: "https://huggingface.co/datasets/gaia-benchmark/GAIA"
  - label: "smolagents Framework Repository on GitHub"
    url: "https://github.com/huggingface/smolagents"
---

A user uploads `uploaded.xlsx`, the menu sales of a fast-food chain, and asks for total food sales in USD, drinks excluded. GPT-4 in Advanced Data Analysis mode loads the sheet with pandas, sums five columns, skips the soda column and answers `$89706.00`. Correct. That's one of the easy ones in GAIA, and it already takes a file reader, a code interpreter and a judgment call about what counts as food ([Mialon et al.](https://arxiv.org/abs/2311.12983), ICLR 2024).

GAIA asks 466 questions like that one. Human annotators answered 92% of them correctly. GPT-4 with hand-picked plugins answered 15%, and 0% at the hardest level ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). Three years later, the top entry on the official test-set leaderboard scores 94.35%, a multi-model system submitted on 2026-11-03 ([GAIA leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard), accessed 2026-11-09).

So agents caught up. The interesting question is how, because the failure modes GAIA exposed in 2023 are the same ones your internal agent hits today on files and tool chains GAIA never saw. Our [last issue](/blog/swe-bench-verified-ai-coding-benchmarks/) found that the scaffold around a coding model moved SWE-bench more than the model did. GAIA tells the same story for general assistants. Below: how the three levels are built, why files and multi-step tool chains broke early agents, what an error recovery loop looks like in a real framework, and a this-week and this-month plan for testing your own agent the GAIA way.

## The Assistant Gap: 92% Human Baseline vs 15% Early Agent Success

GAIA came out of FAIR at Meta, Hugging Face and AutoGPT, and its design runs against the usual benchmark trend. Most benchmarks chase tasks that are hard for humans: bar exams, olympiad math. GAIA picks tasks that are "conceptually simple for humans yet challenging for most advanced AIs" ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). Find a clinical trial's enrollment count on the NIH website. Check a pint of ice cream against the US butterfat standard as Wikipedia reported it in 2020. Each question has one short answer, a number or a few words, scored by quasi exact match.

The human baseline is solid because of how it was measured. Two new annotators answered each of 623 freshly written questions. A question stayed only if their answers matched the designer's, and the human score is the share of those answers that were right: 94% at Level 1, 92% at Level 2, 87% at Level 3 ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). Humans needed 6.8 minutes on average for a Level 1 question and 17.7 minutes for Level 3.

The models looked like this in the paper's Table 4:

| System, 2023 ([Table 4](https://arxiv.org/abs/2311.12983)) | Level 1 | Level 2 | Level 3 |
|---|---|---|---|
| GPT-4, no tools | 9.1% | 2.6% | 0% |
| GPT-4 Turbo, no tools | 13.0% | 5.5% | 0% |
| AutoGPT (GPT-4 backend) | 14.4% | 0.4% | 0% |
| GPT-4 + plugins (chosen by humans) | 30.3% | 9.7% | 0% |
| Human annotators | 93.9% | 91.8% | 87.3% |

Two details in that table matter more than the headline. First, the plugin score is an "oracle" estimate: there was no API for GPT-4 with plugins, so the authors picked up to three plugins by hand for each question ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). The best 2023 result needed a human to choose the tools. Second, AutoGPT, which chose its own tools, scored 0.4% at Level 2, below GPT-4 with no tools at all. Letting the model drive the tool chain made things worse.

## Three Tiers of Friction: How 466 Questions Test Autonomous Tool Chains

The levels are defined by how much work a human did to answer, counted in steps and distinct tools ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024):

- **Level 1**: no tools, or one tool and no more than five steps. 146 questions.
- **Level 2**: roughly five to 10 steps, combining different tools. 245 questions.
- **Level 3**: arbitrarily long action sequences, any number of tools, access to "the world in general." 75 questions.

The split between public and private data shapes how the benchmark is used. According to the [paper](https://arxiv.org/abs/2311.12983), 166 annotated questions form a public developer set, and answers to the other 300 stay private to power the leaderboard. The [dataset card](https://huggingface.co/datasets/gaia-benchmark/GAIA) describes the same structure: each level has a fully public validation split and a test split with private answers. The dataset is gated, and the card asks users not to reshare questions in a crawlable format, which is how GAIA tries to stay out of pretraining data.

Files are where the tiers get expensive. Some questions ship with an attachment named in a `file_name` field, and as of the October 2025 format update, attachments sit next to Parquet metadata, with paths like `2023/test/<attachment-id>.pdf` ([GAIA dataset](https://huggingface.co/datasets/gaia-benchmark/GAIA)). The paper's initial count of file types puts spreadsheets on top: 29 `xlsx` files, 18 `png`, 15 `pdf`, 13 `txt`, seven `mp3` and seven `jpg`, plus a tail of `csv`, `docx`, `pptx`, `zip`, `xml`, a `.MOV` video and an `m4a` recording ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024, Figure 6).

Capabilities overlap. Of the 466 questions, the human annotators reported needing web browsing for 355, coding for 154, multi-modality for 138 and "diverse filetype reading" for 129 ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024, Figure 3). A typical Level 2 question touches two or three of those. That's the point: a capability that works 95% of the time in isolation gets multiplied by every other capability on the path.

## Why Multi-Modal Reasoning Fails: Context Blowout and Parameter Mismatch

The paper's per-capability chart makes the first failure plain. "Unsurprisingly, GPT4 cannot deal with files and multi-modality, yet manages to solve questions for which annotators used web browsing, mostly because it properly memorised pieces of information" ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). Without a file tool, a model answers from memory. With a file tool, it has to get the file's contents into its context in a usable shape, and that's where two engineering problems start.

**Context blowout.** A spreadsheet or PDF doesn't arrive as an answer. It arrives as raw text: every cell, every footer, every page. Dump a 40-page PDF or a scraped web page into the prompt and the one row that matters competes with thousands of tokens that don't. The model either loses the detail or runs out of room for the steps that follow. The Hugging Face team's GAIA agent shows how real this is. Its README says that for "each single-page .pdf or .xls file," the team opened it in a file reader, took a `.png` screenshot and loaded the screenshot instead of the original ([smolagents repository](https://github.com/huggingface/smolagents), `examples/open_deep_research`). A team building an agent for GAIA decided an image of a spreadsheet was easier for the model to read than the spreadsheet.

**Parameter mismatch.** Every tool call is a small function call the model writes from scratch: a URL, a page range, a column name, a search query. A plausible-looking but wrong argument returns a plausible-looking but wrong result, and nothing downstream knows. The paper names the evaluation consequence: GAIA scores the system as a whole, so an error from a module such as "an image classifier returning the wrong label" is never attributed to that module ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). The authors also note they could not do fine-grained analysis because the API gave no detailed log of tool calls. If you can't see the call, you can't tell a bad argument from a bad answer.

The arithmetic of a tool chain explains why Level 2 collapsed while Level 1 didn't. Suppose every step in a chain succeeds 90% of the time and the steps fail independently. Five steps, the top of Level 1's range, finish 59% of the time. Seven steps finish 47.8% of the time, because 0.9 to the seventh power is 0.478. Ten steps, the top of Level 2's range, finish 34.9% of the time. These are our illustrative numbers, not measurements from GAIA, but they match the shape of the 2023 results: the best system fell from 30.3% at Level 1 to 9.7% at Level 2 ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). GAIA gives no partial credit, so a single bad step anywhere in the chain zeroes the answer.

## Error Recovery Loops: Why Single-Attempt Execution Caps Agent Performance

The compounding math has one escape: make a failed step cost a retry, not the whole task. A chain of 90% steps where each failure is caught and retried once behaves like a chain of 99% steps (if the retry is as good as the first try), and 0.99 to the seventh power is 93%. The 2023 paper already saw the behaviour that matters. GPT-4 with plugins showed "backtracking or query refinement when the result is not satisfying" ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024). It was the only system that did, and it was the best system.

Modern agent frameworks build that loop in. In [smolagents](https://github.com/huggingface/smolagents), Hugging Face's open-source agent library, three pieces of the source show how:

- **Argument validation before execution.** Before a tool runs, `validate_tool_arguments` checks the call against the tool's input schema: unknown argument names, missing required arguments and wrong types raise an error. The agent wraps it as an `AgentToolCallError` instead of crashing.
- **Errors fed back as the next observation.** When a step fails, the agent's memory appends the error text to the next prompt, followed by: "Now let's retry: take care not to repeat previous errors! If you have retried several times, try a completely different approach."
- **Bounded loops and answer checks.** Agents stop after `max_steps` (20 by default), can re-plan every `planning_interval` steps, and can run `final_answer_checks`, a list of validation functions that must pass before a final answer is accepted.

None of these makes the model smarter. Each one turns a silent failure into a visible one and gives the model another turn to fix it. The same repository's open Deep Research example reports 55% pass@1 on the GAIA validation set, against 67% for OpenAI's Deep Research ([smolagents repository](https://github.com/huggingface/smolagents), `examples/open_deep_research`).

The current leaderboard shows where the loop leads when you add more of everything. As of 2026-11-09, every entry in the top 100 of the [GAIA test leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard) scores 91% or more. The leader, Keen AgenticOS V1.1, scores 97.85% on Level 1, 93.71% on Level 2 and 89.8% on Level 3, and lists three model families (DeepSeek, Kimi, Claude) behind it. Several entries near the top are named "harness," not after a model. The maintainers closed the validation leaderboard because it "was no longer informative." Level 3 is still the lowest column for the leader, which fits the compounding math: longer chains leave more room for an unrecovered error.

## Primary Sources Behind This GAIA Evaluation

Every number and quote above comes from one of these four sources.

| Source | Publisher and date | What we used it for |
|---|---|---|
| [GAIA: A Benchmark for General AI Assistants](https://arxiv.org/abs/2311.12983) | Mialon, Fourrier, Swift, Wolf, LeCun, Scialom (FAIR Meta, Hugging Face, AutoGPT), ICLR 2024 | 466 questions, level definitions and counts, 92% vs 15%, Table 4 scores, file-type and capability counts, the xlsx example |
| [GAIA Official Leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard) | GAIA team on Hugging Face, accessed 2026-11-09 | Current test-set scores, submission dates, closed validation board |
| [GAIA Dataset](https://huggingface.co/datasets/gaia-benchmark/GAIA) | GAIA team on Hugging Face, Parquet update October 2025 | Validation and test split structure, gating rules, attachment paths |
| [smolagents](https://github.com/huggingface/smolagents) | Hugging Face, GitHub | Argument validation, retry prompt, `max_steps` default, open Deep Research GAIA score and file preprocessing |

A note on level counts. Some summaries of GAIA list 166 questions at Level 1. That number is the size of the public developer set, not a level. The paper's Table 4 gives 146, 245 and 75 questions for Levels 1 to 3, which add up to 466.

## Practical Agent Evaluation and Hardening Checklist

GAIA's history gives the order: test on real files, validate every call, then let the agent retry.

### This week

- Write 10 GAIA-style evaluation scenarios for your internal agent, each with a single short answer you can check by exact match, and attach a real spreadsheet or PDF to at least half of them. GAIA's most common attachment is `xlsx` ([Mialon et al.](https://arxiv.org/abs/2311.12983), 2024).
- Add tool-call parameter validation middleware that checks every call against the tool's JSON schema before it runs and logs rejected calls with the arguments. Use `validate_tool_arguments` in smolagents as the reference ([smolagents repository](https://github.com/huggingface/smolagents)).

### This month

- Build an automatic retry and context pruning loop into your agent scaffold: on a tool error, feed the error text back as the next observation, cap retries per step, and replace raw file and page dumps with extracted excerpts before they enter the prompt.
- Run an open-source agent framework such as smolagents against a fixed subset of the GAIA validation split, then score your own agent on the same subset with the same exact-match rule. Request access to the gated dataset first ([GAIA dataset](https://huggingface.co/datasets/gaia-benchmark/GAIA)).
- Log step count and failure step for every run, so you can see whether failures cluster at Level 2 and Level 3 lengths the way the 9.7% Level 2 score did in 2023.

Once your 10 scenarios have a baseline, rerun them every time you change a tool or the retry policy and keep the model fixed. If the score moves, you'll know which change did it.
