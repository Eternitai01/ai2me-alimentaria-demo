# Push to GitHub & Deploy to Vercel

## Quick Steps (From Your Laptop)

### Step 1: Create GitHub Repo

Go to: https://github.com/new

- **Repository name:** `ai2me-alimentaria-demo`
- **Public** (or Private if you prefer)
- **Don't** add README, .gitignore, or license (we have those)
- Click "Create repository"

### Step 2: Get the Code on Your Laptop

Download from VPS:

```bash
# On VPS, copy from container to host
ssh root@76.13.142.77 "docker cp openclaw-4roq-openclaw-1:/data/.openclaw/workspace-amaya/alimentaria-2026/alimentaria-demo-CLEAN.tar.gz /root/"

# On your laptop, download
scp root@76.13.142.77:/root/alimentaria-demo-CLEAN.tar.gz ~/Downloads/

# Extract
cd ~/Downloads
mkdir alimentaria-demo
tar -xzf alimentaria-demo-CLEAN.tar.gz -C alimentaria-demo
cd alimentaria-demo
```

### Step 3: Push to GitHub

```bash
# Initialize git (already done, but just in case)
git init
git add .
git commit -m "Alimentaria 2026 demo - Piero Pini AI assistant"

# Add remote (use YOUR repo URL from GitHub)
git remote add origin https://github.com/Eternitai01/ai2me-alimentaria-demo.git

# Push
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

Go to: https://vercel.com/new

1. Click "Import Git Repository"
2. Select `Eternitai01/ai2me-alimentaria-demo`
3. Framework Preset: **Vite** (auto-detected)
4. Click **Deploy**

**Done!** Your demo will be live in ~2 minutes.

---

## Alternative: Use GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com
2. File → Add Local Repository → Select `alimentaria-demo` folder
3. Publish to GitHub
4. Go to Vercel → Import

---

## Demo URLs (After Deploy)

- **Landing:** https://your-project.vercel.app/
- **Ferrarini:** https://your-project.vercel.app/ferrarini
- **Litera Meat:** https://your-project.vercel.app/litera-meat

---

**Need help?** Just ping me in Telegram.
