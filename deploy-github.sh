#!/bin/bash
# Push to GitHub and deploy via Vercel

echo "🚀 Deploying Alimentaria 2026 Demo..."

cd /data/.openclaw/workspace-amaya/alimentaria-2026/ai2me-alimentaria-demo

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Installing..."
    # Install gh if needed (uncomment based on your system)
    # sudo apt install gh  # Debian/Ubuntu
    # brew install gh      # macOS
fi

# Create and push to GitHub
echo "📦 Creating GitHub repository..."
gh repo create ai2me-alimentaria-demo --public --source=. --remote=origin --push

echo "✅ Pushed to GitHub!"
echo ""
echo "🌐 Next step: Import to Vercel"
echo "   1. Visit: https://vercel.com/new"
echo "   2. Import: Eternitai01/ai2me-alimentaria-demo"
echo "   3. Click Deploy"
echo ""
echo "   OR run: vercel --prod"
