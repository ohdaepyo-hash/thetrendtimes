# Hacker News submission for issue 007

URL: https://thetrendtimes.com/blog/osworld-benchmark-desktop-agent-evaluation/

## Title candidates (HN limit: 80 characters)

1. `OSWorld: what 369 real desktop tasks show about why computer use agents fail`
2. `Strong planning, weak execution: where desktop AI agents miss their clicks`
3. `From 12% to 90% on OSWorld: the desktop agent failures that remain`

Pick 1 by default. Candidate 3 states the 2024-to-2026 change but leans on a leaderboard number; use it only if the first submission gets no traction.

## First comment by the submitter

> Primary sources, since the post is mostly a reading of them:
>
> - Paper: https://arxiv.org/abs/2404.07972. 369 Ubuntu tasks plus 43 Windows ones, execution-based checkers, people at 72.36%. The 12.24% "best model" figure is text-only GPT-4 on the accessibility tree; GPT-4V's best was 12.17%.
> - The error analysis is the useful part: mouse click inaccuracies in more than 75% of 550 failed GPT-4V runs, and moving or shrinking the window before a task cut a 50.79% subset to 36.5% and 15.04%.
> - Project site: https://os-world.github.io/. The OSWorld-Verified table now has entries at 90.19% and 85.96% (July and August 2026, 100 steps). Multi-app workflows and Chrome are the lowest categories left.
> - Repo: https://github.com/xlang-ai/OSWorld. VM snapshot revert per task across VMware, VirtualBox, Docker and AWS; the AWS path runs a full evaluation in under an hour.
> - Anthropic's Oct 2024 numbers for Claude 3.5 Sonnet: https://www.anthropic.com/news/3-5-models-and-computer-use (14.9% screenshot-only, 22.0% with more steps).
>
> One gap I couldn't source: the paper never measures how often agents act before the UI finishes rendering, though it ships an explicit WAIT action and describes agents stuck in a state mismatch. If you run desktop agents in production, do you see timing failures, and how do you detect them?
