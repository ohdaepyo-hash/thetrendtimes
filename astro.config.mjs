// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import cloudflare from "@astrojs/cloudflare";

const SITE = "https://thetrendtimes.com";

// lastmod per URL from post frontmatter (`updatedDate ?? pubDate`). Content collections are not
// available in config, so read the flat frontmatter directly (same approach as scripts/generate-og.mjs).
const BLOG_DIR = "./src/content/blog";
const lastmod = new Map();
for (const f of readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))) {
	const fm = readFileSync(`${BLOG_DIR}/${f}`, "utf8").split(/^---$/m)[1] ?? "";
	const get = (/** @type {string} */ k) => fm.match(new RegExp(`^${k}:\\s*["']?([^"'\\s]+)`, "m"))?.[1];
	const date = new Date(get("updatedDate") ?? get("pubDate") ?? "");
	if (isNaN(+date)) continue;
	lastmod.set(`${SITE}/blog/${f.replace(/\.mdx?$/, "")}/`, date);
	const hub = `${SITE}/category/${get("category")}/`;
	if (!(lastmod.get(hub) > date)) lastmod.set(hub, date);
}

// Workers static assets answer slash-less paths with a 307. Write one static 301 per prerendered
// page into _redirects (no wildcards, so /og/*.png and /_astro/* are untouched). Wrangler reads
// _redirects from the assets directory even though .assetsignore keeps it from being served.
/** @type {import('astro').AstroIntegration} */
const permanentSlashRedirects = {
	name: "permanent-slash-redirects",
	hooks: {
		"astro:build:done": ({ dir, pages }) => {
			const rules = pages
				.map((p) => p.pathname.replace(/\/$/, ""))
				.filter((p) => p && !p.includes(".")) // pages only: skip "/" and files like rss.xml
				.map((p) => `/${p} /${p}/ 301`);
			// No /category/ index page exists; send the bare hub root to the archive.
			rules.push("/category /blog/ 301", "/category/ /blog/ 301");
			writeFileSync(fileURLToPath(new URL("_redirects", dir)), rules.join("\n") + "\n");
		},
	},
};

// https://astro.build/config
export default defineConfig({
	site: SITE,
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes("/tools/docchase"),
			// Posts and hubs get a real date; other pages get none rather than a guessed one.
			serialize: (item) => {
				const d = lastmod.get(item.url);
				return d ? { ...item, lastmod: d.toISOString() } : item;
			},
		}),
		permanentSlashRedirects,
	],
	// ponytail: no sessions or image transforms on this site, so skip the KV and Images bindings.
	session: false,
	adapter: cloudflare({ imageService: "passthrough" }),
});
