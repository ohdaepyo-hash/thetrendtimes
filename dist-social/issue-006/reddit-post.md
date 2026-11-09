# Reddit post for issue 006

Target: r/LocalLLaMA. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post. Hold this draft for seven days after publication (earliest 2026-11-17) and until the account has enough recent, non-promotional activity in the subreddit.

## Title

`I read the BFCL and Gorilla primary sources: what the function calling AST checker actually tests, and why valid JSON still fails`

## Body

I went through the four primary sources behind the Berkeley Function Calling Leaderboard (the Gorilla paper, the BFCL v1 blog, the HF dataset card and the GitHub repo) to see what a BFCL score means. Every number below comes from those sources.

**What's in the dataset.**

- [BFCL v1 blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html): 2,000 cases. 1,680 Python, 100 Java, 50 JavaScript, 70 REST, 100 SQL, across 40 sub-domains.
- Python shapes (AST / exec): simple 400 / 100, multiple 200 / 50, parallel 200 / 50, parallel multiple 200 / 40. Plus 240 irrelevance cases where the right answer is no call.
- [Dataset card](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard): V2 Live (user-contributed) has 1,037 multiple vs 258 simple, and 875 irrelevance cases. V3 adds 200 base + 800 augmented multi-turn (missing params, missing functions, long context, composite).

**What the AST checker compares.**

- Function name (dots swapped for `_`), required params present, no params outside the schema (counted as hallucination).
- Strict types: `"true"` is not a bool, float for an int param fails everywhere. Python allows int for float.
- Lists ordered, strings case-insensitive with whitespace and some punctuation stripped, values matched against a list of accepted answers.
- Parallel calls matched in any order, all or nothing.

**The example that sums it up.** $5000 at 5% for three years: GPT-4 called the right function with `annual_interest_rate: 5` instead of `0.05`. Valid JSON, valid type, wrong by 100x. No parser catches that; only the accepted-answer list does.

**Heads-up if you plan to run it.** The [repo](https://github.com/ShishirPatil/gorilla) changelog retired the four `exec_*` categories from the leaderboard on 2025-04-09 (#943). Current runner is `pip install bfcl-eval`, then `bfcl generate` / `bfcl evaluate` with `--test-category`.

**Hallucination numbers from the original [Gorilla paper](https://arxiv.org/abs/2305.15334) (2023, zero-shot).** TensorFlow Hub hallucination: GPT-4 78.65%, Claude 88.46%, GPT-3.5 47.88%, fine-tuned LLaMA-7B (Gorilla) 5.40%. GPT-4 hallucinated more than GPT-3.5 on all three hubs. Old models, but it's the clearest evidence I know that fine-tuning on your tool format beats raw size.

For people running local models with tools: which BFCL categories do you actually use as a regression gate? I'm leaning toward `simple_python`, `multiple`, `parallel` and `irrelevance` plus 20 hand-written cases for our own tools.

Full write-up: thetrendtimes.com
