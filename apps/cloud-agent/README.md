# Cloud Agent - AI Dev Tools Update Scraper

This is the Oz cloud agent that automatically scrapes updates from AI development tools every 24 hours.

## What It Does

Scrapes updates from:
- **Google Antigravity** - AI-powered IDE
- **Cursor** - AI code editor
- **Warp** - Agentic terminal
- **Claude Code** - Terminal-based coding tool

## How It Works

1. Runs every 24 hours (configured via Oz cron schedule)
2. Scrapes each product's changelog/releases
3. Extracts key information (title, date, highlights, version)
4. Posts all updates to the backend API via `/api/updates/bulk`

## Environment Variables

Required:
- `BACKEND_API_URL` - Your deployed API endpoint (e.g., `https://your-app.vercel.app/api`)
- `BACKEND_API_KEY` - Secret key for API authentication

Optional:
- `GITHUB_TOKEN` - GitHub personal access token for better rate limits

## Local Testing

```bash
# Install dependencies
npm install

# Set environment variables
export BACKEND_API_URL=http://localhost:3000/api
export BACKEND_API_KEY=your-test-key

# Run the agent
npm start
```

## Deployment to Oz

1. Push this code to GitHub
2. In Warp, configure Oz cloud agent:
   - **Name**: `ai-devtools-update-scraper`
   - **Repo**: `your-username/ai-devtools-tracker`
   - **Docker Image**: `node:20-bookworm`
   - **Setup Commands**: `npm install && cd apps/cloud-agent && npm install`
   - **Run Command**: `cd apps/cloud-agent && npm start`
   - **Schedule**: `0 9 * * *` (9 AM UTC daily)
   - **Secrets**: Add `BACKEND_API_URL` and `BACKEND_API_KEY`

## Scrapers

### GitHub-based (Warp, Claude Code)
Uses GitHub Releases API to fetch latest releases. Reliable and structured data.

### Web-based (Cursor, Antigravity)
Uses web scraping with fetch + cheerio. May need updates if website structure changes.

## Extending

To add a new product:

1. Create a new scraper in `src/scrapers/your-product.ts`
2. Implement the `ScraperResult` interface
3. Add it to the scrapers list in `src/index.ts`
4. Update the `Product` enum in `shared-types`
