# 🚀 Deployment Guide

Follow these steps to deploy your AI Dev Tools Tracker to production.

## ✅ Completed: Steps 1-5

You've built a complete application! Now let's deploy it.

---

## Step 6: Push to GitHub (2 minutes)

```bash
# Create a new repo on GitHub:
# Go to https://github.com/new
# Repository name: ai-devtools-tracker
# Visibility: Public or Private (your choice)
# DON'T initialize with README (we have one)

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/ai-devtools-tracker.git
git push -u origin main
```

---

## Step 7: Deploy to Vercel (10 minutes)

### 7.1 Create Supabase Database

1. Go to https://supabase.com → Sign in with GitHub
2. Click "New Project"
3. Fill in:
   - **Name**: `ai-devtools-tracker`
   - **Database Password**: Generate strong password (SAVE IT!)
   - **Region**: Choose closest to you
4. Wait ~2 minutes for project to be ready
5. Go to **Settings** → **Database** → **Connection String**
6. Copy the "URI" format (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```
7. Replace `[YOUR-PASSWORD]` with your actual password
8. **SAVE THIS STRING** - you'll need it!

### 7.2 Deploy to Vercel

1. Go to https://vercel.com → Sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your `ai-devtools-tracker` repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. **Environment Variables** - Add these:
   ```
   DATABASE_URL = postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
   AGENT_API_KEY = [Generate with: openssl rand -hex 32]
   ```

6. Click "Deploy"
7. Wait ~3 minutes
8. Your site is live! Copy the URL (e.g., `https://ai-devtools-tracker.vercel.app`)

### 7.3 Run Database Migrations

```bash
# Install Supabase CLI (optional but recommended)
brew install supabase/tap/supabase

# Or run migrations from your machine:
cd packages/database

# Set your DATABASE_URL
export DATABASE_URL="postgresql://postgres:..."

# Run migrations
npx prisma migrate dev --name init
npx prisma generate
```

### 7.4 Test Your Deployment

Visit your Vercel URL:
- Homepage: `https://your-app.vercel.app`
- Updates page: `https://your-app.vercel.app/updates`
- API test: `https://your-app.vercel.app/api/stats`

---

## Step 8: Configure Oz Cloud Agent (10 minutes)

### 8.1 Generate API Key

```bash
openssl rand -hex 32
# Output: 7f4a9b2c8e1d3f6a... (SAVE THIS!)
```

### 8.2 Configure in Warp

1. Open Warp terminal
2. Go to Oz cloud agents section
3. Click "Create new agent" or "Start a new Oz cloud agent"
4. Fill in the form:

**Name:**
```
ai-devtools-update-scraper
```

**Description:**
```
Automatically scrapes updates from Antigravity, Cursor, Warp, and Claude Code every 24 hours
```

**Repo(s):**
```
your-username/ai-devtools-tracker
```

**Docker Image Reference:**
```
node:20-bookworm
```

**Setup Command(s):**
```bash
npm install && cd apps/cloud-agent && npm install
```

**Schedule** (Cron):
```
0 9 * * *
```
(This runs at 9 AM UTC every day)

**Secrets** (Add these):
```
BACKEND_API_URL=https://your-app.vercel.app/api
BACKEND_API_KEY=your-generated-key-from-step-8.1
GITHUB_TOKEN=optional-for-better-rate-limits
```

5. Click "Create environment" or "Deploy"

### 8.3 Test the Agent

Run the agent manually first to test:
1. In Warp Oz interface, find your agent
2. Click "Run now" or trigger manually
3. Check logs to see if it runs successfully
4. Verify updates appear on your website

---

## ✅ Verification Checklist

- [ ] Website loads at your Vercel URL
- [ ] Homepage displays correctly
- [ ] /updates page loads (might be empty initially)
- [ ] Database migrations ran successfully
- [ ] Oz agent configured in Warp
- [ ] Agent runs successfully
- [ ] Updates appear on website after agent run

---

## 🎉 You're Done!

Your AI Dev Tools Tracker is now:
- ✅ Deployed on Vercel
- ✅ Connected to Supabase PostgreSQL
- ✅ Running an automated agent every 24 hours
- ✅ Tracking updates from 4 AI development tools

---

## 📊 What Happens Next

1. **Every 24 hours** (9 AM UTC), the Oz agent will:
   - Scrape Warp GitHub releases
   - Scrape Claude Code GitHub releases
   - Scrape Cursor changelog
   - Check Antigravity updates
   - Post new updates to your database

2. **Your website** will:
   - Display all updates in chronological order
   - Allow filtering by product
   - Enable searching across all updates
   - Show latest statistics

---

## 🔧 Maintenance

### View Agent Logs
- In Warp → Oz → Your agent → View logs

### Manually Trigger Agent
- In Warp → Oz → Your agent → Run now

### Update Agent Code
1. Make changes locally
2. Commit and push to GitHub
3. Agent auto-updates on next run

### Monitor Database
- Supabase Dashboard → Table Editor → `updates` table

---

## 🐛 Troubleshooting

### Website shows "No updates found"
- Run the agent manually first
- Check agent logs for errors
- Verify DATABASE_URL is correct

### Agent fails to run
- Check agent logs in Warp
- Verify BACKEND_API_KEY matches
- Ensure BACKEND_API_URL is correct (include /api)

### Database connection error
- Verify DATABASE_URL in Vercel
- Check Supabase project is running
- Ensure migrations were run

### API returns 401 Unauthorized
- Check AGENT_API_KEY matches in both places
- Regenerate key if needed
- Update in Vercel AND Oz agent

---

## 🎯 Success Metrics

After 24-48 hours, you should see:
- 10-20 updates from Warp
- 10-20 updates from Claude Code
- 1-5 updates from Cursor
- 1-3 updates from Antigravity

---

## 📚 Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Warp Oz Docs**: https://docs.warp.dev/agents
- **Prisma Docs**: https://prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🚀 Next Steps (Optional)

1. Add custom domain in Vercel
2. Set up email notifications
3. Add more products to track
4. Implement RSS feeds
5. Add analytics
6. Create browser extension

---

**Congratulations! Your AI Dev Tools Tracker is live!** 🎊

Share it with the community and track those AI tool updates effortlessly!
