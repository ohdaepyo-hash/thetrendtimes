#!/usr/bin/env node
// Pre-publish gate for src/content/blog. Rules: docs/EDITORIAL_AND_SEO_GUIDELINES.md
//   node scripts/verify-content.mjs [files...]   check posts (default: every post)
//   --offline     skip the network link check
//   --selftest    run the built-in checks against fixture text
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BLOG_DIR = "src/content/blog";
const GENERIC_HEADINGS = /^(overview|introduction|intro|details|conclusion|summary|final thoughts)$/i;
// Numbers that count as factual claims: 12%, $40, 13.3 / v1.2.3, 300,000, "Chrome 150"-style versions.
const NUMERIC_CLAIM =
	/\d+(?:\.\d+)?\s?%|\$\s?\d|\b\d+\.\d+(?:\.\d+)*\b|\b\d{1,3}(?:,\d{3})+\b|\b(?:Chrome|Lighthouse|Node(?:\.js)?|Astro|Safari|Firefox|iOS|Android|v)\s?\d+/;

// Rotating article structures (docs/EDITORIAL_AND_SEO_GUIDELINES.md, section 5).
// Each maps to the pattern its closing (last) H2 must match. Keep in sync with the guideline table.
export const STRUCTURES = {
	"data-comparison": /\b(decision|decide|verdict|what to do|checklist)\b/i,
	"case-study": /\b(lessons?|what to (copy|borrow|reuse)|applying|checklist)\b/i,
	"architecture-anatomy": /\b(trade-?offs?|design (choices|decisions)|what to build|checklist)\b/i,
	"field-checklist": /\b(checklist|steps|playbook|order of work)\b/i,
};
// At least one H2/H3 must own the measurement limits or the counter-case.
const LIMITS_HEADING =
	/(do(es)? not (say|cover|tell|measure|transfer)|doesn't (say|cover|tell|measure|transfer)|cannot be measured|limits? of|what .* (miss|omit)|failure modes?|counter-?(case|evidence))/i;

// ponytail: frontmatter here is flat YAML written by us, so regex beats adding a YAML dependency.
// Upgrade to the `yaml` package if posts start using multi-line or nested values beyond `sources`.
export function parsePost(text) {
	const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!m) return null;
	const [, fm, body] = m;
	const field = (k) => fm.match(new RegExp(`^${k}:\\s*(.*)$`, "m"))?.[1].trim().replace(/^(["'])(.*)\1$/, "$2");
	const sources = [...fm.matchAll(/^\s+url:\s*["']?([^"'\s]+)["']?\s*$/gm)].map((x) => x[1]);
	return { title: field("title") ?? "", description: field("description") ?? "", pubDate: field("pubDate") ?? "", structure: field("structure"), sources, body };
}

// Body with fenced code blocks and inline code removed, so examples never trip the linters.
const prose = (body) => body.replace(/^(```|~~~)[\s\S]*?^\1/gm, "").replace(/`[^`\n]*`/g, "");

const norm = (u) => u.replace(/[#?].*$/, "").replace(/\/$/, "").toLowerCase();

export function bodyLinks(body) {
	const urls = new Set();
	for (const m of prose(body).matchAll(/https?:\/\/[^\s)<>\]"']+/g)) urls.add(m[0].replace(/[.,;:]+$/, ""));
	return [...urls];
}

export function lintFrontmatter(post) {
	const errs = [];
	const t = post.title;
	if (t.length < 50 || t.length > 60) errs.push(`title is ${t.length} chars, needs 50-60: "${t}"`);
	if (/[.?!]$/.test(t)) errs.push("title ends with . ? or !");
	if (!t.includes(":")) errs.push('title should follow "[Topic]: [Value]"');
	else if (t.indexOf(":") > 30) errs.push("search keyword (text before the colon) should sit in the first 30 chars");
	const d = post.description.length;
	if (d < 140 || d > 155) errs.push(`description is ${d} chars, needs 140-155`);

	let prev = 1; // the layout renders the title as the only H1
	const headings = [];
	for (const m of prose(post.body).matchAll(/^(#{1,6})\s+(.+?)\s*#*$/gm)) {
		const level = m[1].length;
		const text = m[2];
		headings.push(text);
		if (level === 1) errs.push(`H1 in body ("# ${text}"); the layout already renders the title as the only H1`);
		else if (level > prev + 1) errs.push(`heading level skipped: h${prev} -> h${level} at "${text}"`);
		if (GENERIC_HEADINGS.test(text)) errs.push(`generic heading "${text}"`);
		prev = level;
	}
	if (!post.structure) {
		// Legacy rule for posts written before rotating structures (no `structure` field).
		if (!post.body.match(/^### This week\s*$/m) || !post.body.match(/^### This month\s*$/m))
			errs.push('post must end with "### This week" and "### This month" checklists');
		return errs;
	}
	const closing = STRUCTURES[post.structure];
	if (!closing) return [...errs, `unknown structure "${post.structure}" (use ${Object.keys(STRUCTURES).join(", ")})`];
	const h2s = [...prose(post.body).matchAll(/^##\s+(.+?)\s*#*$/gm)].map((m) => m[1]);
	if (h2s.length < 3) errs.push(`needs at least 3 H2 sections, found ${h2s.length}`);
	if (!h2s.length || !closing.test(h2s.at(-1)))
		errs.push(`${post.structure} must close with an action H2 matching ${closing} (last H2: "${h2s.at(-1) ?? "none"}")`);
	if (!headings.some((h) => LIMITS_HEADING.test(h)))
		errs.push("needs a section on measurement limits or the counter-case (heading matching e.g. \"What the Data Does Not Measure\")");
	return errs;
}

export function checkGrounding(post) {
	const errs = [];
	const sources = new Set(post.sources.map(norm));
	for (const url of bodyLinks(post.body))
		if (!sources.has(norm(url))) errs.push(`body links ${url} but it is missing from frontmatter sources`);

	// A paragraph that states a number must link to one of its frontmatter sources,
	// unless the same number was already cited earlier (e.g. repeated in the closing checklist).
	const grounded = new Set();
	const claimRe = new RegExp(NUMERIC_CLAIM.source, "g");
	for (const block of prose(post.body).split(/\n\s*\n/)) {
		const para = block.replace(/^#.*$/gm, ""); // headings are not claims
		const hits = [...para.matchAll(claimRe)].map((m) => m[0].replace(/\s+/g, " ").trim());
		if (!hits.length) continue;
		if (bodyLinks(para).some((u) => sources.has(norm(u)))) {
			hits.forEach((h) => grounded.add(h));
			continue;
		}
		const snippet = para.replace(/\s+/g, " ").trim().slice(0, 90);
		for (const h of hits.filter((h) => !grounded.has(h)))
			errs.push(`number "${h}" has no primary source link in its paragraph: "${snippet}…"`);
	}
	return errs;
}

// Posts with a `structure`, oldest first: no two in a row share one, and the newest four use all four.
export function checkRotation(posts) {
	const seq = posts.filter((p) => p.structure).sort((a, b) => a.pubDate.localeCompare(b.pubDate) || a.file.localeCompare(b.file));
	const errs = [];
	for (let i = 1; i < seq.length; i++)
		if (seq[i].structure === seq[i - 1].structure)
			errs.push(`${seq[i].file} repeats structure "${seq[i].structure}" from the previous post ${seq[i - 1].file}`);
	const all = Object.keys(STRUCTURES);
	if (seq.length >= all.length) {
		const recent = new Set(seq.slice(-all.length).map((p) => p.structure));
		const missing = all.filter((s) => !recent.has(s));
		if (missing.length) errs.push(`the newest ${all.length} structured posts skip ${missing.join(", ")}; rotate through all four`);
	}
	return errs;
}

const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0 Safari/537.36 TrendTimesLinkCheck";

export async function checkUrl(url) {
	const opts = (method) => ({ method, redirect: "follow", headers: { "user-agent": UA, accept: "text/html,*/*" }, signal: AbortSignal.timeout(20000) });
	try {
		let res = await fetch(url, opts("HEAD"));
		// Many servers reject or mishandle HEAD; GET is the source of truth.
		if (res.status !== 200) res = await fetch(url, opts("GET"));
		await res.body?.cancel();
		return res.status === 200 ? null : `HTTP ${res.status}`;
	} catch (e) {
		return e.cause?.code ?? e.name ?? String(e);
	}
}

async function main(argv) {
	const offline = argv.includes("--offline");
	const files = argv.filter((a) => !a.startsWith("--"));
	const targets = files.length
		? files
		: readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f)).map((f) => join(BLOG_DIR, f));

	let failures = 0;
	const urlOwners = new Map();
	for (const file of targets) {
		const post = parsePost(readFileSync(file, "utf8"));
		const errs = post ? [...lintFrontmatter(post), ...checkGrounding(post)] : ["no frontmatter block"];
		if (post) for (const u of new Set([...post.sources, ...bodyLinks(post.body)])) urlOwners.set(u, [...(urlOwners.get(u) ?? []), file]);
		for (const e of errs) console.log(`FAIL ${file}: ${e}`);
		if (!errs.length) console.log(`ok   ${file}: frontmatter, headings, grounding`);
		failures += errs.length;
	}

	// Rotation depends on the whole archive, not just the files named on the command line.
	const archive = readdirSync(BLOG_DIR)
		.filter((f) => /\.mdx?$/.test(f))
		.map((f) => ({ file: join(BLOG_DIR, f), ...parsePost(readFileSync(join(BLOG_DIR, f), "utf8")) }));
	const rotation = checkRotation(archive);
	for (const e of rotation) console.log(`FAIL rotation: ${e}`);
	if (!rotation.length) console.log(`ok   rotation: ${archive.filter((p) => p.structure).length} structured post(s)`);
	failures += rotation.length;

	if (offline) console.log("skip link check (--offline)");
	else {
		const results = await Promise.all([...urlOwners.keys()].map(async (u) => [u, await checkUrl(u)]));
		for (const [u, err] of results) {
			if (err) {
				failures++;
				console.log(`FAIL link ${u}: ${err} (in ${urlOwners.get(u).join(", ")})`);
			} else console.log(`ok   link ${u}`);
		}
	}

	console.log(failures ? `\n${failures} problem(s). Fix them before publishing.` : "\nAll content checks passed.");
	process.exitCode = failures ? 1 : 0;
}

function selftest() {
	const assert = (cond, msg) => {
		if (!cond) throw new Error(`selftest: ${msg}`);
	};
	const src = "https://example.org/study";
	const good = `---
title: "Agentic Browsing Audits: What Lighthouse Checks and Why"
description: "${"x".repeat(145)}"
sources:
  - label: "Study"
    url: "${src}"
---
## What the Study Found

According to [the study](${src}), 10.13% of sites had one.

\`\`\`sh
# not a heading, 99% fine inside code
\`\`\`

## Next Steps for Builders

### This week
- Recheck the 10.13% figure.

### This month
- Fix it.
`;
	const p = parsePost(good);
	assert(p.sources[0] === src, "parses sources");
	assert(lintFrontmatter(p).length === 0, `clean post passes frontmatter: ${lintFrontmatter(p)}`);
	assert(checkGrounding(p).length === 0, `clean post passes grounding: ${checkGrounding(p)}`);

	const bad = good
		.replace("Agentic Browsing Audits: What Lighthouse Checks and Why", "Short.")
		.replace("## What the Study Found", "# Overview\n\n### Skipped Level")
		.replace(`According to [the study](${src}), 10.13%`, "Usage grew 40%")
		.replace("### This month", "### Later");
	const b = parsePost(bad);
	const fe = lintFrontmatter(b).join("\n");
	for (const want of ["title is 6 chars", "ends with", "H1 in body", "generic heading", "skipped", "This month"])
		assert(fe.includes(want), `bad post flags "${want}"\n${fe}`);
	assert(checkGrounding(b).some((e) => e.includes('"40%"')), "unsourced number is flagged");
	assert(checkGrounding(parsePost(good.replace("](https://example.org/study)", "](https://other.example/x)"))).some((e) => e.includes("missing from frontmatter")), "unlisted body link is flagged");

	// Rotating structures: one passing fixture per structure.
	const structured = (structure, h2s, date = "2026-12-01") =>
		good
			.replace("sources:", `pubDate: ${date}\nstructure: ${structure}\nsources:`)
			.replace("## What the Study Found", `## ${h2s[0]}`)
			.replace("## Next Steps for Builders", `## ${h2s[1]}\n\nThe study covers one quarter.\n\n## ${h2s[2]}`)
			.replace(/### This (week|month)\n/g, ""); // no legacy checklist headings
	const fixtures = {
		"data-comparison": ["Where the Three Surveys Agree", "What the Surveys Do Not Measure", "Decision Checklist for Platform Teams"],
		"case-study": ["How One Team Moved Its Review Queue", "Why the Result Does Not Transfer to Small Teams", "Lessons to Copy This Quarter"],
		"architecture-anatomy": ["Components of the MCP Request Path", "Failure Modes in the Token Flow", "Trade-offs When You Build It"],
		"field-checklist": ["The Audit Gap in Agent Rollouts", "Limits of the Readiness Score", "Rollout Checklist by Team"],
	};
	const posts = Object.entries(fixtures).map(([st, h2s], i) => ({ file: `${st}.md`, ...parsePost(structured(st, h2s, `2026-12-0${i + 1}`)) }));
	for (const p of posts) {
		assert(lintFrontmatter(p).length === 0, `${p.structure} fixture passes: ${lintFrontmatter(p)}`);
		assert(checkGrounding(p).length === 0, `${p.structure} fixture grounding: ${checkGrounding(p)}`);
	}
	assert(checkRotation(posts).length === 0, `four distinct structures rotate cleanly: ${checkRotation(posts)}`);
	assert(checkRotation([...posts, { ...posts[0], file: "x.md", pubDate: "2026-12-09" }]).length === 0, "A B C D A passes");

	// Failing fixtures.
	const dup = [...posts.slice(0, 2), { ...posts[1], file: "dup.md", pubDate: "2026-12-03" }];
	assert(checkRotation(dup).some((e) => e.includes("repeats structure")), "back-to-back structure is flagged");
	const skip = [posts[0], posts[1], { ...posts[0], file: "a2.md", pubDate: "2026-12-05" }, { ...posts[1], file: "b2.md", pubDate: "2026-12-06" }];
	assert(checkRotation(skip).some((e) => e.includes("skip")), "newest four missing a structure is flagged");
	const noClose = parsePost(structured("data-comparison", ["Where the Three Surveys Agree", "What the Surveys Do Not Measure", "Where the Numbers Split"]));
	assert(lintFrontmatter(noClose).some((e) => e.includes("must close with")), "missing closing section is flagged");
	const noLimits = parsePost(structured("field-checklist", ["The Audit Gap in Agent Rollouts", "Scoring Agent Readiness", "Rollout Checklist by Team"]));
	assert(lintFrontmatter(noLimits).some((e) => e.includes("measurement limits")), "missing limits section is flagged");
	assert(lintFrontmatter(parsePost(structured("listicle", ["A Section", "B Section", "C Section"]))).some((e) => e.includes("unknown structure")), "unknown structure is flagged");
	console.log("selftest passed");
}

if (process.argv.includes("--selftest")) selftest();
else await main(process.argv.slice(2));
