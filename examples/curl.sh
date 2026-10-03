#!/bin/bash
# export APIFY_TOKEN=your_token
curl -X POST "https://api.apify.com/v2/acts/automationnation~app-store-reviews-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"apps": ["https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580", "570060128"], "countries": ["us", "gb"], "maxReviewsPerApp": 1000, "sort": "newest"}'
