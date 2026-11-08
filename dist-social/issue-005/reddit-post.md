# Reddit post for issue 005

Targets: r/LocalLLaMA, r/MachineLearning. Post the body as a text post, not a link post, and read each subreddit's self-promotion rule on the day you post. Hold this draft for seven days after publication (earliest 2026-11-16) and until the account has enough recent, non-promotional activity in the target subreddit.

## Title per subreddit

- r/LocalLLaMA: `Read the GAIA primary sources: agents went from 15% to 94%, and the gains came from validating tool calls and retrying, not just bigger models`
- r/MachineLearning: `[D] What GAIA measures: three levels, file-heavy questions, and why Level 2 collapsed for 2023 agents`

## Body

I read the four primary sources behind GAIA (the ICLR 2024 paper, the HF leaderboard, the dataset card, and the smolagents repo) to see what the scores actually say. Numbers below come only from those sources, except one calculation I flag as mine.

**How the benchmark is built.**

- [Paper](https://arxiv.org/abs/2311.12983): 466 questions with one short answer each, scored by quasi exact match. Levels 1 / 2 / 3 hold 146 / 245 / 75 questions. Level 1 is at most one tool and five steps, Level 2 roughly five to 10 steps with several tools, Level 3 is open-ended.
- 166 questions are a public dev set; 300 have private answers for the leaderboard. The [dataset](https://huggingface.co/datasets/gaia-benchmark/GAIA) is gated to keep it out of crawls.
- Attachments: xlsx is the most common (29), then png (18), pdf (15), txt (13), mp3 and jpg (7 each), plus a long tail.

**The 2023 results.**

- Humans 92% overall (94 / 92 / 87 by level).
- GPT-4 + plugins 30.3 / 9.7 / 0. The plugins were chosen by hand per question, so the paper calls it an oracle estimate.
- AutoGPT on GPT-4 picked its own tools and got 0.4% at Level 2, below GPT-4 with no tools (2.6%).
- Paper's own line: GPT-4 "cannot deal with files and multi-modality."

**Why Level 2 fell so hard (my arithmetic, not a GAIA number).**

- 90% per-step success over five steps is 59%, over seven is 47.8%, over 10 is 34.9%. No partial credit, so one bad step zeroes the answer.
- One retry per failed step turns a 90% step into roughly a 99% step, and 0.99^7 is 93%.

**What the frameworks do now ([smolagents](https://github.com/huggingface/smolagents)).**

- `validate_tool_arguments` checks each call against the tool schema before running it.
- Errors go back to the model with "Now let's retry: take care not to repeat previous errors!"
- `max_steps` defaults to 20; `final_answer_checks` can gate the final answer.
- Their open Deep Research example: 55% pass@1 on validation. For single-page PDFs and spreadsheets, they fed the model a PNG screenshot instead of the file.

**Leaderboard now ([HF space](https://huggingface.co/spaces/gaia-benchmark/leaderboard), accessed 2026-11-09).** Test leader at 94.35%, top 100 all above 91%, most of them multi-model "harness" systems. Level 3 is still the lowest column for the leader (89.8%).

For the local-model crowd: has anyone run smolagents with a local model on the validation split? I'm curious whether file ingestion or tool-argument errors dominate once the frontier models are out of the loop.

Full write-up: thetrendtimes.com
