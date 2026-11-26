# X thread for issue 022

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/mcp-at-two-2026-stateless-skills-workspace/
- Length rule: every tweet stays under 280 characters, 230 to 265 preferred. X counts any URL as 23 characters. No em dashes.
- Tweet 7 carries only the thetrendtimes.com link, so X attaches the article card and no other domain.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

MCP turns two this week.

Most coverage counts downloads. We took the 2026 stack apart instead: one agent request, ten named components, from host client to stateless server, skills, tasks and the enterprise gateway.

Here is the path, and where it fails:

### 2/7

The scale first, from the MCP project's own anniversary post:

5 billion total SDK downloads.
More than 4.5 billion of them in the past year.
More than 2,500 unique contributors.

A download is not a deployment, though. Nobody publishes live server counts.

### 3/7

The biggest change sits underneath: the 2026-07-28 spec made MCP servers stateless.

Any request can land on any server instance, so servers scale behind an ordinary load balancer.

The cost: state now lives in tool arguments, task handles and external stores.

### 4/7

Next layer: context.

Skills over MCP is in public beta: servers ship skills that load only when needed and update with the server.

Tool search loads only the definitions a task needs. In multi-server setups, Anthropic says that can cut their context by over 85%.

### 5/7

Three more pieces now sit in the request path:

Tasks (GA): servers run long jobs in the background.
Elicitation (GA): servers pause and ask the user before costly or destructive steps.
File Uploads (rolling out): files skip the context window.

### 6/7

Google Workspace adds a gateway: from Feb 1, 2027, AI agents must use its MCP server or CLI, not raw REST.

The MCPHallu benchmark: on unreachable-goal tasks, only 23.2% of agent runs pass. Agents keep calling tools or claim success.

### 7/7

The full piece walks a request through all ten components step by step, records the failure modes, and ends with the design trade-offs to weigh before you build.

https://thetrendtimes.com/blog/mcp-at-two-2026-stateless-skills-workspace/

Get each issue: subscribe at thetrendtimes.com
