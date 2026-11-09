# Hacker News submission for issue 006

URL: https://thetrendtimes.com/blog/function-calling-benchmarks-ast-evaluation/

## Title candidates (HN limit: 80 characters)

1. `What the Berkeley Function Calling Leaderboard's AST checker actually tests`
2. `Valid JSON, wrong call: lessons from 2,000 function calling test cases`
3. `Function calling benchmarks: AST checks vs. execution for LLM tool use`

Pick 1 by default. Candidate 2 is the stronger hook but reads closer to clickbait under HN's title rules; use it only if the first submission gets no traction.

## First comment by the submitter

> Primary sources, since the post is mostly a reading of them:
>
> - BFCL v1 blog: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html. 2,000 cases across simple, multiple, parallel and parallel-multiple calls, plus 240 irrelevance cases. The AST rules are the useful part: no parameters outside the schema, `"true"` is not a bool, values checked against a list of accepted answers.
> - Dataset card: https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard. V2 Live is user-contributed: 1,037 multiple vs 258 simple, 875 irrelevance. V3 adds 1,000 multi-turn cases.
> - Repo: https://github.com/ShishirPatil/gorilla. The executable categories were retired from the leaderboard on 2025-04-09 (#943), which surprised me; most write-ups still describe BFCL as AST plus execution.
> - Gorilla paper: https://arxiv.org/abs/2305.15334. Zero-shot GPT-4 hallucinated TensorFlow Hub APIs 78.65% of the time; the fine-tuned LLaMA-7B, 5.40%.
>
> The example I keep coming back to: GPT-4 passed `annual_interest_rate: 5` where the function wanted `0.05`. Valid JSON, valid type. Neither an AST check nor an execution check flags it unless someone wrote down the accepted values.
>
> Question for people running tool-using agents in production: do you test argument values against expected answers, or only validate against the schema?
