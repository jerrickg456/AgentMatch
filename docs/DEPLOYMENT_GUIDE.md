# 🚀 AgentMatch — Deployment & Setup Guide

This guide covers running AgentMatch locally or deploying the full stack to production.

---

## 1. Quick Start (Local Demo)

The Next.js frontend has built-in fallback mock datasets including the 25 real people and simulations, allowing you to run and preview immediately without external cloud accounts:

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
- `/` — Interactive landing page
- `/input` — Link input & "Load 25 Real People" feature
- `/profiles` — Directory of 25 AI profiles
- `/profiles/[id]` — Deep persona with personality radar chart & source links
- `/dating` — Live agent dating simulation console
- `/rankings` — Ranked match leaderboard with dimension breakdown & AI reasoning

---

## 2. Production Deployment Stack

| Layer | Service | Recommendation |
|-------|---------|----------------|
| **Frontend** | [Vercel](https://vercel.com) | Zero-config Next.js 16 deployment |
| **Database** | [Supabase](https://supabase.com) | Managed Postgres + Realtime API |
| **Agent Engine** | [Railway](https://railway.app) | Self-hosted n8n instance |
| **AI Models** | [OpenAI](https://platform.openai.com) | GPT-4o & GPT-4o-mini |
| **LinkedIn Scraping**| [Bright Data](https://brightdata.com) / [Proxycurl](https://nubela.co/proxycurl) | Public profile extraction |
| **Instagram Scraping**| [Apify](https://apify.com) | Public Instagram scraper Actor |

---

## 3. Database Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Run the schema migration from `supabase/migrations/001_initial_schema.sql`.
4. (Optional) Run the seed migration from `supabase/migrations/002_seed_data.sql` to populate initial profiles and simulation results.
5. In your Supabase Project Settings, copy:
   - **Project URL**
   - **Anon Public API Key**
   - **Service Role Secret Key**

---

## 4. n8n Engine Setup (Single All-in-One Workflow)

Instead of managing multiple disparate workflows, AgentMatch provides **one single all-in-one workflow file** with native Groq Llama 3.3 70B and automatic multi-key fallback failover:

1. **Deploy n8n** on Railway, Cloud, or Docker:
   - [n8n on Railway Template](https://railway.app/template/n8n)
   - Or locally: `npx n8n`

2. **Import the Single Master Workflow**:
   - In n8n, click **Workflows → Import from file**
   - Select: `workflows/agentmatch-all-in-one.json`
   - All routing, scraping hooks, persona analysis, dating simulations, and 8-D scoring are unified in this single canvas!

3. **Configure Free Groq API Keys (with Fallback Failover)**:
   - Get 1 or more free API keys from [console.groq.com/keys](https://console.groq.com/keys)
   - In Railway or n8n environment variables:
     - `GROQ_API_KEY`: Your primary free Groq key
     - `GROQ_API_KEY_FALLBACK_1`: Your secondary free Groq key (auto-used if Key 1 hits 429 rate limit)
     - `GROQ_API_KEY_FALLBACK_2`: Optional 3rd key
     - `OPENAI_API_KEY`: Optional fallback if all Groq keys fail
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
     - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key

4. **Activate the Workflow**:
   - Toggle the switch in top right of the n8n canvas from **Inactive** to **Active**.
   - Your webhook endpoints (`/webhook/agentmatch`, `/webhook/analyze-profile`, etc.) are now live!

---

## 5. Frontend Deployment (Vercel)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete AgentMatch system with 25 real people and n8n workflows"
   git push origin main
   ```
2. Import the repository in [vercel.com](https://vercel.com).
3. Set the **Root Directory** to `frontend`.
4. Add the environment variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `N8N_WEBHOOK_BASE_URL`
5. Click **Deploy**.
