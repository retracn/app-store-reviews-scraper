# App Store Reviews Scraper & API: past the 500-review limit, with developer replies

[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-0b57d0)](https://apify.com/automationnation/app-store-reviews-scraper)

App Store Reviews Scraper is an Apify Actor that extracts Apple App Store reviews for any app and country — star rating, title, text, date, author and the developer's reply — and goes past the 500-review limit of Apple's public review feed, at $0.08 per 1,000 reviews. It works as an App Store reviews API: call it from code, schedule it to monitor new reviews, or let AI agents use it through Apify's MCP server.

**Price:** $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · **Run it:** [https://apify.com/automationnation/app-store-reviews-scraper](https://apify.com/automationnation/app-store-reviews-scraper) · **Guide:** [https://retracn.github.io/automationnation-actors/app-store-reviews-scraper/](https://retracn.github.io/automationnation-actors/app-store-reviews-scraper/)

## Quick facts

- One row per review: stars, title, text, date, the reviewer's public name, whether the review was edited, and the developer's reply with its date, plus app name, developer, overall rating and App Store URL.
- Past 500 reviews: most App Store scrapers read Apple's public RSS feed, which stops at the newest 500 reviews per country. This Actor reads the review API behind apps.apple.com and pages back tens of thousands of reviews for popular apps.
- Any app and storefront: App Store URLs, numeric App IDs or app names, several countries per run; newest or most helpful first; star filters.
- Only new reviews mode for scheduled monitoring; repeats aren't charged. In a test run, 5,000 reviews from 3 apps in 2 countries took under 2 minutes.
- Price: $0.08 per 1,000 reviews on the Free plan ($0.05–$0.07 on paid plans), with no caps on free-plan runs or reviews. Apify's free $5 monthly credit covers over 60,000 reviews.
- Migrating from the Node package app-store-scraper? The open-source app-store-scraper-cloud package (github.com/retracn/app-store-scraper-cloud) keeps its API and runs reviews() on this Actor: change one require line, with no 403 errors and no 500-review cap.

## Example input

```json
{
  "apps": [
    "https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580",
    "570060128"
  ],
  "countries": [
    "us",
    "gb"
  ],
  "maxReviewsPerApp": 1000,
  "sort": "newest"
}
```

## Run it from code

**REST API**

```bash
curl -X POST "https://api.apify.com/v2/acts/automationnation~app-store-reviews-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"apps": ["https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580", "570060128"], "countries": ["us", "gb"], "maxReviewsPerApp": 1000, "sort": "newest"}'
```

**Python** — see [`examples/python_example.py`](examples/python_example.py)

```python
# pip install apify-client
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")
run = client.actor("automationnation/app-store-reviews-scraper").call(run_input={
  "apps": [
    "https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580",
    "570060128"
  ],
  "countries": [
    "us",
    "gb"
  ],
  "maxReviewsPerApp": 1000,
  "sort": "newest"
})
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item.get("appName"), item.get("rating"), item.get("date"), item.get("title"))
```

**JavaScript** — see [`examples/node_example.mjs`](examples/node_example.mjs)

```js
// npm install apify-client
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });
const run = await client.actor('automationnation/app-store-reviews-scraper').call({
  "apps": [
    "https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580",
    "570060128"
  ],
  "countries": [
    "us",
    "gb"
  ],
  "maxReviewsPerApp": 1000,
  "sort": "newest"
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) console.log(item.appName, item.rating, item.date, item.title);
```

## Use it with AI agents (MCP)

Hosted MCP server URL (Claude, ChatGPT, Cursor and other clients with remote MCP support):

```
https://mcp.apify.com?tools=automationnation/app-store-reviews-scraper
```

Local config for Claude Desktop / Cursor — [`mcp/claude_desktop_config.json`](mcp/claude_desktop_config.json):

```json
{
  "mcpServers": {
    "app-store-reviews-scraper": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--tools",
        "automationnation/app-store-reviews-scraper"
      ],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

## FAQ

**Why do most App Store scrapers stop at 500 reviews?**
Apple's public RSS review feed only returns the newest 500 reviews per country (10 pages of 50). App Store Reviews Scraper reads the review API that apps.apple.com itself uses, which pages much further back, and keeps the feed as a fallback.

**Does it include developer responses?**
Yes. Every review the developer answered has replyText and replyDate.

**Is there an official App Store reviews API?**
Apple's App Store Connect API returns reviews only for apps in your own developer account. To read reviews of any app, including competitors', App Store Reviews Scraper returns the public reviews shown on the App Store through Apify's REST API, clients, integrations and MCP.

**How much does it cost?**
$0.08 per 1,000 reviews on Apify's Free plan and $0.05–$0.07 on paid plans. Apps that can't be found and repeats in Only new reviews mode are free.

**Can I get reviews from several countries?**
Yes. List the storefronts in countries; each app is read once per country and every row has its country.

## More from AutomationNation

- [AI Visibility Tracker](https://apify.com/automationnation/ai-visibility-tracker) — $0.05 per answer checked ($0.04 on Gold) + $0.50 per optional report · [GitHub examples](https://github.com/retracn/ai-visibility-tracker)
- [Google Jobs Scraper](https://apify.com/automationnation/google-jobs-scraper) — $2 per 1,000 jobs ($1.50 on paid plans) + $0.03 per search · [GitHub examples](https://github.com/retracn/google-jobs-scraper)
- [YouTube Transcript Scraper](https://apify.com/automationnation/youtube-transcript-scraper) — $1.50 per 1,000 transcripts ($1.20 on Gold and above) · [GitHub examples](https://github.com/retracn/youtube-transcript-api)
- [Google Shopping Scraper](https://apify.com/automationnation/google-shopping-scraper) — $1 per 1,000 products ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-shopping-scraper)
- [Google Flights Scraper](https://apify.com/automationnation/google-flights-scraper) — $0.20 per 1,000 flights ($0.16 on Gold and above) · [GitHub examples](https://github.com/retracn/google-flights-scraper)
- [Google Hotels Scraper](https://apify.com/automationnation/google-hotels-scraper) — $1 per 1,000 hotels ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-hotels-scraper)
- [Google Ads Transparency Scraper](https://apify.com/automationnation/google-ads-transparency-scraper) — $1 per 1,000 ads ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-ads-transparency-scraper)
- [Google News Scraper](https://apify.com/automationnation/google-news-scraper) — $1 per 1,000 articles ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-news-scraper)
- [Google Images Scraper](https://apify.com/automationnation/google-images-scraper) — $0.25 per 1,000 images ($0.20 on Gold and above) · [GitHub examples](https://github.com/retracn/google-images-scraper)
- [Google Custom Search API Alternative](https://apify.com/automationnation/google-custom-search-api) — $5 per 1,000 searches of up to 10 results ($4 on Gold and above) · [GitHub examples](https://github.com/retracn/google-custom-search-api-alternative)
- [Google Videos Scraper](https://apify.com/automationnation/google-videos-scraper) — $1 per 1,000 videos ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-videos-scraper)
- [Google Trends Scraper](https://apify.com/automationnation/google-trends-scraper) — $1 per 1,000 keyword reports ($0.27–$0.90 on paid plans) · $0.50 per 1,000 trending searches · [GitHub examples](https://github.com/retracn/google-trends-scraper)
- [Google Play Reviews Scraper](https://apify.com/automationnation/google-play-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/google-play-reviews-scraper)
- [AEO & GEO Tracker — Google AI Overview Citation Checker](https://apify.com/automationnation/aeo-auditor) — $0.04 per keyword ($0.032 on Gold), plus $2 per run from 17 Nov 2026; $0.01 per keyword until 16 Oct 2026 · [GitHub examples](https://github.com/retracn/google-ai-overview-tracker)
- [Google Maps Leads Scraper](https://apify.com/automationnation/google-maps-leads) — $0.03 per lead ($0.024 on Gold) · [GitHub examples](https://github.com/retracn/google-maps-leads-scraper)
- [Google Maps Leads Scraper UK](https://apify.com/automationnation/uk-business-leads) — $0.05 per lead ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/uk-business-leads-google-maps)
- [App Store & Google Play Reviews Scraper + AI](https://apify.com/automationnation/app-store-review-miner) — $0.05 per app report ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/app-store-google-play-reviews-ai)
- [UK Companies House Leads — Filing Signals & AI Outreach](https://apify.com/automationnation/companies-house-leads) — $0.008 per lead
- [Contact Waterfall Enrichment — Emails & Directors](https://apify.com/automationnation/contact-waterfall-enrichment) — $0.015 per company
- [All Actors and guides](https://retracn.github.io/automationnation-actors/) · [AI visibility trackers compared](https://retracn.github.io/automationnation-actors/compare/ai-visibility-trackers/) · [Google Jobs scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-jobs-scrapers/) · [Google Trends scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-trends-scrapers/) · [App Store review scrapers compared](https://retracn.github.io/automationnation-actors/compare/app-store-review-scrapers/) · [Google Play review scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-play-review-scrapers/) · [YouTube transcript scrapers compared](https://retracn.github.io/automationnation-actors/compare/youtube-transcript-scrapers/) · [Google Flights scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-flights-scrapers/) · [Google Hotels scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-hotels-scrapers/) · [Google Ads Transparency scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-ads-transparency-scrapers/) · [Google Shopping scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-shopping-scrapers/) · [Google News scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-news-scrapers/)

---

This repository holds usage examples. The scraper itself runs on the [Apify platform](https://apify.com/automationnation/app-store-reviews-scraper); you need a free Apify account and API token. Examples are MIT licensed.
