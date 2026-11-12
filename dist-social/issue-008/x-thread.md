# X thread for issue 008

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/livecodebench-ai-coding-contamination-benchmarks/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

A small coding model scores 59.8% on HumanEval+. On easy contest problems published after its training data, it solves 26.3%.

Same model, same skill on paper. One test was public for years.

What LiveCodeBench shows about contamination in AI coding benchmarks:

### 2/7

How it works: LiveCodeBench pulls problems from LeetCode, AtCoder and CodeForces contests and tags each with its release date.

511 problems in the paper, 1,055 in the latest release.

Score a model only on problems released after its training cutoff.

### 3/7

It scores four scenarios, not one:

Code generation: write the solution
Self-repair: fix it from the failing test
Code execution: predict what a function returns
Test output prediction: predict the expected output from the spec alone

### 4/7

HumanEval+ and LiveCodeBench-Easy correlate at only 0.72.

Models split into two groups. Base and closed models score alike on both. Fine-tuned open models score high on HumanEval+ and drop on fresh problems.

DS-Ins-33B: 4.3 points behind GPT-4-Turbo on one, 16.2 on the other.

### 5/7

Rankings move with the scenario.

Generation vs self-repair: 0.98 correlation. Generation vs code execution: 0.89.

Claude 3 Opus trails GPT-4 on generation (32.8 vs 33.9) and leads on code execution with chain-of-thought (80.1 vs 64.8).

### 6/7

Harden your own coding eval:

Drop public HumanEval and MBPP problems
Use time-tagged problems or private repo commits dated after the model's cutoff
Score self-repair and execution prediction too
Track the gap between public and fresh-set scores

### 7/7

Full analysis with the contamination figures, the four-scenario scores, primary sources and a this-week / this-month checklist:
https://thetrendtimes.com/blog/livecodebench-ai-coding-contamination-benchmarks/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
