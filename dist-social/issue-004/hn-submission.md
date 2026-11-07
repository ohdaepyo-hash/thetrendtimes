# Hacker News submission for issue 004

URL: https://thetrendtimes.com/blog/swe-bench-verified-ai-coding-benchmarks/

## Title candidates (HN limit: 80 characters)

1. `SWE-bench Verified: what 500 human-checked bug fixes prove about coding agents`
2. `From 1.96% to 79.2% on SWE-bench: the scaffold moved more than the model`
3. `How 2,294 GitHub issues became SWE-bench Verified's 500, and what that changed`

Pick 1 by default. Candidate 2 is the strongest hook but invites "benchmark contamination" replies before anyone reads the caveat section; use it only if the first submission gets no traction.

## First comment by the submitter

> Primary sources, since the post is mostly a reading of them:
>
> - The ICLR 2024 paper: https://arxiv.org/abs/2310.06770. About 90,000 PRs from 12 Python repos filtered to 2,294 tasks, each with at least one fail-to-pass test. Best model in the paper, Claude 2, resolved 1.96% in a single-shot BM25 retrieval setup.
> - OpenAI's Verified announcement (2024-08-13): https://openai.com/index/introducing-swe-bench-verified/. 93 developers annotated 1,699 samples, three labels each. 38.3% flagged for underspecified issues, 61.1% for tests that could reject valid fixes, 68.3% filtered out. GPT-4o with Agentless went from 16% to 33.2%.
> - The leaderboard: https://www.swebench.com/. Full Verified top entry 79.2%. Bash Only board (every model through mini-SWE-agent, a plain ReAct loop over a shell) tops out at 76.8%, with a $0.07-per-task entry at 75.8%.
> - The repo: https://github.com/SWE-bench/SWE-bench. Docker-based harness since June 2024, after OpenAI found environment setup failing tests regardless of the patch.
>
> Two things I'd flag before the usual objections arrive. First, the Verified cut does skew easier (fewer than 10% of tasks estimated over an hour), but OpenAI's stratified plot shows resolve rates rising within each difficulty bucket, which is the signature of removing broken tasks rather than hard ones. Second, it's all Python from public repos that predate 2024, so treat the number as an upper bound on familiar code.
>
> Question for people running coding agents internally: has anyone built a private fail-to-pass benchmark from their own closed issues, and did the leaderboard ranking of models hold up on it?
