#!/bin/bash
# Quick deployment script for Luigi demo

set -e

echo "🚀 Deploying Keenetic Demo for Luigi..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the project root:"
    echo "cd /data/.openclaw/workspace-katy/luigi-demo-standalone && bash deploy.sh"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js not installed"
    echo "Please install Node.js v18 or higher"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
    echo ""
fi

# Test build locally first
echo "🔨 Testing build..."
npm run build
echo ""
echo "✅ Build successful!"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""
echo "⚠️  During deployment:"
echo "   - Project name: keenetic-demo-luigi (or your choice)"
echo "   - Link to existing? NO"
echo "   - Override settings? NO"
echo ""
read -p "Press Enter to continue..."

vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Go to https://vercel.com/dashboard"
echo "   2. Select your project"
echo "   3. Settings → Deployment Protection"
echo "   4. Enable Password Protection"
echo "   5. Set password: keenetic2026"
echo ""
echo "🎉 Done! Share the URL + password with Luigi."
