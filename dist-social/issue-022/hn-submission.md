# Hacker News submission for issue 022

Draft only; not submitted.

URL: https://thetrendtimes.com/blog/mcp-at-two-2026-stateless-skills-workspace/

## Title candidates (HN limit: 80 characters)

1. `MCP at two: the path one agent request takes through the 2026 stack`
2. `On unreachable-goal tasks, 23.2% of MCP agent runs pass (MCPHallu)`
3. `MCP is stateless now: where skills, tasks and gateways moved the state`

Pick 1 by default. Candidate 2 is the benchmark angle; use it if an MCP or agent reliability thread is already on the front page.

## First comment by the submitter

> MCP turned two this week, so I tried to draw the 2026 stack as one request passing through named components rather than as a growth chart. Sources:
>
> - MCP Blog, two-year post (https://blog.modelcontextprotocol.io/posts/mcp-turns-two/): 5 billion total SDK downloads, more than 4.5 billion in the past year, 2,500+ contributors. The 2026-07-28 release made servers stateless.
> - Anthropic (https://claude.com/resources/articles/skills-over-mcp-tasks-and-more): Skills over MCP in public beta, Tasks and Elicitation GA, File Uploads rolling out. Tool search "can" cut tool-definition context by over 85% in multi-server setups.
> - Google Workspace Updates (https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html?hl=en_EN): from 2027-02-01, AI agents must reach Workspace data through the MCP server or CLI instead of REST.
> - Google Open Source interview with Kurtis Van Gent (https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html): progressive disclosure and why the transport went stateless.
> - MCP release cycle (https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/): releases on the last Tuesday of March and September, next one 2027-03-30.
> - MCPHallu (https://arxiv.org/abs/2611.07689v1): 358 tasks on 36 production MCP servers, 14 agents, average 0.642. Unreachable Goal averages 0.458 with a 23.2% pass rate.
>
> Caveats: downloads are not deployments, the 85% figure is a vendor claim, and MCPHallu is a benchmark with its own server mix, not production telemetry. If you run agents against MCP servers, how do you catch false completion?
