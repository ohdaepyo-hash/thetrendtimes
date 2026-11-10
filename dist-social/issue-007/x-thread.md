# X thread for issue 007

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/osworld-benchmark-desktop-agent-evaluation/
- Length rule: every tweet stays under 280 characters. X counts any URL as 23 characters.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

People finished 72.36% of OSWorld's 369 real desktop tasks. In 2024 the best AI models finished 12% to 22%.

The plans were fine. The clicks missed.

What OSWorld's virtual machine tests show about computer use agents, and why the failure modes still matter in 2026:

### 2/7

OSWorld runs agents inside Ubuntu VMs, plus 43 Windows tasks.

LibreOffice Calc, Writer and Impress, Chrome, Thunderbird, VS Code, VLC, GIMP, terminal and file work, plus workflows across several apps.

A script checks the final file or app state for every task.

### 3/7

The top error: mouse click inaccuracies in more than 75% of 550 failed GPT-4V runs.

"Strong planning but weak execution." The code comments named the right steps; the coordinates missed.

Move or shrink the window first and success fell from 50.79% to 15.04%.

### 4/7

Clicking before the screen settles is the quieter failure.

OSWorld gives agents an explicit WAIT action, and the paper describes agents stuck in "a mismatch dilemma between the actions taken and the current state."

A fixed sleep(1) is the same bug on a slower VM.

### 5/7

Multi-app workflows are where it stacks up.

GPT-4V: 13.74% on single-app tasks, 6.57% on multi-app workflows. People: 73.27% on workflows.

In 2026 top agents pass 85% to 90% overall, and multi-app tasks are still among their weakest categories.

### 6/7

Harden your own desktop agent:

Diff screenshots or the accessibility tree before and after every click
Poll until the UI settles instead of sleeping
Reset each eval from a VM snapshot
Summarize old screenshots as text instead of resending them

### 7/7

Full analysis with the 2024 vs 2026 scores, the grounding and context experiments, primary sources and a this-week / this-month hardening checklist:
https://thetrendtimes.com/blog/osworld-benchmark-desktop-agent-evaluation/

One primary-sourced briefing a week: subscribe at thetrendtimes.com
