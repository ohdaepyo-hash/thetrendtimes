# Reddit post for issue 014

Target: r/AI_Agents (r/ClaudeCode as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`Agent Skills moved to the Agentic AI Foundation, MCP now ships every 6 months, and AWS gates skill records: notes from 7 primary sources`

## Body

Between October 22 and November 17 four organizations changed the same agent stack. I read the seven primary sources side by side. Every number below comes from them.

**Agent Skills donation** ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)).

- Anthropic gave the name, logo, GitHub org and agentskills.io domain to the Agentic AI Foundation (AAIF).
- Anthropic's own count: 1 million skills published, nearly 280 million installs, 70+ integrating platforms. The post gives no counting method.
- Proposed roadmap: versioned releases, a formal proposal process, security guidance for skill authors and installers.

**AAIF** ([announcement](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects)).

- 3 projects at launch in December 2025, 10 now. New: Agent Skills, Open Responses, OpenEnv, OpenSandbox.

**The spec** ([agentskills.io/specification](https://agentskills.io/specification)).

- Required frontmatter: `name` (64 chars, lowercase, must match the folder) and `description` (1,024 chars).
- Progressive disclosure: ~100 tokens of metadata at startup, body under 5,000 tokens on activation, resources only when needed. Keep `SKILL.md` under 500 lines; check with `skills-ref validate`.

**How it fits with MCP** ([Google interview with Kurtis Van Gent](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)).

- MCP gives the agent live tools; skills give it the procedure. Google's Cloud SQL and AlloyDB plugins for Antigravity bundle both.
- Open gaps he names: packaging, discovery, naming conflicts, spec versioning.

**MCP release cycle** ([MCP blog](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/), [SEP-3398](https://modelcontextprotocol.io/seps/3398-release-cycle-updates)).

- Releases on the last Tuesday of March and September. Next: `2027-03-30`, replacing the December 2026 target.
- Regular cycles: soft freeze 2.5 months before release, Tier 1 SDK betas at 1.5, hard freeze at 1. The March 2027 transition gets its own calendar with exact dates.

**AWS Agent Registry** ([AWS ML blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)).

- Admin-defined metadata schemas for agent, MCP server and skill records. Bad values fail with `ValidationException`; records with no metadata stay `NON_COMPLIANT` drafts.
- Search filters return approved records only. The approval logic itself is a Lambda function you write.

Full write-up with a this-week checklist: https://thetrendtimes.com/blog/agent-skills-mcp-aaif-open-agent-stack/

Question for the sub: are you serving skills and MCP tools together yet, and how do you keep tool schemas from eating your context?
