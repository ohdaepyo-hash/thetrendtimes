# Reddit post for issue 004

Targets: r/LocalLLaMA, r/MachineLearning. Post the body as a text post, not a link post, and read each subreddit's self-promotion rule on the day you post. Hold this draft for seven days after publication (earliest 2026-11-15) and until the account has enough recent, non-promotional activity in the target subreddit.

## Title per subreddit

- r/LocalLLaMA: `Went through the SWE-bench primary sources: 1.96% to 79.2% is mostly a scaffolding story, and the cheap models are close on the bash-only board`
- r/MachineLearning: `[D] What SWE-bench Verified actually measures: how 2,294 tasks became 500, and why the same model scores differently per scaffold`

## Body

I read the four primary sources behind SWE-bench (the ICLR 2024 paper, OpenAI's Verified announcement, the leaderboard, and the GitHub repo) to figure out what the resolve rates actually prove. Notes below, numbers only from those sources.

**How the dataset was built.**

- [Paper](https://arxiv.org/abs/2310.06770): about 90,000 PRs from 12 Python repos, filtered to 2,294 that resolve a linked issue, touch test files, and install. Every task has at least one fail-to-pass test, 40% have two or more, and a median of 51 regression tests run on top.
- Best result in the paper: Claude 2 at 1.96%. That setup was one shot with BM25 retrieval, no test execution.

**Why Verified exists.**

- [OpenAI, Aug 2024](https://openai.com/index/introducing-swe-bench-verified/): 93 Python developers screened 1,699 random samples, 3 annotators each, most severe label wins.
- 38.3% flagged for underspecified issues, 61.1% for tests that could reject valid fixes, 68.3% removed overall. The 500 that survived are SWE-bench Verified.
- GPT-4o with Agentless: 16% on original SWE-bench, 33.2% on Verified. The gain shows up within difficulty buckets too, so it isn't only "they removed the hard ones."

**What the leaderboard says now ([swebench.com](https://www.swebench.com/), accessed 2026-11-08).**

- Full Verified board top: 79.2% (Claude 4.5 Opus, Sonar Foundation Agent).
- Bash Only board (every model through mini-SWE-agent, "just a simple ReAct agent loop"): Claude 4.5 Opus high 76.8% at $0.75/task avg, MiniMax M2.5 high 75.8% at $0.07/task, GPT 5.2 high 72.8% at $0.47.
- Same Claude 4.5 Opus: 79.2% with the richer scaffold vs 76.8% bash-only. So the fancy scaffold is worth roughly 2 to 3 points. The loop itself (run code, read traceback, edit again) is worth the other 70.

**The Docker part.**

- OpenAI's third finding was environment setup breaking tests regardless of the patch. The [repo](https://github.com/SWE-bench/SWE-bench) moved to a fully containerized harness in June 2024. Recommended box: 120GB free disk, 16GB RAM, 8 cores.

Caveat I'd stress: all of this is Python in 12 public repos that predate 2024. It says little about your private codebase. The post ends with a plan for building a 50-task internal set with fail-to-pass tests.

For the local-model crowd: the $0.07-per-task entry at 75.8% is the number I keep coming back to. Has anyone here run mini-SWE-agent against a local model on a Verified subset? Curious how far the gap is once the scaffold is held constant.

Full write-up: thetrendtimes.com
