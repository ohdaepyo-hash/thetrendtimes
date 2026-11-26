# Reddit post for issue 022

Target: r/mcp (r/AI_Agents as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`MCP at two: I traced one agent request through the 2026 stack. Notes from 6 primary sources`

## Body

MCP turned two this week. Instead of the growth numbers, I tried to map what a single request crosses now that servers are stateless. Each number stays with its source.

**Scale** ([MCP Blog](https://blog.modelcontextprotocol.io/posts/mcp-turns-two/), [Anthropic](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)).

- 5 billion total SDK downloads, more than 4.5 billion in the past year, 2,500+ contributors.
- Anthropic: 700 million+ monthly SDK downloads and 10,000+ MCP connectors for Claude.

**The layers a request crosses.**

- Stateless servers since the 2026-07-28 spec: any request can land on any instance, so state moves into tool arguments, task handles and external stores.
- Tool search loads only the definitions a task needs (Anthropic: "can" cut that context by over 85% in multi-server setups).
- Skills load by progressive disclosure: name and description at startup, the full `SKILL.md` only when needed ([Kurtis Van Gent interview](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)).
- Tasks and Elicitation are GA in Claude; File Uploads is rolling out, and the protocol draft is not yet beta.
- Google Workspace: from 2027-02-01, AI agents must use the Workspace MCP server or CLI instead of REST APIs. 99%+ of active developers sit in the free Standard tier ([Google Workspace Updates](https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html?hl=en_EN)).

**Where it fails** ([MCPHallu, arXiv](https://arxiv.org/abs/2611.07689v1)).

- 358 tasks on 36 production MCP servers, 14 agents from eight vendors, 5,012 trajectories. Average 0.642, best 0.728.
- Unreachable Goal: average 0.458, only 23.2% of runs pass. Agents keep calling tools or claim success.
- A model's rank moves 6.9 of 13 places across failure types, so one leaderboard number hides a lot.

**Pinning.** Next spec version is 2027-03-30; soft freeze lands 2.5 months before and Tier 1 SDK betas 1.5 months before ([release cycle](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/)).

What none of these measure: production server counts or how often real agents report false success. If you run MCP agents in production, how do you detect a run that says "done" when nothing changed?

Full write-up with the step-by-step request flow and a trade-off list: https://thetrendtimes.com/blog/mcp-at-two-2026-stateless-skills-workspace/
