---
title: "MCP at Two: Stateless Servers, Skills and Workspace Rules"
description: "Trace a 2026 MCP request from client to stateless server, skills and Workspace gates, then weigh MCPHallu failure data and the trade-offs at each layer."
pubDate: 2026-11-27
category: agents
structure: architecture-anatomy
sources:
  - label: "Model Context Protocol Blog: Two Years of MCP Builders (David Soria Parra and Den Delimarsky, 2026-11-24)"
    url: "https://blog.modelcontextprotocol.io/posts/mcp-turns-two/"
  - label: "Anthropic: MCP servers can now ship skills, run tasks, and more with Claude (2026-11-24)"
    url: "https://claude.com/resources/articles/skills-over-mcp-tasks-and-more"
  - label: "Google Workspace Updates: Simplifying agent access while keeping organizations in control (2026-11-24)"
    url: "https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html?hl=en_EN"
  - label: "Google Open Source Blog: Scaling AI agents with open standards (interview with Kurtis Van Gent, 2026-11-11)"
    url: "https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html"
  - label: "Model Context Protocol Blog: A More Predictable Release Cycle for MCP (2026-11-11)"
    url: "https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/"
  - label: "arXiv: MCPHallu: Benchmarking Reasoning, Execution, and Memory Hallucinations in MCP Agents (v1, 2026-11-05)"
    url: "https://arxiv.org/abs/2611.07689v1"
---

Ask an agent to pull last quarter's numbers from a shared spreadsheet and draft a summary. In 2026 that one request can touch ten named components before an answer comes back. Most teams can name two of them.

