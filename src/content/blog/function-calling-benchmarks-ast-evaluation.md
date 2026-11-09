---
title: "Function Calling Benchmarks: How AST Checks Harden AI Agents"
description: "Berkeley Function Calling Leaderboard tests 2,000+ API scenarios across AST and live execution. How parameter checks and error loops stop tool failures."
pubDate: 2026-11-10
category: tools
sources:
  - label: "Gorilla: Large Language Model Connected with Massive APIs (arXiv 2305.15334)"
    url: "https://arxiv.org/abs/2305.15334"
  - label: "Gorilla and Berkeley Function Calling Leaderboard Repository on GitHub"
    url: "https://github.com/ShishirPatil/gorilla"
  - label: "Berkeley Function-Calling Leaderboard Blog (UC Berkeley Gorilla team, updated 2024-08-19)"
    url: "https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html"
  - label: "Berkeley Function Calling Leaderboard Dataset on Hugging Face"
    url: "https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard"
---

A user asks for the future value of a $5000 investment at 5% annual interest over three years, compounded monthly. GPT-4 picks the right function, `finance.predict_future_value`, fills in four arguments and returns a clean JSON object. One argument is `annual_interest_rate: 5`. The function expects `0.05`. The call parses, the types check out, and the result is wrong by a factor of 100 ([BFCL blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html), 2024).

That example comes from the "Common Mistakes" section of the Berkeley Function Calling Leaderboard (BFCL), the UC Berkeley Gorilla team's benchmark for how language models call tools. It's the failure most agent teams meet in production: the model's output is valid JSON, your schema validator says yes, and the tool still does the wrong thing.

If you run an agent with more than a handful of tools, you've probably seen this already. BFCL is the most detailed public attempt to measure it. Below: how its 2,000 test cases are split ([BFCL dataset](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard)), what its Abstract Syntax Tree (AST) checker actually compares, where models hallucinate tools and parameters, and a this-week and this-month plan for hardening your own tool layer.

## Why Function Calling Fails: The Gap Between JSON Syntax and Real Execution

A function call has three layers that can each be right or wrong on their own. The syntax layer asks whether the output parses. The schema layer asks whether the function exists, required parameters are present and types match. The meaning layer asks whether the values do what the user asked. JSON mode and most structured-output features guarantee the first layer. Strict schema validation covers most of the second. Nothing in the request format covers the third.

