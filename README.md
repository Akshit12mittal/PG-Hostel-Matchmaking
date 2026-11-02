# RoomSync — Smart PG & Hostel Room Allocation and Roommate Matching Platform

> **Academic Project Prototype**  
> **Institution:** Indian Institute of Technology Madras (IIT Madras)  
> **Course:** Design Thinking for Data-Driven App Development (DTD-DAD)  
> **Topic:** PG/Hostel Room Allocation & Matching — A Smart Accommodation and Roommate Compatibility Platform  
> **Tagline:** *Find the Right Room. Meet the Right Roommate. Live Better.*

---

## 🌟 Executive Summary

**RoomSync** is an intelligent accommodation decision-support platform designed to eliminate the anxiety and friction students and young professionals face when seeking accommodation. Unlike conventional property-listing websites (which merely function as raw digital classifieds), RoomSync focuses on **transparent, multi-parameter matching** across budgets, campus distances, essential amenities, and co-living lifestyle habits.

```
                      ┌────────────────────────┐
                      │    RoomSync Platform   │
                      └───────────┬────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Tenant Portal   │    │  Host / PG Owner │    │ Admin Evaluator  │
│  - Match Quiz    │    │  - Occupancy KPI │    │  - DTD-DAD Triad │
│  - Room Scoring  │    │  - Recharts Data │    │  - User Audit    │
│  - 7-Factor RM   │    │  - Slot Visits   │    │  - Listings Mod  │
│  - Direct Booking│    │  - Live Vacancy  │    │  - Sandbox Reset │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## 🎯 Design Thinking Triad Alignment (IIT Madras DTD-DAD)

| Dimension | Real-World Challenge | RoomSync Technical & Design Solution |
| :--- | :--- | :--- |
| **Human Desirability** *(Score: 4.8/5)* | Weeks wasted walking sectors, predatory brokerage fees, and severe interpersonal conflict with randomly assigned roommates. | Transparent, explainable matching scores, 7-factor roommate harmony assessment, verified student profiles, and direct host enquiries. |
| **Business Viability** *(Score: 4.9/5)* | PG owners face long bed vacancy periods (often 30–60 days between semesters), high churn, and poor tenant fit. | Host Dashboard with Recharts occupancy analytics, proactive tenant matching, instant vacancy toggles, and direct visit slotting. |
| **Technical Feasibility** *(Score: 5.0/5)* | High server costs or unreliable black-box AI APIs lead to downtime and unverifiable recommendations. | Deterministic, rule-based client-side weighted algorithms executed in TypeScript, persisted in LocalStorage, deployable on Vercel. |

---

## ⚙️ Core Intelligent Matching Algorithms

### 1. Room Compatibility Engine (0 to 100 Score)
$$S_{\text{room}} = S_{\text{budget}} (30) + S_{\text{location}} (25) + S_{\text{roomType}} (15) + S_{\text{amenities}} (15) + S_{\text{lifestyle}} (10) + S_{\text{availability}} (5)$$

- **Budget Alignment (30%):** Full points when within the tenant's range; calibrated deductions for exceeding caps.
- **Campus Proximity (25%):** Proximity to Panjab University (PU), PEC Sector 12, Chandigarh University (CU), etc.
- **Room Sharing Match (15%):** Exact match for single, double, triple, or flexible sharing.
- **Essential Amenities (15%):** Ratio of requested facilities (Wi-Fi, AC, Attached Bath, Power Backup, Housekeeping) fulfilled.
- **Lifestyle & Rules (10%):** Dietary compliance (pure veg vs. shared kitchen), quiet hours, and gender accommodation.
- **Availability (5%):** Vacant beds and target move-in readiness.

### 2. 7-Factor Roommate Harmony Engine (0 to 100 Score)
$$S_{\text{roommate}} = S_{\text{sleep}} (20) + S_{\text{clean}} (20) + S_{\text{food}} (15) + S_{\text{noise}} (15) + S_{\text{social}} (15) + S_{\text{budget}} (10) + S_{\text{smoke}} (5)$$

- **Sleep Routine (20 pts):** Early sleeper vs. night owl synchrony.
- **Cleanliness Standards (20 pts):** Desk and shared space hygiene expectations.
- **Dietary Routine (15 pts):** Vegetarian, non-veg, vegan compatibility.
- **Noise Tolerance (15 pts):** Quiet study environment vs. social background music.
- **Social Energy (15 pts):** Introverted private time vs. balanced co-living.
- **Budget Parity (10 pts):** Aligned rent capacity and shared grocery split.
- **Smoking Policy (5 pts):** Strictly non-smoking shared spaces.

---

## 🗺️ Application Routes

### Public Pages
- `/` — Flagship landing page with hero, search bar, differentiators, featured listings, and Design Thinking banner.
- `/login` — 1-click interactive demo role switcher (Tenant, PG Owner, Evaluator).
- `/onboarding` — 5-step accommodation and roommate calibration quiz.

### Tenant Portal
- `/tenant/dashboard` — KPI summary cards, best matches, suggested roommates, and journey tracker.
- `/tenant/matches` — Dedicated allocation engine page with spotlight breakdown and sort filters.
- `/tenant/rooms` — Room discovery with multi-parameter filter sidebar (sectors, budget slider, amenities).
- `/tenant/rooms/[id]` — Detailed property view with image gallery, house rules, roommate preview, and enquiry modal.
- `/tenant/roommates` — Searchable roommate directory with 7-factor harmony radar and connection requests.
- `/tenant/compare` — Side-by-side room comparison table for up to 3 properties.
- `/tenant/requests` — Enquiries and physical visit tracking.
- `/tenant/preferences` — Live criteria adjustment recalibrating all scores.
- `/tenant/profile` — Verified student accommodation resume.

### PG Owner / Host Portal
- `/owner/dashboard` — Capacity KPIs (80 beds, 77.5% occupancy), Recharts analytics, and tenant matches.
- `/owner/rooms` — Property inventory with live vacant bed adjustments.
- `/owner/rooms/add` — Publisher to list new PG accommodations live into tenant discovery.
- `/owner/requests` — Landlord pipeline to accept, decline, or schedule physical visits.
- `/owner/tenants` — Prospective tenant applicant directory.

### Admin / Evaluator Portal
- `/admin/dashboard` — DTD-DAD academic evaluation overview, Design Thinking ratings, and cohort adoption graphs.
- `/admin/users` — Directory of registered student tenants and PG hosts.
- `/admin/listings` — Property inspection moderation and bed capacity records.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18+ (tested on Node v25.1.0)
- npm v10+

### Setup & Launch
```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser at
http://localhost:3000
```

### Production Build Validation
```bash
npm run build
npm run start
```

---
