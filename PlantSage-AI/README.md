# 🌿 VanaVaidhya — Medicinal Plant Identification App

> Offline-first Ayurvedic plant identification · EfficientNetV2S · 96.6% accuracy · 71 Indian medicinal species

---

## Materials & Methods — System Flow

```
┌──────────────────────────┐
│   1. Dataset             │
│   7,755 real-world images│
│   22 plant classes       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   2. Preprocessing &     │
│      Augmentation        │
│   Resize · Flip · Zoom   │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   3. Model Training      │
│   EfficientNetV2S        │
│   Phase 1 → Phase 2      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   4. Model Converted     │
│   Mobile & Web ready     │
│   Plant names & metadata │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   5. Inference Server    │
│   EfficientNetV2S model  │
│   96.6% val / 98.4% TTA  │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   6. User Captures Image │
│   Camera or Gallery      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   7. Plant Identified    │
│   Top-5 predictions      │
│   Confidence score       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   8. View Details        │
│   AI-based uses &        │
│   remedies generated     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   9. AyurGenix Lookup    │
│   446 disease records    │
│   Bundled in-app         │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   10. Herb Detail Screen │
│   Diseases · Doshas      │
│   Formulations · Diet    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   11. Save to Garden     │
│   Save plant details &   │
│   location for future use│
└──────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | React Native + Expo (TypeScript) |
| ML Model | EfficientNetV2S (TensorFlow/Keras) |
| Inference Server | FastAPI + Uvicorn (Python) |
| Ayurvedic Data | AyurGenix — 446 records |
| Accuracy | 96.6% val · 98.4% TTA |
| Classes | 71 Indian medicinal plant species |

---

## Getting Started

```bash
# Mobile app
npm install && npx expo start

# ML inference server
python ml/server.py
```
