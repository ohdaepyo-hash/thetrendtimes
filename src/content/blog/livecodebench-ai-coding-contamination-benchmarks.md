---
title: "LiveCodeBench: Stopping Test Contamination in AI Coding"
description: "LiveCodeBench tracks time-stamped problems to defeat AI contamination. What holistic evaluation across four scenarios proves for production coding models."
pubDate: 2026-11-12
category: tools
sources:
  - label: "LiveCodeBench: Holistic and Contamination Free Evaluation of Large Language Models for Code (arXiv 2403.07974)"
    url: "https://arxiv.org/abs/2403.07974"
  - label: "LiveCodeBench Project Site and Leaderboard"
    url: "https://livecodebench.github.io/"
  - label: "LiveCodeBench Repository on GitHub"
    url: "https://github.com/LiveCodeBench/LiveCodeBench"
  - label: "CRUXEval: A Benchmark for Code Reasoning, Understanding and Execution (arXiv 2401.03065)"
    url: "https://arxiv.org/abs/2401.03065"
---

A 1.3-billion-parameter coding model scores 59.8% on HumanEval+, the stricter version of the test most model cards quote. Give the same model easy contest problems published after its training data was collected, and it solves 26.3%. The LiveCodeBench authors report both numbers for DS-Ins-1.3B, an instruction-tuned DeepSeek Coder model, as their clearest case of a model that learned the benchmark instead of the skill ([Jain et al.](https://arxiv.org/abs/2403.07974), arXiv 2403.07974, 2024).

If you pick coding models for a team, you've met this gap from the other side. The leaderboard score looked fine, and then the model stalled on your own repository. LiveCodeBench was built to measure that gap: every problem carries a release date, so you can score a model only on problems it could not have seen.

Below: why HumanEval stopped separating models, how LiveCodeBench collects and dates its problems, what its four scenarios measure, which models fall apart on unseen problems, and how self-repair and code execution reorder the rankings. The piece ends with a this-week and this-month checklist for your own evaluation harness.

## The Memorization Crisis: Why HumanEval Saturated in Production

HumanEval has 164 problems, and they have been public since 2021. The LiveCodeBench paper lists what follows from that. Benchmark samples end up in training data. Small models reach scores close to or above GPT-4, so the test no longer separates them. And the original tests were thin: HumanEval+ added more tests per problem and scores sometimes fell by up to 8% ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024).

Contamination means a model saw the test problems, or close copies, during training. Overfitting is the wider case: the model was tuned on data that looks like the benchmark and does well only there. A score can't tell you which one happened. It only shows up when you change the problems.

The CRUXEval authors saw the same split from a different angle two months earlier. They wrote 800 short Python functions and asked models to predict inputs and outputs instead of writing code. Many models with high HumanEval scores did not show the same gains there, and the best setup, GPT-4 with chain-of-thought prompting, reached 75% on input prediction and 81% on output prediction ([Gu et al.](https://arxiv.org/abs/2401.03065), arXiv 2401.03065, 2024).

## Inside LiveCodeBench: Time-Stamped Problems from LeetCode and Codeforces

LiveCodeBench collects problems from contests on three platforms, LeetCode, AtCoder and CodeForces, and tags each one with its release date. The version in the paper holds 511 problems published between May 2023 and May 2024. AtCoder supplies 267 of them and LeetCode 235. CodeForces supplies nine, because the authors found its problems much harder than the other two even after limiting it to Division 3 and Division 4 contests ([Jain et al.](https://arxiv.org/abs/2403.07974), Table 1, 2024).

The set is filtered for grading, not for prestige. LeetCode problems come from weekly and biweekly contests. AtCoder problems come from the beginner rounds, capped at a difficulty rating of 500. Problems with images, or with more than one correct answer, are dropped. What remains is split into 182 easy, 206 medium and 123 hard problems, with 17.0 tests per problem on average ([Jain et al.](https://arxiv.org/abs/2403.07974), Table 1, 2024).

The date tag is the whole mechanism. For a model with a training cutoff, you score only the problems released after it. The paper's first figure shows what that reveals. DS-Base-33B, a DeepSeek base model, went from a Pass@1 of about 60 on LeetCode problems from May 2023 to about 0 on problems from September 2023, the month the model was released. GPT-4o dropped on problems released since November 2023, its stated cutoff. Codestral scored 36.5 on problems from May 2023 to January 2024 and 28.3 on problems since February 2024 ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024). The drop appeared on LeetCode problems and much less on AtCoder ones, which points at LeetCode problems sitting in training data.

The benchmark has kept growing since the paper. The repository lists six releases, from `release_v1` with 400 problems to `release_v6` with 1,055 problems published between May 2023 and April 2025, and the runner takes `--release_version`, `--start_date` and `--end_date` flags so you can score any time window ([LiveCodeBench repository](https://github.com/LiveCodeBench/LiveCodeBench)). The [project site](https://livecodebench.github.io/) hosts the leaderboard, which lets you move the time window and watch the ranking change.

## Four Coding Scenarios: Generation, Self-Repair, Execution, and Test Output

Writing code from a description is one part of programming. LiveCodeBench scores three more ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024):

1. **Code generation.** The model gets a problem statement with example tests and writes a solution. Pass@1 is the share of problems where its first answer passes every hidden test.
2. **Self-repair.** When the first answer fails, the model gets the error message or the failing test and writes a fix. Pass@1 here counts the combined result after one repair step.
3. **Code execution.** The model gets a function and an input and predicts the output without running anything. The setup follows the output prediction task in CRUXEval, with human-written contest solutions in place of generated functions.
4. **Test case output prediction.** The model gets only the problem statement and a test input, with no implementation, and predicts the expected output. It measures whether the model can reason from a written spec to a correct test.

The code execution set has 479 samples drawn from 85 LeetCode problems. The authors started from about 2,000 correct human submissions and filtered out programs with heavy loops or long run times ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024).

Why should a team care about the last two? Because they map to work you already ask a coding agent to do. An agent that predicts what a function returns is reading code. An agent that writes expected outputs from a ticket is writing tests. Neither shows up in a code generation score.

## The Contamination Gap: Why Open-Weight Models Crash on Unseen Tests

The authors plotted each model's Pass@1 on HumanEval+ against its Pass@1 on the easy LiveCodeBench problems. If both tests measured the same skill, the points would sit on a line. The correlation was 0.72, which the paper calls moderate, and the points fell into two groups ([Jain et al.](https://arxiv.org/abs/2403.07974), Figure 5, 2024).

One group stays close to the line. It holds the base models and the closed-access models, including GPT-4, the Claude 3 family and Mistral-Large. The other group sits high on HumanEval+ and low on LiveCodeBench, and it is made up mostly of fine-tuned variants of open-weight models.

| Finding ([Jain et al.](https://arxiv.org/abs/2403.07974), Section 5.2) | HumanEval+ | LiveCodeBench |
|---|---|---|
| DS-Ins-1.3B | 59.8% Pass@1 | 26.3% on the easy subset |
| DS-Ins-6.7B and CodeQwen against Claude 3 Sonnet | Both score higher than Claude 3 Sonnet | Both land more than 20 points behind on the easy subset |
| DS-Ins-33B against GPT-4-Turbo | 4.3 points behind | 16.2 points behind on code generation |

The authors are careful about the cause. They write that fine-tuning data for open models "might not be as diverse" as the data behind closed models, so the tuned models generalize less to new kinds of problems. They don't claim the fine-tunes trained on HumanEval itself ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024). Fine-tuning did help on both benchmarks. It helped far more on the one that has been public for years.

The practical reading: a HumanEval+ score for a fine-tuned open model tells you little about fresh problems. Three open models did close the gap to closed ones in the paper, the instruction-tuned Llama 3 70B, Mixtral and DS-Ins-33B, and all three are tuned from base models above 30 billion parameters.

## Self-Repair vs Code Execution: How Scaffolding Alters Model Rankings

Across models, the four scenarios move together. Every pair of scenarios correlates above 0.88. Code generation and self-repair correlate at 0.98, test output prediction and code execution at 0.96, and code generation against code execution at 0.89, the lowest of the pairs the paper names ([Jain et al.](https://arxiv.org/abs/2403.07974), Figure 13, 2024). Writing code and simulating code are related skills, but a ranking on one is a rougher guide to the other.

Self-repair shows how uneven the payoff from a feedback loop is. On medium problems, GPT-4-Turbo went from 24.5% to 36.9% after one repair step. Gemini Pro went from 8.5% to 9.4% ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024). Both models saw the same error feedback. If your product wraps the model in a retry loop, the score that matters is the one after the loop.

Reasoning-heavy scenarios reorder the top of the table. The appendix tables give these Pass@1 scores on problems released since September 2023 ([Jain et al.](https://arxiv.org/abs/2403.07974), Appendix, 2024):

| Model ([appendix tables](https://arxiv.org/abs/2403.07974)) | Code generation | Test output prediction | Code execution with CoT |
|---|---|---|---|
| GPT-4 (0613) | 33.9 | 52.9 | 64.8 |
| Claude 3 Opus | 32.8 | 58.7 | 80.1 |
| Claude 3 Sonnet | 25.0 | 34.1 | 39.4 |
| Mistral-Large | 24.0 | 46.5 | 54.4 |

Claude 3 Opus trails GPT-4 by about a point on code generation and leads it by more than five points on test output prediction and by 15 on code execution with chain-of-thought (CoT) prompting, where the model writes out its steps before answering. Mistral-Large trails Claude 3 Sonnet on generation and passes it on both reasoning scenarios. The lead has limits: the newer GPT-4-Turbo and GPT-4o versions in the same tables score 66.1 and 68.9 on test output prediction, above Claude 3 Opus ([Jain et al.](https://arxiv.org/abs/2403.07974), Table 5, 2024).

Chain-of-thought prompting is scaffolding too, and it did not help every model. Claude 3 Opus went from 36.5 to 80.1 on code execution with it. DS-Ins-33B went from 26.6 to 31.7, and DS-Ins-1.3B fell from 18.1 to 17.0. The authors note that open models often did worse with the chain-of-thought prompt than without it, while every closed model improved ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024). A model's rank depends on the scaffolding you test it with, so test with yours.

## Primary Sources Behind This LiveCodeBench Analysis

Every number above comes from one of these four sources.

| Source | Publisher and date | What we used it for |
|---|---|---|
| [LiveCodeBench paper](https://arxiv.org/abs/2403.07974) | Jain et al. (UC Berkeley, MIT, Cornell), arXiv, March 2024, revised June 2024 | Problem counts, curation rules, the four scenarios, contamination figures, HumanEval+ comparison, scenario correlations, appendix score tables |
| [LiveCodeBench project site and leaderboard](https://livecodebench.github.io/) | LiveCodeBench team | Benchmark description, time-window leaderboard |
| [LiveCodeBench repository](https://github.com/LiveCodeBench/LiveCodeBench) | LiveCodeBench, GitHub | Release list from `release_v1` to `release_v6`, date-window flags |
| [CRUXEval paper](https://arxiv.org/abs/2401.03065) | Gu et al., arXiv, January 2024 | The output prediction setup behind the code execution scenario, HumanEval mismatch, GPT-4 results |

A note on the numbers. The problem count depends on where you read it: the project site's summary still says over three hundred, the arXiv abstract page says four hundred, and the revised paper says 511 ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024). We use the paper's tables. The models are from 2024, and the paper has no results for Claude 3.5 or anything later. The paper also limits most comparisons to 349 problems released since September 2023, and the authors estimate 1 to 1.5% noise from that sample size, so small gaps between models mean little.

## Practical AI Coding Evaluation and Benchmark Hardening Checklist

The paper's own method is the template: date your problems, score only what the model can't have seen, and measure more than first-try generation.

### This week

- Remove public HumanEval and MBPP problems from your team's internal coding evaluation set. Any model you test has likely seen them, and the 59.8% against 26.3% case shows how far those scores can drift from fresh problems ([Jain et al.](https://arxiv.org/abs/2403.07974), 2024).
- Swap in a time-tagged problem set: run the LiveCodeBench runner with `--start_date` set after your model's training cutoff, or build tasks from commits in a private internal repository made after that date ([LiveCodeBench repository](https://github.com/LiveCodeBench/LiveCodeBench)).

### This month

- Build a four-part evaluation pipeline in your harness: first-try code generation, a self-repair loop that feeds back the failing test, execution simulation where the model predicts a function's output, and test output prediction from the spec alone. Report Pass@1 for each part separately.
- Add a contamination delta to your model selection sheet: the model's score on problems released before its training cutoff minus its score on problems released after. Track a second delta between its public benchmark score and your fresh-set score.
- Choose models on the fresh-set score and the two deltas, not on one public Pass@1 number, and rerun the comparison each time you add newly dated problems.

Start with the date filter. One run with `--start_date` set past the cutoff tells you how much of your current model's score survives on problems it has never seen.
