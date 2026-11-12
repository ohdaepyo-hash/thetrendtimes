# Reddit post for issue 008

Target: r/LocalLLaMA. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post. The account-aging hold lifts on 2026-11-12, so this draft can go out from publication day, as long as the account has recent, non-promotional activity in the subreddit.

## Title

`I read the LiveCodeBench paper: fine-tuned open models at ~60% on HumanEval+ drop to ~26% on fresh contest problems`

## Body

I went through the LiveCodeBench paper, its repo and project site, and the CRUXEval paper it builds on, to see what a contamination-free coding score looks like. Every number below comes from those sources. The models are from 2024, so read this for the method, not for a current ranking.

**What the benchmark is.**

- [LiveCodeBench paper](https://arxiv.org/abs/2403.07974): 511 problems from LeetCode, AtCoder and CodeForces contests, May 2023 to May 2024 (267 AtCoder, 235 LeetCode, 9 CodeForces). Each one has a release date, about 17 tests, and an easy/medium/hard label.
- You score a model only on problems released after its training cutoff.
- The [repo](https://github.com/LiveCodeBench/LiveCodeBench) is now at `release_v6`: 1,055 problems through April 2025, with `--start_date` / `--end_date` flags.

**The contamination evidence.**

- DS-Base-33B: Pass@1 around 60 on May 2023 LeetCode problems, around 0 on September 2023 ones (its release month). The instruct models built on it inherit this.
- GPT-4o dropped on problems released since November 2023, its stated cutoff. Codestral: 36.5 on problems up to January 2024, 28.3 after.
- The drop shows on LeetCode problems and much less on AtCoder.

**HumanEval+ vs fresh problems.**

- Correlation between HumanEval+ and LiveCodeBench-Easy: 0.72.
- DS-Ins-1.3B: 59.8% on HumanEval+, 26.3% on LCB-Easy.
- DS-Ins-6.7B and CodeQwen beat Claude 3 Sonnet on HumanEval+ and land more than 20 points behind it on LCB-Easy.
- DS-Ins-33B: 4.3 points behind GPT-4-Turbo on HumanEval+, 16.2 behind on LCB code generation.
- Base models and closed models stay consistent across both. The gap is mostly in fine-tuned open models. The authors blame less diverse fine-tuning data; they don't claim anyone trained on HumanEval.
- Three open models did keep up with closed ones: Llama 3 70B instruct, Mixtral and DS-Ins-33B.

**Four scenarios, different rankings.**

- Code generation, self-repair, code execution (predict a function's output, after [CRUXEval](https://arxiv.org/abs/2401.03065)) and test output prediction (predict the expected output from the spec alone).
- Generation vs self-repair correlates at 0.98, generation vs execution at 0.89.
- Self-repair on medium problems: GPT-4-Turbo 24.5% to 36.9%, Gemini Pro 8.5% to 9.4%.
- Code execution with CoT: Claude 3 Opus 36.5 to 80.1, DS-Ins-33B 26.6 to 31.7, DS-Ins-1.3B 18.1 to 17.0. Open models often did worse with the CoT prompt than without it.

For people evaluating local coding models: do you keep a dated, private problem set, and how do you pick the cutoff date for a fine-tune whose base model and tuning data have different dates? I'm scoring on problems after the later of the two, and tracking the gap between the public benchmark score and the fresh-set score per model.

Full write-up: thetrendtimes.com
