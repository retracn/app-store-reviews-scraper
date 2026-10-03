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
