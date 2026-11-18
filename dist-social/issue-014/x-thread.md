# X thread for issue 014

- Account: @TrendTimesHQ
- Article: https://thetrendtimes.com/blog/agent-skills-mcp-aaif-open-agent-stack/
- Length rule: every tweet stays under 280 characters, 230 to 265 preferred. X counts any URL as 23 characters. No em dashes.
- `scripts/post-to-x.js` reads the tweets below. Each one starts at a `### n/7` heading and runs until the next heading.

### 1/7

Anthropic says 1 million Agent Skills have been published and nearly 280 million installed.

In four weeks the standard moved to the Agentic AI Foundation, MCP fixed its release calendar, and AWS put approval gates on skill records.

We read the 7 primary sources:

### 2/7

What moved on Oct 22: the Agent Skills name, logo, GitHub org and agentskills.io domain.

70+ agent platforms already integrate it, including ChatGPT, Cursor, GitHub Copilot and VS Code.

Maintainers from Anthropic, Google and OpenAI serve as individuals.

### 3/7

AAIF launched in Dec 2025 with 3 projects. It now hosts 10.

New this round: Agent Skills (Anthropic), Open Responses (OpenAI), OpenEnv (Hugging Face), OpenSandbox (Alibaba).

They join A2A, Agent Router, agentgateway, AGENTS.md, goose and MCP.

### 4/7

The SKILL.md spec is small. Two required fields: name (64 chars max) and description (1,024 max).

Agents load about 100 tokens of metadata per skill at startup. The full body, under 5,000 tokens recommended, loads only when the skill activates.

### 5/7

Google's Kurtis Van Gent, a maintainer of both specs, calls them complementary.

MCP commoditized tools and caused tool and context bloat. Skills commoditized context.

Skills teach the agent how to approach a task. MCP gives it the live tools to do it.

### 6/7

MCP now ships every 6 months, on the last Tuesday of March and September. Next: 2027-03-30.

Regular cycles: soft freeze 2.5 months out, Tier 1 SDK betas at 1.5, hard freeze at 1.

AWS Agent Registry now rejects records that break your metadata schema.

### 7/7

Open gaps: no versioned Agent Skills release yet, no packaging or discovery standard, and the install count is Anthropic's own.

Full breakdown with sources and a checklist:
https://thetrendtimes.com/blog/agent-skills-mcp-aaif-open-agent-stack/

Get the next one: subscribe at thetrendtimes.com
