---
title: "OSWorld Benchmark: Why Desktop Tasks Break AI Agents"
description: "OSWorld tests multimodal AI agents on 369 real desktop tasks in Ubuntu plus 43 on Windows. How visual grounding errors and state drift break computer use."
pubDate: 2026-11-11
category: agents
sources:
  - label: "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments (arXiv 2404.07972)"
    url: "https://arxiv.org/abs/2404.07972"
  - label: "OSWorld Project Site and OSWorld-Verified Results"
    url: "https://os-world.github.io/"
  - label: "OSWorld Repository on GitHub (xlang-ai)"
    url: "https://github.com/xlang-ai/OSWorld"
  - label: "Anthropic: Introducing Computer Use, Claude 3.5 Sonnet and Claude 3.5 Haiku (2024-10-22)"
    url: "https://www.anthropic.com/news/3-5-models-and-computer-use"
---

An agent opens a LibreOffice Writer document and is asked to center the title. Its plan is fine. Then it selects the wrong words, opens menus that have nothing to do with alignment and runs out of steps. The OSWorld authors use this task as one of their failure examples, and it sums up the benchmark's first result: in April 2024, the best model finished 12.24% of the tasks, while people finished 72.36% ([Xie et al.](https://arxiv.org/abs/2404.07972), arXiv 2404.07972, 2024).

If you build agents that drive a real screen, you've seen this pattern. The plan reads well in the logs and the clicks land in the wrong place. OSWorld is the most detailed public record of why. It runs agents inside full virtual machines, checks the final state of files and apps with a script per task, and publishes the failures along with the scores.

Below: how the 369 tasks are built, what the 2024 gap between people and models looked like, where it has moved since, and the four failure modes that still matter in 2026: click coordinates that miss, actions taken against a screen that hasn't settled, context that fills up with screenshots, and goals that get lost between windows. The piece ends with a this-week and this-month checklist for hardening your own desktop agent.

## Beyond Browsers: Why Operating Systems Present the Hardest Agent Frontier

Web benchmarks give an agent one application with a document object model it can read. A desktop gives it a file system, a window manager, pop-ups from other programs and apps that expose very little structure. The OSWorld paper measured what that costs people, not just models. Human testers needed a median of 111.94 seconds per task, against 35.38 seconds on the web-only WebArena benchmark, and their accuracy fell from 88% on WebArena to about 72.36% on OSWorld ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024).

The action space is the other difference. An OSWorld agent doesn't call a "click this button" API. It writes `pyautogui` code: `click(x, y)` at pixel coordinates, typing, hotkeys, drags, plus three special actions named `WAIT`, `FAIL` and `DONE`. The observation is a full desktop screenshot at 1920 × 1080, an accessibility tree (the structured list of on-screen elements that screen readers use), or both. Every mistake in reading the screen turns into a mistake in coordinates.

Anthropic said the same when it launched computer use for Claude 3.5 Sonnet: actions people do without thinking, "scrolling, dragging, zooming," were still hard for the model, and it told developers to start with low-risk tasks ([Anthropic](https://www.anthropic.com/news/3-5-models-and-computer-use), 2024).

## Inside OSWorld: 369 Real Computer Tasks Across Ubuntu and Desktop Apps

The benchmark has 369 tasks that run on Ubuntu, plus 43 tasks adapted for Windows that the authors use for cross-OS analysis. The environment itself can host Ubuntu, Windows and macOS virtual machines, but the scored set is the Ubuntu one ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024). Nine computer science students spent more than three months writing the tasks, and each one comes with an initial-state setup and its own evaluation script.

The paper groups the tasks by the software involved:

- **OS**: terminal work, file I/O and system settings.
- **Office**: LibreOffice Calc, Writer and Impress.
- **Daily**: Chrome, VLC media player and Thunderbird.
- **Professional**: VS Code and GIMP.
- **Workflow**: tasks that span several apps and have to carry data or state from one to the next.

Workflow tasks make up 27.37% of the total, and 8.13% of tasks are deliberately infeasible, built around deprecated or made-up features, so the right answer is `FAIL` ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024). Scoring is execution-based: a script reads the resulting file, app config or accessibility tree and returns 1, 0 or a partial score.

