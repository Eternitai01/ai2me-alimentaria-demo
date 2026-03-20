#!/bin/bash
# Quick deploy script for Alimentaria demo

echo "🚀 Deploying AI2me Alimentaria 2026 Demo to Vercel..."

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build first
echo "🔨 Building production bundle..."
npm run build

# Deploy
echo "☁️  Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📋 Next steps:"
echo "   1. Test both demos: /ferrarini and /litera-meat"
echo "   2. Share URLs with Carlos"
echo "   3. Prepare pitch deck for Alimentaria"
