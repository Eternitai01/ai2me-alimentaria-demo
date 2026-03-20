# 🚀 Quick Start - Deploy in 5 Minutes

## Option A: Automated (Easiest)

```bash
cd /data/.openclaw/workspace-katy/luigi-demo-standalone
bash deploy.sh
```

Follow the prompts, then add password protection in Vercel dashboard.

---

## Option B: Manual

### 1. Install & Build

```bash
cd /data/.openclaw/workspace-katy/luigi-demo-standalone
npm install
npm run build
```

### 2. Deploy to Vercel

```bash
npm i -g vercel  # if not installed
vercel --prod
```

### 3. Add Password

1. Go to https://vercel.com/dashboard
2. Select **keenetic-demo-luigi** project
3. Settings → **Deployment Protection**
4. Enable **Password Protection**
5. Password: `keenetic2026`

---

## Test Locally First

```bash
npm run dev
```

Open http://localhost:5173

Test flow:
1. Select language (ESP/ENG/RUS/ITA)
2. Click "Find your router solution, Call me"
3. Enter: **Luigi** / **luigi@keenetic.com**
4. Click "Talk to Katy"
5. Verify Katy says: "Hi, Luigi, thank you for calling..."

---

## Demo Credentials

- **Password:** keenetic2026
- **Test Name:** Luigi
- **Test Email:** luigi@keenetic.com

---

## What Works

✅ Multi-language UI (ES/EN/IT/RU)
✅ Personalized voice greeting ("Hi, Luigi...")
✅ Yes/No branching conversation
✅ Discovery questions flow
✅ ElevenLabs Rachel voice (multilingual)
✅ Password-protected access

---

**Need help?** Check README.md for full details.
