# Symptom Search Integration - VanaVaidhya

## Overview
The search functionality now uses the **AyurGenixAI_Dataset.xlsx** to map symptoms to Ayurvedic plant remedies with actual plant images.

## Implementation Details

### 1. Dataset Integration
- **Source**: AyurGenixAI_Dataset.xlsx (446 diseases/symptoms)
- **Format**: Converted to JSON for React Native compatibility
- **Location**: `VanaVaidhya/src/data/ayurgenix_data.json`

### 2. Key Features

#### Symptom Mapping
- Users can search by disease name (e.g., "Cough", "Fever", "Headache")
- Search matches against disease names and symptom descriptions
- Returns plants with verified images from the Medicinal Plant Dataset

#### Plant Recommendations Include:
- ✅ Plant name and image
- ✅ Disease being treated
- ✅ Symptoms addressed
- ✅ Ayurvedic formulation/dosage
- ✅ How it helps
- ✅ Doshas information
- ✅ Diet and lifestyle recommendations
- ✅ Yoga/physical therapy suggestions
- ✅ Prevention tips
- ✅ Cautions/complications

### 3. Available Plants (40 total)
Plants with images from Indian Medicinal Leaves Dataset:
- Tulasi, Ashwagandha, Neem, Brahmi, Amla
- Mint, Curry_Leaf, Lemon, Rose, Hibiscus
- Aloevera, Pomegranate, Pepper, Basale, Pappaya
- And 25 more medicinal plants...

### 4. Files Modified/Created

#### New Files:
1. `src/data/ayurgenix_data.json` - Complete dataset (446 entries)
2. `src/services/symptomMappingService.ts` - Search and mapping logic
3. `src/data/plantImages.ts` - Plant image registry

#### Modified Files:
1. `app/search.tsx` - Updated to use local dataset
2. `app/index.tsx` - Added plant images to home screen

### 5. Example Searches

**Cough** → Returns: Tulsi, Ashwagandha, Neem, Amla
**Fever** → Returns: Tulsi, Neem, Ashwagandha, Amla
**Headache** → Returns: Brahmi, Ashwagandha, Neem, Peppermint

### 6. Technical Architecture

```
User enters symptom
    ↓
symptomMappingService.searchBySymptom()
    ↓
Match against 446 diseases
    ↓
Extract Ayurvedic herbs
    ↓
Normalize plant names
    ↓
Filter plants with images
    ↓
Return recommendations with images
```

### 7. Benefits

✅ **Offline Capability**: No API dependencies
✅ **Instant Results**: Local dataset search
✅ **Visual Identification**: Real plant images
✅ **Comprehensive Info**: Full Ayurvedic details
✅ **AYUSH Compliant**: Based on verified dataset
✅ **Cultural Authenticity**: Indian medicinal tradition

## Testing

Run the app and try these searches:
- "Cough" - Shows 4 plants
- "Fever" - Shows 4 plants  
- "Headache" - Shows 4 plants
- "Skin" - Shows multiple plant options

## Future Enhancements

- [ ] Add fuzzy search for symptom matching
- [ ] Include synonyms (Hindi/Marathi names)
- [ ] Add more plant images
- [ ] Filter by season/dosha
- [ ] Save favorite remedies
