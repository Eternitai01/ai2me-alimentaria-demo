# Quick Deploy to Vercel

## Option 1: Deploy via Vercel CLI (Fastest)

```bash
cd /data/.openclaw/workspace-amaya/alimentaria-2026/ai2me-alimentaria-demo

# Login to Vercel (one-time)
vercel login

# Deploy to production
vercel --prod
```

---

## Option 2: Deploy via Vercel Web (Easiest)

### Step 1: Push to GitHub

```bash
cd /data/.openclaw/workspace-amaya/alimentaria-2026/ai2me-alimentaria-demo

# Create GitHub repo (if not exists)
gh repo create ai2me-alimentaria-demo --public --source=. --remote=origin --push
```

### Step 2: Import to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `Eternitai01/ai2me-alimentaria-demo`
4. Click "Deploy"

**Done!** Vercel auto-detects Vite and deploys in ~2 minutes.

---

## Option 3: Manual Vercel Web Upload

1. Go to: https://vercel.com/new
2. Drag & drop the `dist/` folder
3. Deploy

---

## After Deployment

Your demo will be live at:
```
https://ai2me-alimentaria-demo.vercel.app
```

### Test URLs:
- Landing: https://ai2me-alimentaria-demo.vercel.app/
- Ferrarini: https://ai2me-alimentaria-demo.vercel.app/ferrarini
- Litera Meat: https://ai2me-alimentaria-demo.vercel.app/litera-meat

---

## Custom Domain (Optional)

Add custom domain in Vercel dashboard:
- alimentaria.ai2me.com
- piero.ai2me.com
- demo.ai2me.com

---

**Need help?** Run `vercel --help` or visit https://vercel.com/docs
