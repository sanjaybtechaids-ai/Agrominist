# Agronomist
> **Smart Farming. Better Decisions. Fair Markets.**

Agronomist is a multilingual, AI-powered agricultural advisory and direct farmer-to-consumer marketplace web application designed primarily for Indian farmers. It delivers precision agro-climatic advisories, certified soil nutrient plans, multi-plot land division simulations, and a direct marketplace to connect producers with consumers and retail buyers at fair prices.

---

## 🌾 Key Feature Modules

### 1. Authentication & Demo Role Switching
- **Farmer Demo:** `farmer@agronomist.demo` / `Farmer@123` → Redirects to Farmer Dashboard
- **Customer Demo:** `customer@agronomist.demo` / `Customer@123` → Redirects to Customer Marketplace
- One-click quick demo buttons for evaluators, judges, and investors
- Role switcher accessible directly in the top navigation profile dropdown
- Supabase Auth API with database-enforced role/ownership policies once configured

### 2. Multi-Step Farmer Onboarding
- **Step 1:** Personal Information (Full name, phone, date of birth, profile image upload, preferred language)
- **Step 2:** Land & Soil Parameters (Acreage in Acre/Cent/Hectare, GPS location permission & manual entry for Tamil Nadu village/district, soil type, irrigation facilities, existing crops)
- **Step 3:** Farming Operations (Individual / Family / Worker-assisted, full-time / part-time, available worker count, direct selling availability)
- Progressive validation with skip options for non-mandatory fields

### 3. Comprehensive Farmer Dashboard
- **Real-time Agro-Climatic Header:** Current temperature (31°C), humidity (74%), rainfall expectation (12.5mm), soil health status
- **7-Day Agro-Weather Forecast:** Interactive Recharts area chart showing daily maximums, minimums, and precipitation
- **Actionable Agricultural Advisory:** Climate-triggered suggestions (e.g., pausing fertilizer broadcasting prior to incoming rainfall)
- **AI Recommended Crops:** Quick match scores and economic summaries
- **Farming Activity Timeline:** Crop growth milestones and pending field tasks

### 4. Smart Land Management & Division Planner
- **Interactive Field Map:** Visual parcel layout of registered land (e.g. 2.0 Acres in Kallaperambur, Thanjavur)
- **Certified Soil Health Card:** Measured vs. estimated NPK levels (N: 245 kg/ha, P: 22 kg/ha, K: 290 kg/ha), pH 6.8, and moisture metrics
- **Multi-Plot Division Planner:**
  - Divide land into multiple plots (e.g., Plot A = 1 Acre Samba Paddy + Plot B = 1 Acre Black Gram)
  - Interactive allocation presets: Single Crop (100%), Dual Crop (50% + 50%), Tri-Crop (40% + 30% + 30%), or Custom
  - Live allocation pie chart visualizer
  - Strict boundary validation preventing allocation from exceeding total farm acreage
  - Financial outcomes projection: Calculated estimated yield, cultivation expenses, gross revenue, and net profit

### 5. Crop Suggestion & Comparison Matrix
- **Intelligent Crop Advisory:** Recommends regional varieties (Samba Ponni Paddy, Black Gram VBN 8, Sesame TMV 7, Okra, Turmeric, Poovan Banana)
- **Multi-Filter System:** Filter by Season (Kharif, Rabi, Zaid, All-Season), Category, and Water Requirement; sort by Suitability, Profit, or Duration
- **Side-by-Side Crop Comparison:** Compare 2-3 crops across yield, duration, input cost, gross revenue, and net profit
- **Scientific Disclaimers:** Transparent distinction between model projections and certified outcomes

### 6. Fertilizer & Soil Nutrition Advisory
- **Dual Categorization:** Organic fertilizers (Vermicompost, FYM, Green Manure) and Chemical/Mineral fertilizers (Urea, DAP, NPK 20:20:0:13, Zinc Sulphate)
- **Interactive Cost Calculator:** Dynamically recalculate dosages and costs for specific plots (1 Acre, 0.5 Acre, or entire farm)
- **Application Schedule & Safety:** Clear timing (basal vs top-dressing) and critical precautions (e.g., never mix Zinc with Phosphates)
- **Provisional Dosage Alerts:** Emphasizes reliance on lab soil test verification

### 7. Post-Harvest & Soil Restoration Module
- **Harvest History Tracking:** Previous crop records and completion dates
- **Zero Stubble Burning:** In-situ mulching recommendations, bio-decomposer spray, and anti-burning legal notices
- **Crop Rotation Advisory:** Pulse relay cropping (Black Gram) for atmospheric nitrogen fixation (+40 kg N/ha)
- **5-Phase Post-Harvest Timeline:** Visual stepper from Stubble Mulching to Secondary Tillage and Next Planting

### 8. Direct Farmer-to-Consumer Marketplace
- **Farmer Interface:** Create listings with photo previews, categories, units (kg, quintal, bag), prices, harvest dates, and delivery options; manage active listings, mark as sold, and view buyer leads
- **Customer Interface:** Search produce, filter by district (Thanjavur, Coimbatore, Madurai, Erode), sort by price, view farm details, and submit purchase inquiries directly to the farmer
- **Direct Engagement:** Direct telephone contacts and purchase negotiation without payment gateway transaction fees

### 9. Farming Financial Analytics
- Interactive Recharts bar and pie visualizations
- Breakdown of input costs: Seeds, Land Preparation, Fertilizer, Irrigation, Labour, and Crop Protection
- Historical 4-year trend tracking annual yields, gross revenues, and net farm margins

### 10. Multilingual Support & AI Voice Assistant
- **6 Supported Languages:** English, Tamil (தமிழ்), Hindi (हिन्दी), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം)
- **Voice Assistant:** Pulsating speech visualizer, regional query processing, speech audio simulation, and quick prompts for weather, fertilizer dosage, and mandi prices

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Agricultural Design System (Forest Green `#246B45`, Leaf Green `#4B9561`, Agri Background `#F7F9F6`)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **State Management:** Zustand with Local Storage persistence
- **Form Handling:** Controlled state with validation and user feedback
- **Architecture:** Clean component-based hierarchy with modular service abstraction layer (`/src/services/api/`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Tested on Node.js 24)
- npm or pnpm

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend setup

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; do not put service-role keys in browser variables.
3. Apply the ordered SQL files in `supabase/migrations/` using Supabase CLI or the SQL editor.
4. For local/development demo users only, apply `supabase/seed.sql`. Never run that file against production.
5. Restart `npm run dev` and sign in with the demo credentials below.

The new API expects a Supabase bearer access token and returns `{ data }` on success or `{ error: { code, message } }` on failure. Live weather, mandi, voice and AI data are intentionally unavailable until authorized providers are configured; the app must not treat sample data as live data.

### Building for Production
```bash
npm run build
npm run start
```

---

## 📋 Demonstration Credentials

| Role | Email | Password |
|---|---|---|
| **Farmer** | `farmer@agronomist.demo` | `Farmer@123` |
| **Customer** | `customer@agronomist.demo` | `Customer@123` |
