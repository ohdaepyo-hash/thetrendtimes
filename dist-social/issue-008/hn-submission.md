# Hacker News submission for issue 008

URL: https://thetrendtimes.com/blog/livecodebench-ai-coding-contamination-benchmarks/

## Title candidates (HN limit: 80 characters)

1. `LiveCodeBench: what time-stamped problems show about coding benchmark overfit`
2. `59.8% on HumanEval+, 26.3% on fresh problems: reading the LiveCodeBench paper`
3. `Code generation scores hide how models rank on self-repair and code execution`

Pick 1 by default. Candidate 2 leads with one model's numbers (DS-Ins-1.3B), so use it only if the first submission gets no traction.

## First comment by the submitter

> Primary sources, since the post is mostly a reading of them:
>
> - Paper: https://arxiv.org/abs/2403.07974. 511 problems from LeetCode, AtCoder and CodeForces contests (267 AtCoder, 235 LeetCode, 9 CodeForces), each tagged with a release date. Models are scored only on problems released after their cutoff.
> - The contamination evidence is the useful part: DS-Base-33B goes from Pass@1 of about 60 on May 2023 LeetCode problems to about 0 on September 2023 ones. The drop shows on LeetCode and much less on AtCoder.
> - HumanEval+ vs LiveCodeBench-Easy correlates at 0.72. DS-Ins-1.3B scores 59.8% on the first and 26.3% on the second. The authors attribute the gap to less diverse fine-tuning data, not to training on HumanEval itself.
> - Scenario correlations: 0.98 for generation and self-repair, 0.89 for generation and code execution. Claude 3 Opus trails GPT-4 on generation and leads on test output prediction and code execution with CoT.
> - Repo: https://github.com/LiveCodeBench/LiveCodeBench. Six releases up to 1,055 problems (May 2023 to April 2025), with --start_date and --end_date flags for time windows.
> - CRUXEval, which the execution scenario builds on: https://arxiv.org/abs/2401.03065
>
> Caveats: the paper's models are from 2024, most comparisons use 349 problems, and the authors estimate 1 to 1.5% noise at that size. Contest problems are also not repository work. If you keep a private, dated eval set for coding models, how do you refresh it and how big does it need to be?
