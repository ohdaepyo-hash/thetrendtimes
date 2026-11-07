# X thread for issue 004

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/swe-bench-verified-ai-coding-benchmarks/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

In the first SWE-bench paper, the best model fixed 1.96% of real GitHub issues.

Today the top SWE-bench Verified entry fixes 79.2%.

The jump didn't come from bigger models. It came from the scaffold around them. What the primary sources show:

### 2/7

SWE-bench (ICLR 2024) mined ~90,000 pull requests from 12 Python repos (django, sympy, scikit-learn) and kept 2,294 that resolved an issue, added tests, and installed.

Each task has a test that fails before the fix and passes after. Pass them all or it doesn't count.

### 3/7

Problem: many of those tests were unfair.

One scikit-learn task required raising a DeprecationWarning with an exact message agreed in PR comments. The agent only sees the issue text. OpenAI's annotators called it "nearly impossible."

### 4/7

So OpenAI and the SWE-bench authors had 93 Python developers screen 1,699 samples, 3 labels each.

38.3% flagged for vague issue text
61.1% flagged for tests that reject valid fixes
68.3% filtered out

What survived became SWE-bench Verified: 500 tasks (Aug 2024).

### 5/7

Scaffolding is the lever.

Paper setup: one shot, BM25 retrieval, no test run. 1.96%.
GPT-4o + Agentless loop: 16% on the original set, 33.2% on Verified.
mini-SWE-agent (just a bash shell + ReAct loop): 76.8%.

Same model under a richer agent: 79.2%. Loop first, model second.

### 6/7

The loop that scores well runs model-written code. Hence Docker.

SWE-bench moved to a fully containerized harness in June 2024 after annotators found env setup failing tests regardless of the patch. One container per task, thrown away after.

Copy that for production agents.

### 7/7

Full analysis with the source table, the cost-per-task column ($0.07 vs $0.75 for one point of resolve rate), and a this-week / this-month checklist for your own 50-task benchmark:
https://thetrendtimes.com/blog/swe-bench-verified-ai-coding-benchmarks/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
