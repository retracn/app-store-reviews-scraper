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
