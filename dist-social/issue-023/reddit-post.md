# Reddit post for issue 023

Target: r/SaaS (r/ExperiencedDevs as the alternative). Draft only; not posted. Post the body as a text post, not a link post, and read the subreddit's self-promotion rule on the day you post.

## Title

`I compared Q3 2026 earnings from 4 SaaS vendors with a 75-row audit of AI pricing pages. Notes on seats vs credits vs outcomes`

## Body

Everyone is arguing about how to price AI features. I put two kinds of public data side by side: four Q3 2026 earnings releases and an academic audit of AI pricing pages. Each number stays with its source.

**The four vendors** (quarter ended 2026-09-30, all company-reported).

- monday.com: $377.5M revenue, +19%, NRR 108%, and $36M in AI ARR covering AI credits, agents and vibe ([release](https://ir.monday.com/news-and-events/news-releases/news-details/2026/monday-com-Announces-Third-Quarter-2026-Results-new/default.aspx)).
- Klaviyo: $387.2M, +25%, NRR 108%. No separate AI revenue figure ([release](https://investors.klaviyo.com/newsroom/news/news-details/2026/Klaviyo-Delivers-Solid-Q3-with-Enterprise-Growth-Multi-Product-Strength-and-Agent-Traction/default.aspx)).
- Freshworks: $245.4M, +14%, NRR 104% (105% constant currency). No AI revenue figure ([release](https://ir.freshworks.com/news/news-details/2026/Freshworks-Reports-Record-Third-Quarter-2026-Results/default.aspx)).
- Kaltura: $47.3M, +8%, NRR 97%. 15 deals with AI offerings, $3.8M combined TCV, up from $1.0M in Q2 ([release](https://investors.kaltura.com/news-releases/news-release-details/kaltura-announces-financial-results-third-quarter-2026)).

**Where they agree.** Growth sits in large accounts. monday.com's NRR is 114% for $50K+ ARR customers. Klaviyo's $50K+ customers grew 33%. Freshworks' $100K+ customers grew 25% while $5K+ grew 5%. Kaltura: 12 of its 15 AI deals were expansions or renewals.

**The pricing audit** ([arXiv 2610.30701v2](https://arxiv.org/abs/2610.30701v2), pages captured 2026-09-16 to 09-17).

- 75 rows: 52 AI-native (Forbes AI 50, 2026), 14 cloud platforms, 9 purposive rows kept out of prevalence figures.
- 23 of 52 AI-native rows publish no price. Of the 29 observable rows, 16 (55%) are a subscription with a usage quota (45% to 61% under sensitivity tests).
- Outcome pricing: 1 of 52 AI-native rows (Sierra). The purposive outcome examples (Agentforce, Fin, Zendesk AI) are all customer support. Fin is $0.99 per resolution with a 50-resolution monthly minimum.
- Seat vendors (GitHub Copilot, Microsoft 365 Copilot, Notion) add premium requests or credits on top of seats instead of repricing the seat.
- 12 of 14 cloud platforms price by consumption.

**Where the comparison breaks.** AI ARR, TCV and product language are three different units, so the AI numbers cannot be added up. Margins split the same way: Freshworks reports 29.8% non-GAAP operating margin, Kaltura leads with 77% subscription gross margin.

**Limits.** Four vendors are not a sample. The audit codes pricing pages, not contracts, with one primary coder (8 of 11 observable rows matched in a 15-row recheck, kappa 0.52), and its panel cannot support trend claims.

My read: keep the seat, sell AI as a credit quota inside it, and price outcomes only where your logs can attribute them. How are you pricing AI features, and can your billing system report AI revenue as its own line?

Full write-up with both tables and a checklist: https://thetrendtimes.com/blog/saas-ai-pricing-q3-2026-seats-credits-outcomes/