The Model Context Protocol (MCP) turns two this week. Anthropic open-sourced it on 2024-11-25, and its SDKs have crossed 5 billion total downloads, more than 4.5 billion of them in the past year ([MCP Blog](https://blog.modelcontextprotocol.io/posts/mcp-turns-two/)). More than 2,500 people have contributed. Growth charts get the attention. The shape of the stack gets less.

Below, each component gets a name, a request walks through them, and a November benchmark shows how agents fail inside it. The last section weighs the cost and benefit of each design choice, so you can decide what to adopt and what to pin.

## The Stack a Single MCP Request Crosses

Two years ago, an MCP deployment was a client and a server holding a session open. The 2026-07-28 release, the largest revision since launch, made servers stateless ([MCP Blog](https://blog.modelcontextprotocol.io/posts/mcp-turns-two/)). In the project's words, "Any request to an MCP server can now land on any server instance."

The wire-level changes are covered elsewhere. The consequence matters here. A server instance remembers nothing between requests, so state moves into tool arguments, task handles and external stores.

That shift pushed work into new layers: skills for instructions, tasks for long jobs, forms for confirmations and gateways for enterprise rules.

## The Components of a 2026 MCP Deployment

Each layer below has a name you can find in a spec or an admin console.

- **Host client.** The app the user talks to, such as Claude, ChatGPT, Goose or VS Code. It decides which tools the model sees.
- **Stateless transport.** Ordinary HTTP requests that any load balancer can route.
- **Server instance.** One copy of an MCP server. It handles a request and forgets it.
- **Tool catalog.** The tool definitions every connected server advertises. With many servers, this list fills the context window.
- **Tool search.** A client step that loads only the definitions a task needs.
- **Skills library.** Instructions, workflows and scripts a server ships alongside its tools.
- **Task handle.** A reference to background work the server runs while the client keeps going.
- **Elicitation form.** A form or link the server sends mid-call to ask the user for input.
- **File spool.** The path that carries a PDF, spreadsheet or image to a server outside the context window.
- **Enterprise gateway.** The admin layer that approves servers and applies quotas, data loss prevention (DLP) and audit rules.

## How a Request Moves Through the Stack

Here is the spreadsheet request, step by step.

1. **The host client reads the prompt** and checks which servers are connected. If an admin approved a server through the Enterprise-Managed Authorization extension, the user connects automatically after signing in once.
2. **Tool search picks the tools.** The client loads a few definitions instead of every server's full list. Anthropic says this can cut the context tool definitions use by over 85% in multi-server setups ([Anthropic](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)).
3. **The skills library adds instructions.** Only the skill's name and description sat in context at startup. The full instructions load now because the task calls for them.
4. **The stateless transport routes the call** to whichever server instance is free. The call carries all the state the server needs.
5. **The server sizes the work.** A quick lookup returns a result. A slow job returns a task handle, and the client moves on.
6. **The server asks before it acts.** If the next step costs money or deletes data, it sends an elicitation form and waits.
7. **The enterprise gateway checks the call** against quota, DLP and audit policy before data leaves the organisation.
8. **The result returns** to the host client, and the model writes the summary.

Steps 2 and 3 spend or save context. Steps 5 and 6 spend the user's time and trust. Step 7 is where an organisation says yes or no.

## How Skills Move Instructions Out of the Context Window

Skills over MCP entered public beta in Claude and Claude Code on November 24. It is on by default for Pro, Max and Ultra plans, and Team plans get it once an admin enables it. Skills load only when needed, and they update with the server, so users install nothing separately ([Anthropic](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)).

The mechanism is progressive disclosure. Kurtis Van Gent, a core maintainer on both MCP and Agent Skills, explained it in a Google Open Source interview. At startup the agent loads only a lightweight YAML frontmatter name and description. The full `SKILL.md` instructions, reference files or scripts enter context only when a task needs them ([Google Open Source Blog](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)).

In this anatomy, progressive disclosure is the instruction-side twin of tool search. One trims the tool catalog before a call. The other keeps a server's playbooks out of context until a step needs them, so the two layers pay for different parts of the same window.

The launch partners show what goes into a skill. Shopify uses one to design and update a merchant's store end to end, HubSpot for onboarding and Atlassian for organisational context. Carta's, listed as coming soon, will draft and issue equity from an uploaded document ([Anthropic](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)).

## Where Tasks, Elicitation and File Uploads Sit

If no instance remembers anything, how does a long job report back? Through a task handle. Tasks became generally available in Claude and Claude Code alongside the skills beta ([Anthropic](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)).

With Tasks, a server runs slow operations or a full agent loop in the background. Claude keeps working and picks up the result when it's ready. ZoomInfo uses it for account and contact research that used to take several prompts.

Elicitation, also generally available, covers the moment a server needs a human. It pauses, sends a form or link and continues where it left off. Supabase confirms costs before creating a paid project or running destructive SQL. GitHub makes users type a repository's name before an agent deletes it.

File Uploads will roll out soon in Claude. It sends PDFs, spreadsheets and images to a server without passing them through the context window. On the protocol side, file upload and download is a working group draft, short of beta ([MCP Blog](https://blog.modelcontextprotocol.io/posts/mcp-turns-two/)).

Want each new layer explained as it ships? [Subscribe to The Trend Times](/) for one primary-source briefing per issue.

## Where the Workspace Gateway Enters the Path

Google made the gateway layer concrete on November 24. The Workspace MCP server and Workspace CLI are generally available, covering Gmail, Drive, Docs, Sheets, Slides, Calendar, Chat and Tasks ([Google Workspace Updates](https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html?hl=en_EN)). The CLI runs in a terminal, a VM or a container sandbox, with packaged agent skills, dynamic command discovery and scoped sign-in.

The rule that changes architectures is narrow but firm. AI agents and similar tools must reach Workspace data through the MCP server or the CLI, not by calling Workspace REST APIs directly. Technical enforcement begins on February 1, 2027. The rule covers agentic access, not every Workspace integration.

MCP tools return summaries assembled inside the Workspace boundary, which Google says lowers token cost and latency.

Quotas split into two tiers. Standard is free with public quotas, and Scaled bills only for usage above a daily free allowance from April 1, 2027 ([Google Workspace Updates](https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html?hl=en_EN)). Google says over 99% of active developers already work within Standard.

The controls make this a gateway rather than a pipe. Agents identify themselves during OAuth sign-in, so admins manage access centrally. Admins can set rules that make sensitive actions, such as reading an external file or sharing data, wait for a user confirmation. DLP rules and audit logs apply automatically, under Security > API Controls in the admin console.

## Failure Modes the Benchmark Records

A clean diagram hides the most common failure: an agent that keeps calling tools when the goal cannot be reached. MCPHallu, posted to arXiv on November 5, measures this. It runs 358 tasks on 36 production MCP servers in isolated Docker containers, across general search, analytics, productivity, finance and coding ([arXiv](https://arxiv.org/abs/2611.07689v1)).

Each task targets one of four hallucination subtypes: Branch Collapse, Unreachable Goal, Tool Misuse and Context Forgetting. The authors, from Peking University, Zhongguancun Academy, Meituan and HKUST, evaluated 14 frontier LLM agents from eight vendors on 5,012 trajectories. The average score was 0.642 on a 0 to 1 scale, and the best model reached 0.728 ([arXiv](https://arxiv.org/abs/2611.07689v1)).

Unreachable Goal was the hardest subtype. The average score fell to 0.458, and only 23.2% of runs passed ([arXiv](https://arxiv.org/abs/2611.07689v1)). Faced with an impossible goal, agents kept issuing tool calls or claimed success. Every layer of the stack can work as designed while the model reports a result that does not exist.

The paper names three trajectory-level failure modes:

- **False completion.** The agent says the job is done when it is not, the Unreachable Goal pattern.
- **Tool indiscipline.** The agent mixes look-alike tools with overlapping schemas into its calls, the Tool Misuse pattern.
- **State non-commitment.** The agent fails to commit to state it already established. The paper studies it alongside Context Forgetting.

Rankings also shift by failure type. A model's rank moved 6.9 of 13 positions on average across subtypes, and Branch Collapse and Unreachable Goal scores were uncorrelated, with r = -0.12 ([arXiv](https://arxiv.org/abs/2611.07689v1)).

Scoring leans on deterministic evidence: reference scripts against live servers, post-run state assertions and checks on trajectory structure. An LLM judge contributes only 20% to 30% of each subtype score ([arXiv](https://arxiv.org/abs/2611.07689v1)). That makes the numbers harder to game, though not free of judge influence.

## What the Download Counts Do Not Measure

Anthropic reports over 700 million monthly SDK downloads and over 10,000 MCP connectors for Claude ([Anthropic](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)). A download is not a deployment. These counts do not cover production servers, active users or successful tool calls, and no source here publishes those.

MCPHallu is a benchmark, not production telemetry. Its 36 servers and task design differ from any real organisation's tool catalog, and its scores belong to specific model and server pairings ([arXiv](https://arxiv.org/abs/2611.07689v1)). A model's rank on your stack could differ.

The 85% context saving is a vendor claim about what tool search "can" achieve, with no independent measurement published yet ([Anthropic](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more)). The 99% Standard-tier figure describes developers at the time of the announcement, ahead of the February 2027 enforcement date.

## Primary Sources Behind This Analysis

- [Two Years of MCP Builders](https://blog.modelcontextprotocol.io/posts/mcp-turns-two/): download totals, contributors, the stateless release and extension status.
- [Anthropic's skills and tasks announcement](https://claude.com/resources/articles/skills-over-mcp-tasks-and-more): Skills over MCP, Tasks, Elicitation, File Uploads, tool search, monthly downloads and connectors.
- [Google Workspace Updates](https://workspaceupdates.googleblog.com/2026/11/mcp-servers-cli-standardized-usage-tiers-now-available.html?hl=en_EN): the Workspace MCP server and CLI, the agent access rule, tiers and admin controls.
- [Google Open Source's interview with Kurtis Van Gent](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html): progressive disclosure and the reasons for going stateless.
- [A More Predictable Release Cycle for MCP](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/): release dates and the freeze schedule.
- [MCPHallu on arXiv](https://arxiv.org/abs/2611.07689v1): benchmark design, scores and failure modes.

## Design Trade-offs to Weigh Before You Build

Van Gent recalls early Transports working group meetings of around five people, three from Google. Stateful assumptions about persistent sessions were holding MCP back at scale, and a two-day Transports Summit in Google's San Francisco offices set the path to the stateless spec ([Google Open Source Blog](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)). The gain was horizontal scale. The cost is that every server author must now put state somewhere explicit.

The release cadence sets when you pay. Specs ship on the last Tuesday of March and September, and the next version is 2027-03-30. Soft freeze lands 2.5 months before release, Tier 1 SDK betas at 1.5 months and hard freeze at one month ([MCP release cycle](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/)). If an SDK runs late, the spec date holds and the gap is documented.

### Trade-offs That Repay Their Cost

- List every place a server writes state, and name the store it uses, before you take the load balancer win.
- Log the `tools/list` payload size per server before you add a tenth connector, and check that tool search still picks the right tools.
- Add an elicitation form to every tool that deletes data or spends money, and measure how long users wait at the prompt.
- Move agent code off Workspace REST APIs before February 1, 2027, so DLP rules and audit logs cover it.

### Trade-offs to Revisit at Every Release

- Diff each server's `SKILL.md` set on update and rerun your evals, because skills can change agent behaviour without a client release.
- Set a timeout on every task handle and alert when one expires without a result.
- Keep file upload handling behind a feature flag until the extension reaches a spec version.
- Pin `MCP-Protocol-Version: 2026-07-28` in your client config and test the 2027-03-30 spec in a branch once Tier 1 SDK betas land.
- Track pass rate on infeasible-goal tasks in your own eval set, and fail any run that claims success without a matching state change.
