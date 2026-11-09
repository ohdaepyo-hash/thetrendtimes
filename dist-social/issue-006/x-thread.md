# X thread for issue 006

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/function-calling-benchmarks-ast-evaluation/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

An agent asked for a $5000 investment at 5% interest. GPT-4 picked the right function and returned clean JSON.

It passed annual_interest_rate: 5. The function wanted 0.05.

Valid JSON, wrong answer. What Berkeley's 2,000-case function calling benchmark shows:

### 2/7

BFCL splits its 2,000 cases by call shape:

Simple: one function, one call
Multiple: pick one call from 2 to 4 functions
Parallel: same function, several calls
Parallel multiple: several functions, zero or more calls each

Plus 240 cases where no tool fits.

### 3/7

The AST checker parses each call and checks, in order:

function name
required parameters present
no parameters outside the schema
exact types ("true" is not a bool)
values against a list of accepted answers

One unmatched answer fails the whole case.

### 4/7

Execution checks ran the calls. Numbers within 20% for live data, matching JSON keys for REST.

Neither catches rate=5 vs 0.05. Only the answer list does.

And the executable categories were retired from the leaderboard in April 2025.

### 5/7

The failure patterns:

Hallucinated parameters the schema never defined
A string where the schema wants a number
Calls in the wrong order (V3 multi-turn tests this)
Calling a tool when none fits: 875 real-user irrelevance cases in V2 Live

### 6/7

In the 2023 Gorilla paper, GPT-4 invented TensorFlow Hub APIs 78.65% of the time zero-shot. A fine-tuned 7B model: 5.40%.

Fix the layer you own: strict schemas with additionalProperties false, and send the raw error back to the model instead of failing silently.

### 7/7

Full analysis with the AST rules, the hallucination table, primary sources and a this-week / this-month tool hardening checklist:
https://thetrendtimes.com/blog/function-calling-benchmarks-ast-evaluation/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
