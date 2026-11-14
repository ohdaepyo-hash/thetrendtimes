# Reddit post for issue 009

Target: r/LocalLLaMA. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`I reread the SWE-agent paper: the custom agent interface took GPT-4 Turbo from 11% to 18% on SWE-bench Lite, and the same team now ships a bash-only agent`

## Body

I went through the SWE-agent paper, its README and docs site, the SWE-bench paper and the swebench.com leaderboard to pin down how much a purpose-built tool interface helps a coding agent. Every number below comes from those sources. The paper's models are GPT-4 Turbo and Claude 3 Opus, so read it for the method.

**What the paper claims.**

- [SWE-agent paper](https://arxiv.org/abs/2405.15793): an Agent-Computer Interface (ACI) is the set of commands and feedback formats an agent uses, designed for a language model the way an IDE is designed for a person.
- Raw shell problems it lists: no simple way to edit part of a file, no feedback on an invalid edit, `grep`/`cat` output the model can't skim past.
- The ACI: `find_file` / `search_file` / `search_dir` (max 50 results, otherwise "be more specific"), a file viewer with line numbers and a 100-line window, and `edit start:end` with a linter that discards edits that introduce errors.

**What it measured (GPT-4 Turbo).**

- Full SWE-bench: 12.47% (286 of 2,294). Earlier RAG baselines: 3.79% with Claude 3 Opus, 1.31% with GPT-4 Turbo.
- SWE-bench Lite: 18.00% with the ACI, 11.00% for a Shell-only agent with the same model (7.33% without a demonstration). That is a 64% relative gain, not a multiple.
- The 1.96% figure people quote next to 12.47% is from the [SWE-bench paper](https://arxiv.org/abs/2310.06770): Claude 2 with BM25 retrieval, the best model at release. It is not a bash baseline.

**Ablations on Lite (18.0% is the full interface).**

- `edit` without linting: 15.0%. No `edit` command: 10.3%.
- Viewer window of 30 lines: 14.3%. Whole file: 12.7%.
- Full history instead of the last five observations: 15.0%.
- A Vim-style next/prev search: 12.0%, worse than no search tools at all (15.7%).

**What the guardrail didn't fix.**

- 51.7% of runs had at least one failed edit. An edit eventually succeeded 90.5% of the time, 57.2% after one failure.
- About half of unresolved tasks were wrong or overly specific fixes, which a linter can't see.

**Where it stands now.**

- The [SWE-agent README](https://github.com/SWE-agent/SWE-agent) says mini-SWE-agent has superseded it and reports 65% on SWE-bench Verified "in 100 lines of python". The docs site calls SWE-agent maintenance-only.
- [swebench.com](https://www.swebench.com/) now has a Bash Only view: 500 instances, every model in the same mini-SWE-agent environment.
- None of these sources rerun Shell-only against the ACI with a current model.

For people running local models in agent loops: do smaller models still need the viewer, range editor and lint-on-edit wrappers, or does plain bash work for you? I'd like to hear from anyone who has run the same tasks both ways.

Full write-up: thetrendtimes.com
