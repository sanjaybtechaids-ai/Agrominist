AGRONOMIST
Smart Farming. Better Decisions. Fair Markets.

Multilingual AI-powered agricultural advisory and direct farmer-to-customer marketplace.

1. Product specifications
A. Main user roles
There will be two different user experiences.

Farmer

Primary user
- Manage land
- Receive crop suggestions
- Monitor weather
- Calculate expenses and revenue
- Sell agricultural products


Customer

Marketplace user
- Explore products
- Search nearby farmers
- Compare prices
- Contact farmers
- Purchase directly



B. Farmer registration and onboarding
The onboarding process should collect the following information.
Field	Requirement
Farmer name	Required
Date of birth	Required
Phone number	Required
Profile image	Optional
Land area	Required
Land measurement	Acre / Cent / Hectare
Available workers	Optional
Farming type	Individual / Family / Workers
Farming schedule	Full-time / Part-time
Location	GPS permission
Soil type	Known / Unknown
Irrigation facility	Optional
Existing crops	Optional
Preferred language	Required

Important: GPS permission should be requested with a clear explanation. Allow manual location entry if permission is denied.

Store the profile in the server database and maintain a secure local cache for offline access. Avoid keeping sensitive personal information in unrestricted browser local storage.
C. Main farmer dashboard
The dashboard should have six major sections.
Farmer dashboard – UI structure
Core screen

Good morning, Farmer!

Your land and farming overview
32°C
Temperature

68%
Humidity

Rain expected
Forecast information

2 Acres
Registered land



Today's agricultural advisory

Sample recommendation based on weather and land information.
Crop recommendation

Consider suitable crops based on soil, season, irrigation and market demand.

Illustrative dashboard concept. Values are sample data, not live measurements.
D. Dashboard modules
Module	Features
Land Information	Location, temperature, humidity, rainfall, soil, irrigation
Crop Suggestions	Suitable crops, planting dates, harvesting dates
Fertilizer Advisory	Organic and chemical fertilizer estimates, dosage and cost
After Harvesting	Land restoration, crop rotation, soil improvement
Marketplace	Sell vegetables, fruits and other produce
Analytics	Farming expenses, estimated revenue, profit and yield

E. Smart land division
This is one of the strongest features of your idea.

For example, a farmer owns 2 acres.
Land allocation planner
2.00 Acres



Plot A
1 Acre

Crop A


Plot B
1 Acre

Crop B



Expected outcome comparison
- Estimated yield per crop
- Expected cultivation expenses
- Fertilizer and water requirements
- Expected selling price
- Estimated gross revenue
- Estimated profit

The farmer should also be able to choose:
- 100% land for one crop.
- 50% + 50% for two crops.
- 40% + 30% + 30% for three crops.
- Custom land allocation.
The system must ensure that the total allocated area never exceeds the registered land area.
F. Fertilizer advisory
Show separate categories:
1. Organic fertilizers – compost, vermicompost, farmyard manure, green manure.
2. Chemical fertilizers – NPK, urea, DAP and other suitable products.
3. Soil improvement – micronutrients, pH correction and organic matter.
Display:
- Recommended quantity per acre.
- Total quantity for selected plot.
- Estimated cost.
- Application timing.
- Application precautions.
Do not generate fertilizer dosages from soil type alone. Accurate nutrient recommendations require soil-test values and crop-specific guidance.
G. After-harvesting advisory
This module should help farmers prepare their land for the next cultivation cycle.

Features:
- Previous crop information.
- Soil nutrient depletion indicators.
- Recommended crop rotation.
- Residue management.
- Compost and organic matter suggestions.
- Land preparation.
- Water and soil conservation.
- Recommended next crop.
H. Farmer marketplace
Farmer selling interface
- Upload multiple product images.
- Product name and category.
- Quantity available (kg / quintal / piece).
- Price per unit.
- Harvest date.
- Product description.
- Contact number.
- Automatically fetch location from profile.
- Manually change selling location.
- Own market availability: Yes / No.
- Pickup or delivery availability.
Customer interface
- Search by product.
- Filter by location.
- Sort by price.
- View farmer information.
- View product availability.
- Contact farmer directly.
For the first version, use direct farmer-customer contact rather than implementing payment gateways and delivery management immediately.

2. Recommended technology stack
For your frontend-first development, I recommend:
Layer	Technology
Framework	Next.js 15+ App Router
Language	TypeScript
UI	React
Styling	Tailwind CSS
Components	shadcn/ui
Icons	Lucide React
Charts	Recharts
Maps	Leaflet / React Leaflet
State management	Zustand
Forms	React Hook Form + Zod
Storage (initial)	IndexedDB / local cache
API integration	Fetch / Axios
Deployment	Vercel

This stack keeps the project modular and makes future backend integration easier.
3. Future AI and agricultural data architecture
Although you are developing the frontend first, design it around these future services.
AGRONOMIST APPLICATION
Farmer / Customer / Admin

Frontend – Next.js
Dashboard · Land · Advisory · Marketplace

Backend API + AI Recommendation Engine
Authentication · Database · Analysis · AI

Weather

IMD / forecast

Soil

Soil test / Soil Health Card

Mandi

Agmarknet / e-NAM

Satellite

Remote sensing / GIS

AI

Crop recommendations

Voice

Regional languages



Important technical distinction: GPS location cannot reliably determine the exact soil chemical composition or water-holding capacity. Soil testing is needed for accurate NPK, pH and micronutrient values. Soil maps and satellite data can provide estimates, but the interface should identify estimated versus measured information.

Similarly, use actual available IMD data for weather integration, and verified mandi price sources for market estimates. Don't present mock data as live data.
4. Frontend development – master prompt
This is the prompt I recommend using in Cursor, Claude Code, Windsurf or another AI coding assistant.

The goal is to generate a complete, polished frontend, not just a landing page or static dashboard.