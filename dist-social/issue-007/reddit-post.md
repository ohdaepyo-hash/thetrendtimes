# Reddit post for issue 007

Target: r/LocalLLaMA. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post. Hold this draft for seven days after publication (earliest 2026-11-18) and until the account has enough recent, non-promotional activity in the subreddit.

## Title

`I read the OSWorld paper and the 2026 verified results: why desktop agents miss clicks, and what still fails at 85%+`

## Body

I went through the OSWorld paper, the project site's verified results table, the GitHub repo and Anthropic's computer use announcement to see what an OSWorld score means. Every number below comes from those sources.

**What the benchmark is.**

- [OSWorld paper](https://arxiv.org/abs/2404.07972): 369 tasks on Ubuntu VMs, plus 43 adapted for Windows (used for cross-OS analysis, not the main score). LibreOffice Calc/Writer/Impress, Chrome, Thunderbird, VLC, VS Code, GIMP, terminal and file I/O, and multi-app workflows (27.37% of tasks).
- Actions are `pyautogui` code at pixel coordinates, plus `WAIT`, `FAIL` and `DONE`. Each task has its own setup config and an execution-based checker script.
- 8.13% of tasks are infeasible on purpose; the right answer is `FAIL`.

**The 2024 numbers (Table 5).**

- People: 72.36%. Best model: 12.24%, and that was text-only GPT-4 on the accessibility tree, not GPT-4V. GPT-4V peaked at 12.17% (screenshot + tree). GPT-4o: 11.36% best.
- Screenshot-only topped out at 5.80% across all models.
- [Anthropic, Oct 2024](https://www.anthropic.com/news/3-5-models-and-computer-use): Claude 3.5 Sonnet 14.9% screenshot-only, 22.0% with more steps.

**Why they failed (the useful part).**

- Mouse click inaccuracies in >75% of 550 failed GPT-4V runs. Plans in the code comments were right; coordinates were wrong.
- On a 28-task subset at 50.79%, moving the window dropped it to 36.5%, shrinking it to 15.04%, cluttering the screen to 25.39%.
- Set-of-Mark boxes hurt on full OS screens (spreadsheets have too many elements to box).
- A single filtered a11y-tree observation needs ~6,000 tokens to cover ~90% of cases. Past screenshots in context didn't help at all; text history did.
- Single-app 13.74% vs multi-app 6.57% (GPT-4V SoM).

**Where it is now.** The [project site](https://os-world.github.io/) verified table has entries from late July / early August 2026 at 90.19% (an agent framework) and 85.96% (claude-fable-5), both at 100 steps vs the paper's 15. Calc went from often-zero to 95%+. Multi-app (~79-85%) and Chrome (~78%) are the weakest categories left for those entries. OSWorld-Verified (2025-07-28) fixed task errors, so compare against that version, and OSWorld 2.0 was announced 2026-06-26.

For people running local VLMs as computer use agents: how do you check that a click actually did something? I'm doing before/after screenshot diffs plus an a11y-tree check around the target, and polling for the UI to settle instead of fixed sleeps. Curious whether anyone gets reliable grounding from a small local model without the tree.

Full write-up: thetrendtimes.com
