# X thread for issue 009

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/swe-agent-agent-computer-interfaces-ai-coding/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

Give an AI coder a raw bash terminal and watch: it runs cat, 1,079 lines land in its context, a sed edit prints nothing back, and it starts over.

Princeton's SWE-agent paper measured what a purpose-built Agent-Computer Interface (ACI) fixes, and what it doesn't:

### 2/7

The terminal trap, per the paper:

No simple command to edit part of a file
No feedback when an edit is invalid
grep and cat fill the context with lines the model can't skip
A syntax error from one edit leads to the same snippet being edited again and again

### 3/7

The ACI swaps that for three small tools:

Search: find_file, search_file, search_dir, capped at 50 results
View: open shows 100 lines at a time with line numbers
Edit: edit start:end replaces a range, shows the result, and a linter discards broken edits

### 4/7

The numbers, same model (GPT-4 Turbo) on SWE-bench Lite:

Shell-only agent: 11.00%
SWE-agent with the ACI: 18.00%

A 64% relative gain. On full SWE-bench it resolved 12.47%. The best model at the benchmark's release, Claude 2, had resolved 1.96%.

### 5/7

The linter guardrail alone: 15.0% without it, 18.0% with it.

It doesn't end failed edits. 51.7% of runs still had at least one, and the odds of recovering fell from 90.5% to 57.2% after a single failure.

It stops a broken file from being written.

### 6/7

Where it stands now: the SWE-agent README says mini-SWE-agent has superseded it, with 65% on SWE-bench Verified in 100 lines of Python. The leaderboard has a Bash Only view.

For your own agent: add a line-numbered viewer, a range editor and a syntax check after each edit.

### 7/7

Full analysis with the ablation table, the primary sources and a this-week / this-month checklist:
https://thetrendtimes.com/blog/swe-agent-agent-computer-interfaces-ai-coding/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
