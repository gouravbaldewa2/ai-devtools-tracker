---
name: scrape-ai-devtools-updates
description: Scrapes the latest updates from Antigravity, Cursor, Warp, and Claude Code, then posts them to the backend API
---

This skill scrapes AI development tools for their latest updates and posts them to a backend API.

## Environment Setup
- Docker image: node:22-bookworm
- Working directory: /workspace

## Setup Steps
1. Clone the repository if not already available
2. Run: `npm install --workspaces`

## Execution
1. Navigate to the cloud agent directory: `cd apps/cloud-agent`
2. Run the scraper: `npm run start`

## Environment Variables Required
- BACKEND_API_URL: The base URL for the backend API (e.g., https://ai-devtools-tracker-web.vercel.app/api)
- BACKEND_API_KEY: Authentication key for posting updates to the API

## Schedule
Run this daily at 9 AM UTC (cron: 0 9 * * *)

## Expected Behavior
The agent will:
1. Scrape GitHub releases and changelog pages for each tool
2. Extract structured data (title, date, highlights, version)
3. POST the data to the backend API at /api/updates/bulk
4. Log success or failure for each product
