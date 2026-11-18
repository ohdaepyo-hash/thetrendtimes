---
title: "Agent Skills and MCP: How AAIF Unifies the Agent Stack"
description: "Agent Skills hits 1M published and nearly 280M installs on 70+ platforms as AAIF reaches 10 projects, MCP sets a 6-month cadence, and AWS governs skills."
pubDate: 2026-11-19
category: tools
sources:
  - label: "Anthropic: Donating Agent Skills to the Agentic AI Foundation (2026-10-22)"
    url: "https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation"
  - label: "Agentic AI Foundation: Four New Projects Announcement (2026-10-22)"
    url: "https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects"
  - label: "Agent Skills Official Specification"
    url: "https://agentskills.io/specification"
  - label: "Google Open Source Blog: Kurtis Van Gent on MCP and Agent Skills Joining the AAIF (2026-11-11)"
    url: "https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html"
  - label: "Model Context Protocol Blog: A More Predictable Release Cycle for MCP (2026-11-11)"
    url: "https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/"
  - label: "Model Context Protocol SEP-3398: Release Cycle Updates (Accepted 2026-10-14)"
    url: "https://modelcontextprotocol.io/seps/3398-release-cycle-updates"
  - label: "AWS Machine Learning Blog: Govern and Discover Records in AWS Agent Registry (2026-11-17)"
    url: "https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/"
---

Kurtis Van Gent writes a new skill whenever an agent fails to get a repeatable workflow right on the first try. One of his skills covers how he formats commit messages, so he never explains that convention in a prompt again ([Google Open Source Blog interview](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)). He is also a core maintainer of both the Model Context Protocol (MCP) and Agent Skills, the two standards at the center of the past four weeks.

Between October 22 and November 17, 2026, four organizations published changes to the same stack. Anthropic gave Agent Skills to the Agentic AI Foundation (AAIF), AAIF reached 10 hosted projects, MCP fixed its release calendar, and AWS added schema checks to its registry of agents, MCP servers and skills ([AAIF announcement](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects)).

If you build agents or run a platform team, each change lands on a file or pipeline you own. This piece reads the seven primary sources side by side and ends with a checklist.

## What Changed in the Agent Stack in Four Weeks

The announcements came from different organizations, but they describe one stack. They arrived in this order ([SEP-3398](https://modelcontextprotocol.io/seps/3398-release-cycle-updates)).
- October 14: MCP Core Maintainers accepted SEP-3398, a fixed release cycle for the protocol ([SEP-3398](https://modelcontextprotocol.io/seps/3398-release-cycle-updates)).
- October 22: Anthropic donated Agent Skills to AAIF, and AAIF announced four new projects ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)).
- November 11: the MCP blog published the six-month schedule, and Google's Open Source Blog interviewed Van Gent on how the two standards fit ([MCP release cycle post](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/)).
- November 17: AWS launched custom metadata schemas in AWS Agent Registry ([AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)).

MCP connects an agent to live tools. Agent Skills packages the procedure for using them. AAIF now holds both, and a registry like AWS's decides which records of either kind your teams may find.

## Agent Skills Passes 1 Million Published Skills

Anthropic says it built skills while working on Claude Code. The agent handled general knowledge work, but it often lacked the procedural knowledge that business tasks need. A skill is a folder with a `SKILL.md` file that teaches one task or domain, plus any scripts or reference material it needs ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)).

Within weeks of the October 2025 launch, developers published thousands of skills on GitHub and wrote loaders for Codex, Cursor and OpenCode. Anthropic published the open standard in December 2025, and more than 70 agent platforms have integrated it since, including ChatGPT, Cursor, GitHub Copilot and VS Code ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)).

The headline numbers are Anthropic's own. According to Anthropic, 1 million skills have been published and nearly 280 million installed so far (2026) ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)). The post does not say how it counts a published skill or an install, or whether installs across platforms are deduplicated.

The donation covers the Agent Skills name and logo, the GitHub organization and the agentskills.io domain. You can keep using the standard, or contribute, without joining AAIF. Engineers from Anthropic, Google, OpenAI and other companies maintain it as individuals, with David Soria Parra and Mahesh Murag as Lead Maintainers. The proposed roadmap starts with versioned releases, a formal proposal process and security guidance for people who write and install skills ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)).

## AAIF Grows From Three Projects to Ten

AAIF made its announcement at AGNTCon + MCPCon North America, held October 22 to 23 at the San Jose McEnery Convention Center. The foundation sits under the Linux Foundation and launched in December 2025 with three projects. With four additions it now hosts 10 ([AAIF announcement](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects)).
- **Agent Skills** (Anthropic): an open format for packaging instructions, scripts and resources that agents load on demand.
- **Open Responses** (OpenAI): a specification for multi-provider LLM interfaces, based on the OpenAI Responses API.
- **OpenEnv** (Hugging Face): a framework for reinforcement learning (RL) environments, run as a containerized service that exposes MCP and Gym.
- **OpenSandbox** (Alibaba): a sandbox platform with Docker and Kubernetes runtimes for coding agents, GUI agents and RL training.

