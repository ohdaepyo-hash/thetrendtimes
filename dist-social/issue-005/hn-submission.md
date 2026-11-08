# Hacker News submission for issue 005

URL: https://thetrendtimes.com/blog/gaia-benchmark-multimodal-ai-agent-evaluation/

## Title candidates (HN limit: 80 characters)

1. `GAIA benchmark: why files and multi-step tool chains broke early AI agents`
2. `From 15% to 94% on GAIA: what changed in AI assistant agents`
3. `What 466 GAIA questions show about compounding tool-call errors in agents`

Pick 1 by default. Candidate 2 is the stronger hook but invites "the benchmark is contaminated" replies before anyone reaches the gated-dataset paragraph; use it only if the first submission gets no traction.

## First comment by the submitter

> Primary sources, since the post is mostly a reading of them:
>
> - The ICLR 2024 paper: https://arxiv.org/abs/2311.12983. 466 questions, Levels 1 to 3 hold 146, 245 and 75. Humans 92%, GPT-4 with plugins 15% (30.3% / 9.7% / 0% by level). The plugins were picked by hand per question, so the authors call that score an oracle. AutoGPT, which picked its own tools, got 0.4% at Level 2.
> - The leaderboard: https://huggingface.co/spaces/gaia-benchmark/leaderboard. Test-set leader is 94.35% (submitted 2026-11-03), and every entry in the top 100 is above 91%. The validation board is closed as "no longer informative."
> - The dataset: https://huggingface.co/datasets/gaia-benchmark/GAIA. Gated, 166-question public dev set, 300 test questions with private answers.
> - smolagents: https://github.com/huggingface/smolagents. Schema validation of tool arguments before execution, and the error text fed back with a retry instruction. Their open Deep Research example reports 55% pass@1 on validation and converts single-page PDFs and spreadsheets to PNG screenshots before the model reads them.
>
> The post includes a small compounding calculation (90% per step over seven steps is 47.8%). That's my arithmetic, not a GAIA measurement; it's there to explain why Level 2 fell so much harder than Level 1.
>
> Question for people running assistants on internal documents: do your failures cluster at file ingestion or at the tool call after it?
