# Editorial and SEO Guidelines

Every post in `src/content/blog/` must pass this document before it ships. Check each rule against the frontmatter and the rendered page, then run `npx astro build` with zero errors.

## 1. Title and H1

The frontmatter `title` becomes both the `<h1>` (`src/layouts/BlogPost.astro`) and the `<title>`/`og:title` (`src/components/BaseHead.astro`). Write it once and write it for search.

| Rule | Requirement |
|---|---|
| Structure | `[Core topic or keyword]: [What the piece delivers]` |
| Voice | Noun or verb phrases. No sentence-style headlines such as "Here's what…", "Why you should…" or "X. Here's Y" |
| Length | 50 to 60 characters, counted with spaces, so Google does not truncate it in results |
| Front-loading | The search-intent keyword sits in the first 30 characters |
| Punctuation | No trailing period, question mark or exclamation mark |

Example:

- Before: `Lighthouse Now Grades Your Site for AI Agents. Here's What It Checks` (68 characters, sentence style)
- After: `Lighthouse Agentic Browsing: How Chrome Rates AI-Ready Sites` (60 characters, keyword in the first 27 characters)

Count the length before committing:

```sh
node -e 'console.log("Your Title Here".length)'
```

## 2. Heading hierarchy

- One `<h1>` per page. The layout renders it from `title`, so the Markdown body never uses `#`.
- `##` (`<h2>`) marks a main section. `###` (`<h3>`) marks a step or sub-unit inside that section.
- Never skip a level: no `###` directly under the H1, no `####` under a `##`.
- Every heading carries a context keyword. Generic labels are banned.
  - Avoid: `Overview`, `Introduction`, `Details`, `Conclusion`
  - Use: `What Agentic Browsing Checks`, `How the Score Is Calculated`

## 3. Metadata

### Meta description

- Frontmatter `description`, 140 to 155 characters.
- Active voice. Say what the reader learns or can do after reading.
- Must match the article. It feeds `<meta name="description">`, `og:description`, `twitter:description` and the RSS item.

### Open Graph and Twitter Card

`BaseHead.astro` fills these from `title`, `description` and `heroImage`. A post is complete when:

- `title` and `description` follow the rules above.
- `heroImage` points to a 1200×630 image if the post has one. Without it, the post uses `/og/<slug>.png`, the card `scripts/generate-og.mjs` renders before every build. The same image appears at the top of the article with an alt text built from the title.
- The built page contains `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description` and `twitter:image`. Check with:

```sh
grep -oE '(og|twitter):[a-z]+' dist/client/blog/<slug>/index.html | sort -u
```

## 4. Sources

- Every factual claim, number or quote links to its primary source: the vendor's docs, the original study, the spec or the announcement.
- Secondary coverage (news write-ups, blog summaries) may support a primary source but never replaces it.
- List every source in the frontmatter `sources` array (`label` plus `url`). The layout renders them under the article.
- In body text, cite as "According to [Source], [claim] ([year])". Never invent figures; if a number is missing, leave it out.

## 5. Article structures

Issues 001 to 021 all used one skeleton: a sources section, then a closing checklist with `### This week` and `### This month`. New posts rotate through four structures instead, so readers and search engines see articles shaped by the question rather than by a template.

Set the structure in frontmatter:

```yaml
structure: data-comparison   # or case-study, architecture-anatomy, field-checklist
```

### Rotation

Use the four structures in turn, one full cycle every four posts, ordered by `pubDate`. `npm run verify` enforces two rules:

- Two consecutive structured posts never share a structure.
- The newest four structured posts use all four structures. While fewer than four exist, only the first rule applies.

Pick the structure that fits the story, then reorder the next few posts if the rotation would break. Do not force a story into the wrong structure to keep the cycle.

### The four structures

The H2 flow lists section roles, not fixed wording. Write each heading for the topic and keep the keyword in it. The closing H2 must match the pattern in the last column; the verifier reads the last `##` heading of the body.

| `structure` | Use it when | Required elements | H2 flow (roles) | Closing H2 must contain |
|---|---|---|---|---|
| `data-comparison` | Several sources measure the same thing and disagree | Two or more primary sources with numbers side by side; a table or list that pairs each figure with its source, sample and date; where they agree, where they split and why | What each source measured → where the numbers agree → where they split and why → what the data does not measure → decision | `decision`, `decide`, `verdict`, `what to do` or `checklist` |
| `case-study` | One organisation, team or project published its own before-and-after | Named subject and its context; the change it made; the measured result with a source link; what does not transfer to other teams | Context → the change → measured result → why it does not transfer everywhere → lessons | `lesson(s)`, `what to copy`, `what to borrow`, `what to reuse`, `applying` or `checklist` |
| `architecture-anatomy` | A system, protocol or policy needs taking apart | Named components; the data or request flow between them, step by step; at least one documented failure mode; the trade-offs of the design | Components → data flow → failure modes → trade-offs | `trade-off(s)`, `design choices`, `design decisions`, `what to build` or `checklist` |
| `field-checklist` | Readers need to run an audit or rollout themselves | A short problem statement; grouped checks, each naming the tool, file or metric; the order to apply the groups in | Problem → limits of the method → grouped checks → order of work | `checklist`, `steps`, `playbook` or `order of work` |

### Rules for every structured post

- At least three `##` sections.
- One `##` or `###` heading covers measurement limits or the counter-case. The verifier accepts headings such as `What the Survey Does Not Measure`, `Limits of the Benchmark`, `What the Data Misses`, `Why the Result Does Not Transfer` or `Failure Modes in the Token Flow`.
- Closing items start with a verb and name the file, tool or metric involved, as the old checklist did.
- Sections 1 to 4 still apply: 50 to 60 character `[Topic]: [Value]` title, 140 to 155 character description, a primary source for every number, every body link listed in `sources`, no generic headings, no `#` in the body.

### Posts without `structure`

Issues 001 to 021 have no `structure` field and are not edited retroactively. For them the verifier keeps the legacy rule: the closing `##` section ends with these two `###` headings.

```md
### This week
- One or two tasks a reader can finish in an hour.

### This month
- Two or three larger tasks with a measurable result.
```

New posts set `structure` and do not use this skeleton.

## Pre-publish checklist

- [ ] `title` is 50 to 60 characters, `[Topic]: [Value]`, keyword in the first 30 characters
- [ ] No `#` in the Markdown body; headings go `##` then `###` with no skipped level
- [ ] No generic headings (`Overview`, `Introduction`, `Conclusion`)
- [ ] `description` is 140 to 155 characters and in active voice
- [ ] Every claim links to a primary source, and all sources are in frontmatter `sources`
- [ ] `structure` is set, differs from the previous post, and the newest four posts cover all four structures
- [ ] The last `##` matches the structure's closing pattern, and one heading covers measurement limits or the counter-case
- [ ] `npm run verify` passes (title/description length, headings, structure and rotation, source grounding, live links)
- [ ] `npx astro build` finishes with zero errors