They join six existing projects: the Agent2Agent (A2A) protocol, Agent Router, agentgateway, AGENTS.md, goose and MCP. Anthropic notes that it co-founded AAIF with Block and OpenAI and donated MCP to it earlier ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)).

"A year ago, AAIF launched with three projects and a bet that agentic AI needed a neutral home to thrive. Today we host 10," said Manik Surtani, CTO and co-founder of AAIF ([AAIF announcement](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects)). In the same release, Soria Parra framed the problem skills address: "Without the right context, even the most intelligent agents fall short."

## Inside the SKILL.md Specification

A skill is a directory with at least one `SKILL.md` file, plus optional `scripts/`, `references/` and `assets/` folders. The file opens with YAML frontmatter and continues in Markdown ([Agent Skills specification](https://agentskills.io/specification)).

Two frontmatter fields are required. The `name` field allows up to 64 characters of lowercase letters, digits and hyphens, with no leading, trailing or doubled hyphen, and it must match the parent folder name. The `description` field must be non-empty and stay under 1,024 characters, and it should say what the skill does and when to use it ([Agent Skills specification](https://agentskills.io/specification)).

```yaml
---
name: pdf-processing
description: Extract PDF text, fill forms, merge files. Use when handling PDFs.
license: Apache-2.0
---
```

The optional fields are `license`, `compatibility` (up to 500 characters), `metadata` (a map of string keys to string values) and `allowed-tools`. The spec marks `allowed-tools` as experimental ([Agent Skills specification](https://agentskills.io/specification)).

The design rests on **progressive disclosure**, which means the agent reads more only when a task calls for it. The spec defines three tiers ([Agent Skills specification](https://agentskills.io/specification)).
1. Metadata, about 100 tokens: `name` and `description` load at startup for every installed skill.
2. Instructions, under 5,000 tokens recommended: the full `SKILL.md` body loads when the skill activates.
3. Resources, as needed: files in `scripts/`, `references/` or `assets/` load only when required.

The spec also asks authors to keep `SKILL.md` under 500 lines and file references one level deep from it. Validation runs through the reference library with `skills-ref validate ./my-skill`, which checks frontmatter and naming rules ([Agent Skills specification](https://agentskills.io/specification)).

## Google Says MCP and Agent Skills Are Complementary

Van Gent co-created MCP Toolbox for Databases at Google Cloud and led the MCP Transports Working Group. That work fed into the July 28, 2026 MCP specification, which moved MCP to a stateless model ([Google Open Source Blog interview](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)).

MCP made tools easy to wrap and share, so agents ended up connected to dozens of servers. Deciding which tool schemas and instructions to load became the hard part, a problem he calls "tool and context bloat." In his words, Agent Skills "commoditized context the same way MCP commoditized tools."

He calls the two standards complementary, not competing. Skills teach an agent how to approach a problem, and MCP provides the live execution interface to carry it out. He says the ecosystem is converging on combining them, through Agent Plugins and through proposals to serve Agent Skills over MCP ([Google Open Source Blog interview](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)).

Google's database team ships that pairing. A developer using Antigravity with PostgreSQL on Cloud SQL or AlloyDB installs the matching plugin. MCP gives the agent a list of safe database actions, and the bundled skills give step-by-step instructions for tasks like provisioning an instance or setting up IAM database authentication. Google says its agent workflow benchmarks show faster, more reliable task completion with the pairing, but the interview gives no figures.

Van Gent names three gaps for the spec. Packaging and discovery come first: how collections of skills are bundled, how harnesses find them and how naming conflicts resolve. Versioning is next, so authors and harnesses can declare which spec version they support. Google's own catalog lives at github.com/google/skills ([Google Open Source Blog interview](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html)).

## MCP Moves to a Six-Month Release Cadence

MCP specification releases will now land on the last Tuesday of March and September. The next target is March 30, 2027, published as MCP version `2027-03-30` ([MCP release cycle post](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/)). A proposal that is not ready moves to a later release instead of delaying the spec.

The rules come from SEP-3398, written by Van Gent, created September 17 and accepted October 14, 2026. It moves the release previously targeted for December 2026 to March 30, 2027. Each release gets an eight-month cycle, and successive cycles overlap by two months ([SEP-3398](https://modelcontextprotocol.io/seps/3398-release-cycle-updates)). For regular cycles, the blog post lists these milestones ([MCP release cycle post](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/)).
- Eight months before release: planning begins.
- Six months before: Core Maintainer reviews begin.
- Two and a half months before: soft freeze. Every release-bound proposal must be marked Final and merged, and no new features or major redesigns enter.
- Two months before: planning for the next cycle begins.
- One and a half months before: Tier 1 SDK betas ship against the frozen spec.
- One month before: hard freeze. Only critical security fixes or fixes for release-blocking correctness or interoperability defects go in, through a full Core Maintainer vote.

The March 2027 release is a transition and does not follow that template exactly. Its planning concluded in August 2026, and the release managers publish a transition calendar with the exact freeze, beta and release dates ([SEP-3398](https://modelcontextprotocol.io/seps/3398-release-cycle-updates)).

Luca Chang joins Den Delimarsky and Soria Parra as a Release Manager for the next cycle ([MCP release cycle post](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/)). Under SEP-3398, each cycle has a primary and a secondary manager, and the secondary becomes primary for the following release. The blog adds that message formats and version negotiation stay the same, so existing clients and servers need no change.

## AWS Puts Schemas and Approval Gates on Agent Records

On November 17, AWS added custom metadata schemas to AWS Agent Registry, part of Amazon Bedrock AgentCore. An administrator defines field names, types, allowed values and which fields are required. The registry then enforces that schema on every agent, MCP server and skill record ([AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)).

Each field is `Text`, `Enum`, `URL` or `Boolean`. Common attributes apply to every record, and record-type overrides add fields such as `networkEgress` for `recordType: "MCP"`. A record created with no custom metadata is saved as a `NON_COMPLIANT` draft and cannot be submitted for approval. An unknown field, a missing required field or a bad value fails with a `ValidationException` ([AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)).

In the AWS walkthrough, the AnyCompany payments team publishes `payments-ledger-mcp`, a read-only ledger lookup server. Its pipeline first sends `environment: production`, and the registry rejects it because the allowed values are `["prod","staging","dev"]`. Automation then adds the scan result, a `cmdbId` and a data classification, and submits the record. A `Pending approval` event goes through Amazon EventBridge to an AWS Lambda function, which checks for `COMPLIANT` status, `securityScanStatus=PASSED`, a `cmdbId` and public or internal data, then approves the server ([AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)).

Discovery uses the same fields. Filters such as `environment=prod AND businessUnit=payments AND securityScanStatus=PASSED` return only approved records, and agents can run that search through the registry's MCP endpoint ([AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)).

An update replaces the whole metadata map, so automation must read, merge and write back. Schema changes are additive, so you can add fields but cannot rename, remove or retype them.

## What the Announcements Do Not Say

The adoption numbers have no independent check. The 1 million and nearly 280 million figures come from Anthropic alone, with no counting method ([Anthropic post](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)).

Agent Skills has no versioned releases yet, and no packaging or discovery standard. Those are roadmap items in the Anthropic post and open problems in the Google interview. Security guidance for skill authors and installers is proposed, not published, and `allowed-tools` is still experimental ([Agent Skills specification](https://agentskills.io/specification)).

The AWS approval logic is code you write. The sample registry has an empty `autoApprovalRules` list, and the Lambda checks are an example, not a built-in policy ([AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)). The registry checks that `securityScanStatus` holds an allowed value, not that a scan ran. The exact March 2027 freeze dates are also not in the MCP blog post yet.

## Primary Sources Behind This Analysis

All seven sources returned HTTP 200 and were read in full on November 19, 2026.

- [Anthropic: Donating Agent Skills to the Agentic AI Foundation](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation) (October 22, 2026).
- [AAIF: four new projects](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects) (October 22, 2026).
- [Agent Skills specification](https://agentskills.io/specification).
- [Google Open Source Blog interview with Kurtis Van Gent](https://opensource.googleblog.com/2026/11/scaling-ai-agents-open-standards-mcp-aaif.html) (November 11, 2026).
- [MCP blog: A More Predictable Release Cycle](https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/) (November 11, 2026).
- [SEP-3398: Release Cycle Updates](https://modelcontextprotocol.io/seps/3398-release-cycle-updates) (accepted October 14, 2026).
- [AWS Agent Registry custom metadata](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/) (November 17, 2026).

## Practical Checklist for Agent Builders and Platform Teams

### This week
- Pick one procedure your agents repeat from prompts or `AGENTS.md`, move it into a `SKILL.md` with `name` and `description`, keep it under 500 lines and run `skills-ref validate` on it ([Agent Skills specification](https://agentskills.io/specification)).
- List the MCP servers your agents load at startup and remove tool schemas they never call, then compare context size before and after.

### This month
- Define one shared metadata schema for MCP servers, skills and agents (`environment`, `ownerTeam`, `securityScanStatus`) and require it before any record reaches an approval step ([AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/govern-and-discover-records-with-common-metadata-in-aws-agent-registry/)).
- Schedule testing for MCP `2027-03-30`: subscribe to the transition calendar and plan to test Tier 1 SDK betas against your clients and servers once they ship ([SEP-3398](https://modelcontextprotocol.io/seps/3398-release-cycle-updates)).
- Write down which Agent Skills fields your harness relies on today, so you can check them against the first versioned spec release.