The Gorilla team saw this before BFCL existed. Their 2023 paper describes models that generate inaccurate input arguments and "hallucinate the wrong usage of an API call," and introduces a fine-tuned LLaMA model that beat GPT-4 at writing API calls ([Patil et al.](https://arxiv.org/abs/2305.15334), arXiv 2305.15334, 2023). The paper's test set, APIBench, holds 1,645 API calls from TorchHub, TensorFlow Hub and Hugging Face, with 16,450 instruction and API pairs generated from them.

The blog's other examples show how varied the meaning-layer failures are. GPT-4 left the `url` parameter of a `requests.get` call as `"Missing"` when asked for weather data, though the function description named the Open-Meteo endpoint as the default. Mistral-medium produced `solve\_quadratic\_equation(a=2, b=6, c=5)`, with each `_` escaped as `\_`, so the arguments could be extracted but the call couldn't run ([BFCL blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html), 2024). One is a missing value, one is a formatting artifact and the interest-rate case is a unit error. Only the formatting artifact would trip a parser. The other two pass any schema check.

## Inside BFCL: 2,000 Scenarios Across Simple, Multiple, and Parallel Calls

BFCL launched on 2024-02-26 with 2,000 question, function and answer pairs: 1,680 in Python, 100 in Java, 50 in JavaScript, 70 REST API calls and 100 SQL queries, drawn from 40 sub-domains such as mortgage finance, algebra and soccer ([BFCL blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html), 2024). The Python cases fall into four shapes:

- **Simple**: one function document, one call. 400 AST cases and 100 executable cases.
- **Multiple**: two to four function documents, and the model must pick the one right call. 200 AST, 50 executable.
- **Parallel**: one function, several calls from one user query, such as the same lookup for three cities. 200 AST, 50 executable.
- **Parallel multiple**: several functions, each called zero or more times. 200 AST, 40 executable.

Those counts come from the [dataset card](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard). Next to them sits a category that tests restraint. In function relevance detection, 240 cases give the model only functions that can't answer the question, and the correct output is no call at all. The authors describe it as a test of "whether a model will hallucinate on its functions and parameters to generate function code despite lacking the function information."

The benchmark grew in two later releases. BFCL V2 Live added user-contributed data: 258 simple, 1,037 multiple, 16 parallel and 24 parallel multiple cases, plus 875 irrelevance cases and 41 relevance cases ([Hugging Face dataset card](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard)). In the live data, multiple-function cases outnumber simple ones four to one, and irrelevance cases are the second-largest group. BFCL V3 added 200 base multi-turn conversations and 800 augmented ones with missing parameters, missing functions and long context. The [repository](https://github.com/ShishirPatil/gorilla) now also lists V4 categories for web search, memory and format sensitivity.

## Abstract Syntax Tree vs Execution: Why Type Matching Is Not Enough

An Abstract Syntax Tree is the parsed structure of a piece of code: which function is called, with which named arguments, holding which constant values. BFCL parses each model output into one, then checks it against the function document and a list of acceptable answers ([BFCL blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html), 2024). The checker runs in this order:

1. **Function name.** Must match a possible answer. Dots are replaced with `_`, because some APIs reject dots in names.
2. **Required parameters.** Every parameter marked `required` in the function document must be present.
3. **No extra parameters.** Any parameter not in the function document fails the case. The blog calls this "flagging the model hallucination outputs."
4. **Types.** Booleans must be real booleans, not the strings `"true"` or `"false"`. A float passed where the document says integer fails in every language. In Python only, an integer is accepted for a float.
5. **Values.** Lists must match in order. Strings are compared case-insensitively after removing whitespace and some punctuation, so `"New York City"` and `"NYC"` can both be listed as correct.

For multiple and parallel cases, the checker runs the simple check on each call and matches calls to answers in any order. It's all or nothing: one unmatched answer fails the case.

The executable side ran the generated calls. Non-REST functions had to return an exact match, a structural match (same type, same list length, same dict keys) or, for live numeric data, a value within 20% of the expected result. REST calls were judged on whether they executed, whether the response type matched and whether the JSON keys matched the ground truth ([BFCL blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html), 2024). The authors wrote that "ideally one should use execution evaluation" and used AST because many calls, such as the Java ones, can't be run in a test harness.

The interest-rate example shows the limit of both methods. An AST check passes `5` as a valid number. An execution check returns a number too. Only a list of acceptable values, written by someone who knows the function wants a fraction, catches it. That's why BFCL's answer lists, not its parser, do most of the work.

One change matters if you plan to use BFCL today. On 2025-04-09 the maintainers retired the four executable categories from the leaderboard, removing `exec_simple`, `exec_parallel`, `exec_multiple` and `exec_parallel_multiple` from the evaluation pipeline (pull request #943 in the [Gorilla repository](https://github.com/ShishirPatil/gorilla) changelog). The BFCL leaderboard you see today is scored on AST and multi-turn categories, not on running single calls. If you want execution checks against your own tools, you'll have to write them.

## Hallucinated Tools and Parameter Drift: Where Leading Models Break Down

The Gorilla paper measured tool hallucination before BFCL did, using AST sub-tree matching. It defines a hallucination as "an API call that is not a sub-tree of any API in the database," which means the model invoked a tool that doesn't exist ([Patil et al.](https://arxiv.org/abs/2305.15334), 2023). Zero-shot results in the paper's Table 1:

| Model, zero-shot ([Table 1](https://arxiv.org/abs/2305.15334)) | TorchHub accuracy | TorchHub hallucination | TensorFlow Hub accuracy | TensorFlow Hub hallucination |
|---|---|---|---|---|
| GPT-3.5 | 48.38% | 18.81% | 41.75% | 47.88% |
| GPT-4 | 38.70% | 36.55% | 18.20% | 78.65% |
| Claude | 18.81% | 65.59% | 9.19% | 88.46% |
| Gorilla (fine-tuned LLaMA) | 59.13% | 6.98% | 83.79% | 5.40% |

GPT-4 hallucinated more often than GPT-3.5 on all three hubs, and the authors observed the same pattern with every retriever they tried ([Patil et al.](https://arxiv.org/abs/2305.15334), 2023). On Hugging Face, GPT-4 sometimes filled `pretrained_model_name_or_path` with a GitHub name that had no Hugging Face repository, or assumed a local path like `your_model_name`. Those are 2023 models, and the rates have moved since. The failure patterns haven't, and BFCL tests for each of them:

- **Hallucinated parameters.** The model adds an argument the schema never defined. BFCL fails the whole case for it.
- **Type mismatch.** A string where the schema wants a number, or `"true"` for a boolean. BFCL accepts neither.
- **Order dependency.** BFCL V1 deliberately ignores the order of parallel calls, so it can't catch a model that reads a file before creating it. That's what V3's multi-turn categories test, with 200 cases each for missing parameters and missing functions ([dataset card](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard)).
- **False-positive calls.** The model calls a tool when none fits. V2 Live has 875 irrelevance cases built from real user data to measure this.

Fine-tuning moved these numbers more than model size did. On TensorFlow Hub, the fine-tuned Gorilla model hallucinated 5.40% of the time against GPT-4's 78.65% ([Patil et al.](https://arxiv.org/abs/2305.15334), 2023). The BFCL blog reaches a similar conclusion for simple calls: "finetuning an open-source can be as effective as propriety models." For an agent team, the lesson is narrower. Your tool definitions and checks shape the failure rate, and you control both.

## Primary Sources Behind This Function Calling Analysis

Every number and quote above comes from one of these four sources.

| Source | Publisher and date | What we used it for |
|---|---|---|
| [Gorilla: Large Language Model Connected with Massive APIs](https://arxiv.org/abs/2305.15334) | Patil, Zhang, Wang, Gonzalez (UC Berkeley, Microsoft Research), arXiv, May 2023 | APIBench size, AST sub-tree matching, hallucination definition, Table 1 accuracy and hallucination rates |
| [Gorilla repository](https://github.com/ShishirPatil/gorilla) | UC Berkeley Gorilla team, GitHub | Retirement of executable categories (2025-04-09), current V4 test categories, `bfcl` evaluation commands |
| [Berkeley Function-Calling Leaderboard blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html) | Yan, Mao, Ji, Stoica, Gonzalez, Zhang, Patil, last updated 2024-08-19 | 2,000-case V1 composition, AST and execution rules, common-mistake examples |
| [BFCL dataset](https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard) | Gorilla LLM on Hugging Face, latest release 2024-09-22 | Per-category counts for V1, V2 Live and V3 |

A note on JavaScript counts. The blog's leaderboard table and the dataset card list 50 JavaScript AST cases, while one paragraph in each says 70. We used 50, which matches the 2,000 total.

## Practical Function Calling and Tool Hardening Checklist

BFCL's checker gives the order: reject what can't be right before it runs, tell the model why, then measure.

### This week

- Turn on strict JSON Schema validation for every tool definition in your agent: set `additionalProperties: false`, list every `required` parameter and use exact types, so a hallucinated parameter or a `"true"` string is rejected before execution. BFCL fails both ([BFCL blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html), 2024).
- Add an error feedback loop middleware: when a tool call fails validation or execution, send the raw error message back to the model as the next tool result, cap retries per call, and log the rejected arguments.

### This month

- Install the BFCL runner (`pip install bfcl-eval`) and add `bfcl generate` and `bfcl evaluate` on a fixed category subset such as `simple_python`, `multiple`, `parallel` and `irrelevance` to your CI pipeline, so every model or prompt change gets a tool-call accuracy regression check ([Gorilla repository](https://github.com/ShishirPatil/gorilla)).
- Write 20 test cases in BFCL's format for your own tools, each with a list of acceptable values, and include unit-sensitive parameters like rates and percentages.
- Build an irrelevance filter layer: before the model sees the full tool list, route out questions no tool can answer, and track your false-positive call rate against BFCL's 240 V1 irrelevance cases as a baseline.

Run the CI check once on your current model and prompt before changing anything. That first score is the baseline every later change gets compared to.
