# X thread for issue 005

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/gaia-benchmark-multimodal-ai-agent-evaluation/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

GAIA asked AI assistants 466 questions a person can answer in 6 to 17 minutes.

Humans: 92%.
GPT-4 with hand-picked plugins: 15%. At the hardest level, 0%.

The gap wasn't knowledge. It was files and tool chains. What the primary sources show:

### 2/7

Three levels, set by how much work a human needed:

Level 1: up to one tool, at most 5 steps (146 questions)
Level 2: roughly 5 to 10 steps, several tools (245)
Level 3: arbitrarily long action sequences (75)

One short answer each, exact match, no partial credit.

### 3/7

Many questions ship with a file. Most common: xlsx (29), then png, pdf, txt, mp3.

The paper is blunt: GPT-4 "cannot deal with files and multi-modality." Without a file tool it answers from memory. With one, the raw file floods the context.

### 4/7

Compounding errors are the quiet killer.

If each tool call succeeds 90% of the time:
5 steps: 59%
7 steps: 47.8%
10 steps: 34.9%

In 2023 the best system fell from 30.3% at Level 1 to 9.7% at Level 2. One bad step zeroes the answer.

### 5/7

Bad tool arguments fail silently. A wrong page range or column name returns a plausible wrong result.

smolagents now checks every call against the tool's schema before it runs (validate_tool_arguments) and raises a catchable error instead of crashing.

### 6/7

Then it feeds the error back: "Now let's retry: take care not to repeat previous errors!"

A 90% step with one retry behaves like a 99% step. 0.99^7 = 93%.

Today's GAIA test leader scores 94.35%. Level 3 is still its lowest column.

### 7/7

Full analysis with the 2023 score table, the source table, and a this-week / this-month checklist for testing your own agent on real files:
https://thetrendtimes.com/blog/gaia-benchmark-multimodal-ai-agent-evaluation/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
