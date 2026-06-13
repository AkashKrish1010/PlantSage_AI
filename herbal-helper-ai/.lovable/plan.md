

# 🌿 VanaVaidya — AI Medicinal Plant Identifier & Home Remedy Guide

## Design Vision
**Earthy & Natural** aesthetic — rich greens, warm browns, botanical textures, soft shadows, and organic rounded shapes. Think of a beautiful herbal journal brought to life digitally. Immersive micro-animations throughout (page transitions, parallax scrolling, plant cards that bloom on hover, pulse effects on tap).

---

## Pages & Features

### 1. 🏠 Home / Landing Screen
- Full-screen hero with animated botanical illustration background (parallax effect)
- Tagline: *"India's 8,000 Medicinal Plants, In Your Pocket"*
- Two prominent action buttons: **"Identify a Plant"** and **"Search by Symptom"**
- Quick-access carousel of **Featured Plants of the Day**
- Bottom navigation bar (mobile-first): Home, Identify, Search, Garden, More

### 2. 📷 Plant Identifier (Camera/Upload)
- Full-screen camera-style UI with a capture button
- Option to upload photo from gallery
- After "capture," show an animated scanning effect (pulse rings over the image)
- Display identification result card sliding up with:
  - Plant name (common + botanical)
  - AYUSH-recognized badge or Folklore tag
  - Medicinal uses summary
  - Which part to use (leaf/root/bark/flower) with icons
  - **⚠️ Toxic Lookalike Warning** if applicable (red banner)
- *Note: Initially uses sample/mock data. Real AI vision integration planned for Phase 2.*

### 3. 🔍 Symptom Search ("What Plant Cures This?")
- Search bar with autocomplete for common symptoms (headache, cold, digestion, skin issues, etc.)
- Results page showing matching medicinal plants as beautiful cards
- Each card shows: plant image, name, remedy preparation method, difficulty level
- Filter chips: Body system, preparation type (tea/paste/oil), verified vs. folklore
- Cards animate in with staggered fade-up effect

### 4. 🌱 Plant Encyclopedia / Database
- Browsable grid/list of 50+ key medicinal plants (expandable over time)
- Category filters: By body system, by plant type, by region
- Each plant detail page includes:
  - High-quality plant imagery
  - Botanical name, common names, family
  - **Doctor-Verified** vs **Traditional Folklore** badges
  - Medicinal properties and uses
  - Home preparation instructions (step-by-step with icons)
  - Which parts to use
  - Dosage guidelines and cautions
  - Toxic lookalike section with comparison images
- Smooth page transitions and scroll-triggered animations

### 5. 🏡 Virtual Herbal Garden (Simplified)
- Interactive scrollable showcase of categorized plant collections
- Beautifully illustrated plant cards arranged in a "garden path" layout
- Tap a plant to see it "grow" with an animation and reveal details
- Categories: Kitchen Garden, Immunity Boosters, Skin Care, Digestive Health
- *(3D walkthrough and regional audio planned for future phase)*

### 6. ℹ️ More / About
- About the app and AYUSH ministry context
- Safety disclaimer
- How to read the Doctor-Verified vs Folklore badges
- Contact / feedback

---

## Key UX Details
- **Mobile-first** responsive design optimized for phones
- **Immersive animations**: page transitions (slide/fade), scroll-triggered reveals, plant cards that "bloom" on interaction, pulsing scan effect, staggered list animations
- **Forager Safety**: toxic lookalikes prominently warned with red accents
- **Trust Signals**: clear Doctor-Verified ✅ vs Traditional Use 📜 badges on every remedy
- **No backend required initially** — all plant data stored as local JSON; accounts and saved history deferred to Phase 2

---

## Data Approach
- Curated dataset of ~50 medicinal plants with detailed information, images, and remedies built into the app
- Mock AI identification flow with realistic UI/UX
- Ready to connect to Lovable AI (Gemini vision model) for real plant identification in the next phase

