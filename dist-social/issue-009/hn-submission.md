# Hacker News submission for issue 009

URL: https://thetrendtimes.com/blog/swe-agent-agent-computer-interfaces-ai-coding/

## Title candidates (HN limit: 80 characters)

1. `SWE-agent's agent-computer interface: what the 2024 ablations measured`
2. `SWE-agent: 11% with a raw shell, 18% with a custom interface on SWE-bench Lite`
3. `The SWE-agent team built an agent interface, then moved to a bash-only agent`

Pick 1 by default. Candidate 3 is the more current angle; use it if the first submission gets no traction.

## First comment by the submitter

> Primary sources, since the post is mostly a reading of them:
>
> - Paper: https://arxiv.org/abs/2405.15793. The agent-computer interface is three small tools on top of the shell: search capped at 50 results, a file viewer with line numbers and a 100-line window, and a range edit command with a linter that discards edits that introduce errors.
> - Same model (GPT-4 Turbo) on SWE-bench Lite: 11.00% Shell-only, 18.00% with the interface. Full SWE-bench: 12.47% (286 of 2,294).
> - The 1.96% often quoted next to that is from the SWE-bench paper, https://arxiv.org/abs/2310.06770: Claude 2 with BM25 retrieval, the best model at release. It is not a shell baseline.
> - Ablations on Lite: 15.0% without linting, 10.3% without the edit command, 14.3% with a 30-line viewer, 12.7% when the viewer shows the full file.
> - The guardrail has limits: 51.7% of runs had at least one failed edit, and about half of unresolved tasks were incorrect fixes a linter can't flag.
> - Current state: the README at https://github.com/SWE-agent/SWE-agent says mini-SWE-agent has superseded SWE-agent, and https://www.swebench.com/ has a Bash Only view that runs every model in the same mini-SWE-agent environment.
>
> Caveat: the paper's models are from 2024, and none of these sources rerun the Shell-only comparison with a current model. If you have run the same tasks with and without editor and viewer wrappers on a recent model, what did you see?
