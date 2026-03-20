# AI2me Alimentaria 2026 Demo

**Meet Piero Pini, "Founder & Owner" 🎩**

Conversational AI Product Discovery for Food & Beverage Industry

Built for Alimentaria 2026 (Barcelona, March 24-27, 2026)

---

## The Agent: Piero Pini 🎩

Franco is your AI sommelier, procurement expert, and charcuterie connoisseur for Gruppo Pini brands. 
He knows every cut, every pairing, every certification, and speaks your language.

**Why "Founder & Owner"?**
- Personable: Buyers connect with people, not bots
- Memorable: "Talk to Franco" beats "try our AI tool"
- Brand storytelling: Franco embodies Gruppo Pini's Italian heritage & expertise

---

## Two Demos in One

### 1. **Ferrarini Demo** 🇮🇹  
Premium Italian charcuterie recommendation engine
- **Target audience:** Restaurants, hotels, gourmet retailers, distributors
- **Use case:** Product discovery, pairing recommendations, wholesale ordering
- **Features:**
  - Business type filtering (restaurant/hotel/retailer/distributor)
  - Volume-based pricing
  - Sommelier wine pairings
  - Cheese & menu pairing suggestions
  - DOP/Organic/Halal certifications

### 2. **Litera Meat Demo** 🥩  
B2B bulk pork export ordering assistant
- **Target audience:** Importers, processors, retail chains, food service
- **Use case:** Large-scale pork ordering, international export, logistics
- **Features:**
  - Volume-based bulk pricing (5-50+ tons)
  - Multi-cut selection (loin, shoulder, belly, ribs, offal)
  - Destination-specific recommendations (EU, China, Middle East, Americas)
  - Certification lookup (IFS, BRC, Halal, China GACC)
  - **Unique selling point:** Lowest EU tariffs to China (8.5% vs 13-25%)

---

## Technology Stack

- **Frontend:** React 18 + TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build:** Vite
- **Deployment:** Vercel (recommended)

---

## Local Development

```bash
cd /data/.openclaw/workspace-amaya/alimentaria-2026/ai2me-alimentaria-demo
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Deployment (Vercel)

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub + Vercel
1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Alimentaria 2026 demo"
   git remote add origin https://github.com/Eternitai01/ai2me-alimentaria-demo.git
   git push -u origin main
   ```
2. Import on Vercel dashboard: https://vercel.com/new
3. Select repository → Deploy

---

## Demo URLs (after deployment)

- **Main landing:** https://your-domain.vercel.app/
- **Ferrarini demo:** https://your-domain.vercel.app/ferrarini
- **Litera Meat demo:** https://your-domain.vercel.app/litera-meat

---

## How to Use at Alimentaria

### Scenario 1: Premium Brand / Restaurant Buyer
"Come see how Ferrarini uses AI to recommend perfect charcuterie selections and wine pairings!"
- Show Ferrarini demo
- Walk through: restaurant → 50-200kg/month → prosciutto + mortadella → wine pairings

### Scenario 2: B2B Exporter / Importer
"See how Litera Meat handles multilingual bulk orders with instant quotes!"
- Show Litera Meat demo
- Walk through: importer → 20 tons → loin + shoulder → China destination
- Highlight: **Lowest tariffs in EU to China**

### Scenario 3: Pitch to Food Exhibitors
"This is the same technology we used for [Keenetic at CES]. We can build this for YOUR brand in 2-4 weeks."

---

## Customization Guide

To add more companies/demos:

1. **Add company data:**
   ```typescript
   // src/data/companies.ts
   {
     id: 'new-company',
     name: 'Company Name',
     tagline: 'Your tagline',
     logo: '🏭',
     description: 'Brief description',
     type: 'retail' // or 'wholesale'
   }
   ```

2. **Create conversation flow:**
   ```typescript
   // src/data/newCompanySteps.ts
   export const newCompanySteps: FinderStep[] = [
     {
       id: 1,
       question: "Your question here",
       options: [...]
     },
     ...
   ];
   ```

3. **Add routing:**
   ```tsx
   // src/App.tsx
   <Route path="/new-company" element={<ProductFinder company="new-company" />} />
   ```

---

## Business Case (for exhibitors)

### ROI Calculation Example:
**Problem:** Restaurant buyer spends 10 minutes browsing catalog, doesn't find right product, leaves.

**Solution:** AI recommends perfect product in 2 minutes based on their needs.

**Impact:**
- 5x faster product discovery
- 30% higher conversion (customer gets confident recommendation)
- 24/7 availability (no waiting for sales team)

**Pricing:** €5K-15K setup + €500-1,500/month (depending on traffic)

If you convert just **10 extra customers/month at €500 average order** → €5,000/month revenue → **ROI in 1-2 months**

---

## Contact

**AI2me**  
Carlos Cuevas, Founder & CEO  
cc@eternitaigroup.com  
+34 673 572 343  
https://ai2me.com

Built by Amaya Sinclair (AI2me Chief of Staff)  
March 2026
