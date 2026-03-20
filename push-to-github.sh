#!/bin/bash
# Run this from your laptop after downloading the demo

echo "🚀 Pushing Alimentaria Demo to GitHub..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this from the alimentaria-demo directory"
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git..."
    git init
    git add .
    git commit -m "Alimentaria 2026 demo - Piero Pini AI assistant (Ferrarini + Litera Meat)"
fi

# Add remote
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/Eternitai01/ai2me-alimentaria-demo.git 2>/dev/null || echo "Remote already exists"

# Push
echo "☁️  Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Pushed to GitHub!"
echo ""
echo "🌐 Next: Deploy on Vercel"
echo "   Visit: https://vercel.com/new"
echo "   Import: Eternitai01/ai2me-alimentaria-demo"
echo "   Click Deploy"