Two updates matter if you run it today. On 2025-07-28 the maintainers released OSWorld-Verified, which fixed community-reported task errors and added AWS support that brings a full evaluation run under one hour through parallel virtual machines ([OSWorld repository](https://github.com/xlang-ai/OSWorld)). The project site also notes that eight Google Drive tasks need manual setup and may be dropped, which is why many verified results are reported out of 361 tasks, and it announced OSWorld 2.0 on 2026-06-26 ([OSWorld project site](https://os-world.github.io/)).

## The Human Gap: 72.36% Baseline vs 12% to 22% for Leading Multimodal Models

The original paper tested each model under four input settings. Table 5 has the overall success rates ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024):

| Model ([Table 5](https://arxiv.org/abs/2404.07972)) | Accessibility tree | Screenshot | Screenshot + tree | Set-of-Mark |
|---|---|---|---|---|
| GPT-4 (text only) | 12.24% | n/a | n/a | n/a |
| GPT-4V | n/a | 5.26% | 12.17% | 11.77% |
| GPT-4o | 11.36% | 5.03% | 11.21% | 4.59% |
| Claude 3 Opus | n/a | 2.42% | 4.41% | 6.72% |
| Human | | | | 72.36% overall |

The 12.24% headline belongs to text-only GPT-4 reading the accessibility tree, not to a vision model. GPT-4V's best setting was 12.17%, and no GPT-4o setting passed 11.36%. Screenshot-only input, the setting closest to how a person sees the screen, topped out at 5.80% for any model ([Xie et al.](https://arxiv.org/abs/2404.07972), Table 5). The people scored 75.00% on OS tasks and 73.27% on workflows, a spread of under 5 points across categories. The models swung by more than 20 points.

Six months later, Anthropic reported that Claude 3.5 Sonnet scored 14.9% in the screenshot-only category, against 7.8% for the next-best system, and 22.0% when given more steps ([Anthropic](https://www.anthropic.com/news/3-5-models-and-computer-use), 2024). That's where the 12% to 22% range comes from, and in late 2024 it left a gap of 50 points or more to the human baseline.

The gap has since closed on this benchmark. In the OSWorld-Verified results on the project site, entries dated 2026-07-25 and 2026-08-01 report 90.19% for the Intelligence-Indeed Agent framework and 85.96% for claude-fable-5, both at a 100-step limit ([OSWorld project site](https://os-world.github.io/)). The same table shows the step budget matters: OpenAI's computer-use-preview went from 26% at 15 steps to 31.3% at 50. The human number is still 72.36% from 2024, so a score above it doesn't mean an agent beats a person on any given task. It means the 2024 failure modes are now the tail, and the tail is where production agents fail.

## Visual Grounding vs API State: Why Screen Coordinates Drift Under Load

Visual grounding is the step where a model maps "the Save button" to the pixel it has to click. The OSWorld authors checked 550 failed GPT-4V runs and found mouse click inaccuracies in more than 75% of them, the most common error. They describe the pattern as "strong planning but weak execution": the code comments name the right steps and the coordinates miss ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024).

A miss rarely stays one miss. The paper traces two follow-on errors to it. Repetitive clicks burn steps as the agent misclicks, adjusts and misses again. Environmental noise follows when a wrong click opens a pop-up or an unrelated app, and the agent, now facing a screen it didn't expect, can't find its way back.

Resolution plays into it. With screenshot-only input, success rose steadily with resolution, which the authors link to the mismatch between the image the model sees and the 1080p coordinates it must output. Set-of-Mark prompting, which draws numbered boxes over detected elements, behaved differently: downsampling to 768 × 432 helped, and on full OS screens it scored below the plain screenshot-plus-tree setting for GPT-4V, 11.77% against 12.17% ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024). A spreadsheet has thousands of cells, and boxing each one adds noise instead of anchors.

Layout changes hurt even more. On a 28-task subset where GPT-4V scored 50.79%, the authors moved the window, shrank it to minimum size or opened unrelated maximized apps before the agent started. Success fell to 36.5%, 15.04% and 25.39% ([Xie et al.](https://arxiv.org/abs/2404.07972), Figure 8, 2024). The task was the same each time. Only the pixels moved.

The accessibility tree is the structured alternative, and it's why text-only GPT-4 led the 2024 table. It has limits too. Some apps expose little through it, and it isn't available when an agent only sees a remote screen. If your agent can read element state from the tree or an app API, use that to confirm what a click did, and keep coordinates for the cases where nothing else exists.

## Multi-App Execution Failure: Context Degradation and Latency Cascades

### Acting before the screen settles

OSWorld doesn't measure rendering delay directly, so treat this part as our reading of the paper's evidence. The action space includes an explicit `WAIT` action, and the paper describes agents falling into "a mismatch dilemma between the actions taken and the current state" ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024). An agent that clicks while a dialog is still opening acts on a screenshot of a screen that no longer exists. In production, that's the same failure as a fixed `sleep(1)` that was long enough on your laptop and too short on a loaded virtual machine.

### Context that fills with screenshots

Every step adds an observation. The raw accessibility tree XML runs to millions of tokens, so the authors filter it to a compact table. Even filtered, a single observation needed about 6,000 tokens to cover roughly 90% of cases, with the 90th percentile at 6,343.60 tokens ([Xie et al.](https://arxiv.org/abs/2404.07972), Figure 6, 2024). The baselines kept only the last three observations and actions in context, and an earlier few-shot setup without that history scored 2.79% on pure screenshots.

More history didn't help in every form. Adding text trajectory history raised Set-of-Mark performance, but adding past screenshots did nothing in the screenshot-only setting. The authors conclude that the vision models of the time could not pull useful context out of earlier images ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024). Screenshots cost the most tokens and, as history, gave the least back.

### Goals lost between windows

Multi-app workflows are where the failures stack. GPT-4V with Set-of-Mark succeeded on 13.74% of single-app tasks and 6.57% of multi-app workflows, and across Table 5 most workflow scores sat below 5%, while people scored 73.27% on the same workflows ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024). Hard tasks, the ones taking a person more than 180 seconds, dropped to 4.59% for the model against 49.57% for people. The window experiments show one mechanism: agents could switch to the right window but didn't maximize it as an intermediate step, and got stuck on something else.

The 2026 numbers keep the same ordering. In the OSWorld-Verified results, claude-fable-5 scores 85.96% overall but 72.92 of 92 on multi-app tasks, about 79%, and the 90.19% Intelligence-Indeed entry scores 78.81 of 93, about 85% ([OSWorld project site](https://os-world.github.io/)). LibreOffice Calc, often a zero in 2024, now sits above 95% for both. Workflows and Chrome are the weakest categories left for the top entries.

## Primary Sources Behind This OSWorld Analysis

Every number above comes from one of these four sources.

| Source | Publisher and date | What we used it for |
|---|---|---|
| [OSWorld paper](https://arxiv.org/abs/2404.07972) | Xie et al. (University of Hong Kong, Salesforce Research, Carnegie Mellon University, University of Waterloo), arXiv, April 2024 | Task design, human baseline, Table 5 success rates, error analysis, resolution, history and window-perturbation experiments |
| [OSWorld project site](https://os-world.github.io/) | OSWorld team (xlang-ai) | OSWorld-Verified results table (2026 entries, per-app scores, step limits), 361-task note, OSWorld 2.0 announcement |
| [OSWorld repository](https://github.com/xlang-ai/OSWorld) | xlang-ai, GitHub | OSWorld-Verified release (2025-07-28), VMware, VirtualBox, Docker and AWS providers, parallel evaluation |
| [Anthropic computer use announcement](https://www.anthropic.com/news/3-5-models-and-computer-use) | Anthropic, 2024-10-22 | Claude 3.5 Sonnet OSWorld scores (14.9% screenshot-only, 22.0% with more steps), stated limits on scrolling, dragging and zooming |

A note on the numbers. The 12.24% figure is often credited to GPT-4V; Table 5 gives it to text-only GPT-4 with accessibility tree input. The 2026 scores come from the verified results file on the project site, not from a paper, and they use 100 steps where the 2024 baselines used 15.

## Practical Desktop Agent and Computer Use Hardening Checklist

OSWorld's error analysis gives the order: confirm every click did something, wait for the screen instead of a timer, then fix how you test and how much context you carry.

### This week

- Add a click verification layer to your desktop agent's action executor: take a screenshot before and after each `click(x, y)`, diff the two images or compare the accessibility tree around the target, and retry or re-plan when nothing changed. Mouse click inaccuracies showed up in more than 75% of the failed runs the OSWorld authors checked ([Xie et al.](https://arxiv.org/abs/2404.07972), 2024).
- Replace fixed `sleep()` calls with settle polling: after each action, poll the accessibility tree or a cheap screenshot hash every 100 to 200 ms until two reads match or a timeout hits, then take the observation the model will see.

### This month

- Build an isolated evaluation sandbox on virtual machine snapshots: restore a clean snapshot before every task, as OSWorld's providers do for VMware, VirtualBox, Docker and AWS, and run your own 20 to 50 task suite in parallel on every model or prompt change ([OSWorld repository](https://github.com/xlang-ai/OSWorld)).
- Add a screenshot compression and state summary step to multi-step workflows: keep the latest screenshot at full resolution, replace older ones with a short text summary of the app, window and file state, and track tokens per step against the roughly 6,000-token single-observation figure from the paper.
- Score multi-app tasks separately in that suite, so a gain on single-app tasks can't hide a drop on the workflows where agents fail most.

Start with the click verification layer and log how often a click changes nothing. That rate is the baseline for everything else on this list.
