export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  family: string;
  commonNames: string[];
  category: string[];
  bodySystem: string[];
  region: string[];
  partsUsed: { part: string; icon: string }[];
  medicinalProperties: string[];
  uses: string[];
  preparations: { method: string; type: string; difficulty: "Easy" | "Medium" | "Advanced"; steps: string[] }[];
  dosage: string;
  cautions: string[];
  verified: boolean;
  toxicLookalike?: { name: string; warning: string };
  symptoms: string[];
  imageUrl: string;
  description: string;
}

export const plants: Plant[] = [
  {
    id: "tulsi",
    name: "Tulsi",
    botanicalName: "Ocimum tenuiflorum",
    family: "Lamiaceae",
    commonNames: ["Holy Basil", "Tulasi", "Vrinda"],
    category: ["Herb", "Aromatic"],
    bodySystem: ["Respiratory", "Immune", "Digestive"],
    region: ["Pan-India"],
    partsUsed: [
      { part: "Leaves", icon: "🍃" },
      { part: "Seeds", icon: "🌰" },
      { part: "Root", icon: "🌱" }
    ],
    medicinalProperties: ["Adaptogenic", "Antimicrobial", "Anti-inflammatory", "Antioxidant"],
    uses: ["Cough & cold relief", "Stress reduction", "Immunity booster", "Digestive aid"],
    preparations: [
      {
        method: "Tulsi Tea",
        type: "Tea",
        difficulty: "Easy",
        steps: ["Pluck 8-10 fresh tulsi leaves", "Boil 2 cups of water", "Add leaves and simmer for 5 min", "Strain, add honey and ginger"]
      }
    ],
    dosage: "2-3 cups of tulsi tea daily, or 2-3 fresh leaves chewed in the morning",
    cautions: ["May lower blood sugar — diabetics should monitor", "Avoid excessive use during pregnancy"],
    verified: true,
    symptoms: ["cold", "cough", "stress", "immunity", "fever", "headache"],
    imageUrl: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=400&h=300&fit=crop",
    description: "The 'Queen of Herbs' in Ayurveda, Tulsi is revered for its healing properties and is found in almost every Indian household."
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    botanicalName: "Withania somnifera",
    family: "Solanaceae",
    commonNames: ["Indian Ginseng", "Winter Cherry", "Asgandh"],
    category: ["Shrub", "Root Medicine"],
    bodySystem: ["Nervous", "Immune", "Reproductive"],
    region: ["Rajasthan", "MP", "Gujarat", "Maharashtra"],
    partsUsed: [
      { part: "Root", icon: "🌱" },
      { part: "Leaves", icon: "🍃" }
    ],
    medicinalProperties: ["Adaptogenic", "Anti-stress", "Rejuvenating", "Immunomodulatory"],
    uses: ["Stress & anxiety relief", "Energy booster", "Sleep improvement", "Muscle strength"],
    preparations: [
      {
        method: "Ashwagandha Milk",
        type: "Decoction",
        difficulty: "Easy",
        steps: ["Add 1 tsp ashwagandha powder to warm milk", "Add a pinch of turmeric & cardamom", "Sweeten with jaggery or honey", "Drink before bedtime"]
      }
    ],
    dosage: "300-600mg root extract daily, or 1 tsp powder with warm milk",
    cautions: ["Avoid during pregnancy", "May interact with thyroid medications", "Start with lower doses"],
    verified: true,
    symptoms: ["stress", "anxiety", "insomnia", "fatigue", "weakness"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    description: "One of the most important herbs in Ayurveda, Ashwagandha has been used for over 3,000 years to relieve stress and increase energy."
  },
  {
    id: "turmeric",
    name: "Turmeric",
    botanicalName: "Curcuma longa",
    family: "Zingiberaceae",
    commonNames: ["Haldi", "Haridra", "Indian Saffron"],
    category: ["Rhizome", "Spice"],
    bodySystem: ["Digestive", "Immune", "Skin", "Musculoskeletal"],
    region: ["Pan-India", "South India", "Northeast"],
    partsUsed: [
      { part: "Rhizome", icon: "🫚" }
    ],
    medicinalProperties: ["Anti-inflammatory", "Antioxidant", "Antimicrobial", "Hepatoprotective"],
    uses: ["Joint pain relief", "Wound healing", "Skin glow", "Digestive health", "Anti-inflammatory"],
    preparations: [
      {
        method: "Golden Milk",
        type: "Decoction",
        difficulty: "Easy",
        steps: ["Warm 1 cup milk (any kind)", "Add 1/2 tsp turmeric powder", "Add a pinch of black pepper (enhances absorption)", "Add honey to taste, stir well"]
      },
      {
        method: "Turmeric Paste",
        type: "Paste",
        difficulty: "Easy",
        steps: ["Mix turmeric powder with water or coconut oil", "Apply to affected area", "Leave for 20 minutes", "Wash with warm water"]
      }
    ],
    dosage: "1/2 to 1 tsp powder daily with meals, always with black pepper",
    cautions: ["May stain skin and clothing", "High doses may upset stomach", "Consult doctor if on blood thinners"],
    verified: true,
    symptoms: ["inflammation", "joint pain", "skin issues", "digestion", "wound", "immunity"],
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
    description: "The golden spice of India, Turmeric is a cornerstone of both Indian cuisine and Ayurvedic medicine."
  },
  {
    id: "neem",
    name: "Neem",
    botanicalName: "Azadirachta indica",
    family: "Meliaceae",
    commonNames: ["Nimba", "Margosa", "Indian Lilac"],
    category: ["Tree", "Bitter Tonic"],
    bodySystem: ["Skin", "Immune", "Digestive", "Dental"],
    region: ["Pan-India"],
    partsUsed: [
      { part: "Leaves", icon: "🍃" },
      { part: "Bark", icon: "🪵" },
      { part: "Oil", icon: "💧" }
    ],
    medicinalProperties: ["Antibacterial", "Antifungal", "Blood purifier", "Antiparasitic"],
    uses: ["Skin disorders", "Blood purification", "Dental hygiene", "Pest control"],
    preparations: [
      {
        method: "Neem Leaf Paste",
        type: "Paste",
        difficulty: "Easy",
        steps: ["Grind fresh neem leaves with water", "Apply to affected skin area", "Leave for 15-20 minutes", "Wash off with lukewarm water"]
      }
    ],
    dosage: "2-3 neem leaves daily on empty stomach, or as directed",
    cautions: ["Bitter taste", "Not recommended for pregnant women", "May lower blood sugar"],
    verified: true,
    toxicLookalike: { name: "Melia azedarach (Chinaberry)", warning: "Chinaberry berries are toxic. Neem has smaller, elongated leaves compared to Chinaberry's broader leaflets." },
    symptoms: ["skin issues", "acne", "infection", "dental", "blood purification"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    description: "Called the 'Village Pharmacy,' Neem has been central to Indian medicine and daily life for centuries."
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    botanicalName: "Aloe barbadensis miller",
    family: "Asphodelaceae",
    commonNames: ["Ghritkumari", "Kumari", "Kathalai"],
    category: ["Succulent", "Herb"],
    bodySystem: ["Skin", "Digestive", "Immune"],
    region: ["Pan-India", "Rajasthan", "Gujarat"],
    partsUsed: [
      { part: "Gel", icon: "💧" },
      { part: "Leaves", icon: "🍃" }
    ],
    medicinalProperties: ["Cooling", "Moisturizing", "Laxative", "Wound healing"],
    uses: ["Burns & sunburn", "Skin moisturizer", "Digestive aid", "Hair care"],
    preparations: [
      {
        method: "Fresh Aloe Gel",
        type: "Topical",
        difficulty: "Easy",
        steps: ["Cut a fresh aloe leaf", "Scoop out the clear gel", "Apply directly to skin", "Leave for 20-30 minutes"]
      }
    ],
    dosage: "1-2 tbsp fresh gel daily, or apply topically as needed",
    cautions: ["Internal use may cause cramping", "Test on small skin area first", "Avoid yellow latex layer"],
    verified: true,
    symptoms: ["burns", "skin issues", "digestion", "hair fall", "sunburn"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    description: "Known as the 'Plant of Immortality,' Aloe Vera is one of the most versatile medicinal plants in the world."
  },
  {
    id: "amla",
    name: "Amla",
    botanicalName: "Phyllanthus emblica",
    family: "Phyllanthaceae",
    commonNames: ["Indian Gooseberry", "Amalaki", "Nellikai"],
    category: ["Tree", "Fruit"],
    bodySystem: ["Immune", "Digestive", "Skin", "Hair"],
    region: ["Pan-India", "UP", "Rajasthan"],
    partsUsed: [
      { part: "Fruit", icon: "🫐" }
    ],
    medicinalProperties: ["Antioxidant", "Vitamin C rich", "Rejuvenating", "Digestive"],
    uses: ["Immunity booster", "Hair growth", "Vitamin C supplement", "Anti-aging"],
    preparations: [
      {
        method: "Amla Juice",
        type: "Juice",
        difficulty: "Easy",
        steps: ["Wash and deseed 2-3 amla fruits", "Blend with 1 cup water", "Strain through cloth", "Add honey and drink on empty stomach"]
      }
    ],
    dosage: "1-2 fresh fruits daily or 1 tbsp amla juice",
    cautions: ["Sour taste may cause nausea on empty stomach initially", "May increase cold sensitivity"],
    verified: true,
    symptoms: ["immunity", "hair fall", "aging", "digestion", "vitamin deficiency"],
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
    description: "Amla is considered the richest natural source of Vitamin C and is a key ingredient in Chyawanprash."
  },
  {
    id: "brahmi",
    name: "Brahmi",
    botanicalName: "Bacopa monnieri",
    family: "Plantaginaceae",
    commonNames: ["Water Hyssop", "Nira-Brahmi", "Jal Brahmi"],
    category: ["Herb", "Aquatic"],
    bodySystem: ["Nervous", "Cognitive"],
    region: ["Pan-India", "Wetlands"],
    partsUsed: [
      { part: "Whole plant", icon: "🌿" },
      { part: "Leaves", icon: "🍃" }
    ],
    medicinalProperties: ["Nootropic", "Memory enhancer", "Anxiolytic", "Neuroprotective"],
    uses: ["Memory improvement", "Concentration", "Anxiety relief", "Cognitive support"],
    preparations: [
      {
        method: "Brahmi Tea",
        type: "Tea",
        difficulty: "Easy",
        steps: ["Take 1 tsp dried brahmi leaves", "Steep in hot water for 10 min", "Strain and add honey", "Drink 1-2 times daily"]
      }
    ],
    dosage: "300mg standardized extract daily, or 1 tsp powder",
    cautions: ["May cause drowsiness initially", "Start with low dose", "Not for children under 6 without guidance"],
    verified: true,
    symptoms: ["memory", "concentration", "anxiety", "stress", "cognitive"],
    imageUrl: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=400&h=300&fit=crop",
    description: "Named after Lord Brahma, this herb has been used in Ayurveda for centuries to sharpen the mind."
  },
  {
    id: "giloy",
    name: "Giloy",
    botanicalName: "Tinospora cordifolia",
    family: "Menispermaceae",
    commonNames: ["Guduchi", "Amrita", "Heart-leaved Moonseed"],
    category: ["Climber", "Vine"],
    bodySystem: ["Immune", "Digestive", "Respiratory"],
    region: ["Pan-India"],
    partsUsed: [
      { part: "Stem", icon: "🌿" },
      { part: "Leaves", icon: "🍃" }
    ],
    medicinalProperties: ["Immunomodulatory", "Antipyretic", "Anti-arthritic", "Hepatoprotective"],
    uses: ["Fever management", "Immunity booster", "Dengue support", "Chronic fever"],
    preparations: [
      {
        method: "Giloy Juice",
        type: "Juice",
        difficulty: "Medium",
        steps: ["Take a 6-inch piece of giloy stem", "Crush or blend with water", "Strain the juice", "Drink on empty stomach with honey"]
      }
    ],
    dosage: "20-30ml fresh juice or 500mg powder twice daily",
    cautions: ["May lower blood sugar significantly", "Excess use may cause constipation", "Identify correctly — lookalikes exist"],
    verified: true,
    toxicLookalike: { name: "Tinospora crispa", warning: "Similar-looking vine but with different leaf texture. Always verify the heart-shaped leaves of true Giloy." },
    symptoms: ["fever", "immunity", "dengue", "arthritis", "liver"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    description: "Known as 'Amrita' (nectar of immortality), Giloy gained massive popularity during the COVID-19 pandemic for immunity."
  },
  {
    id: "peppermint",
    name: "Pudina",
    botanicalName: "Mentha piperita",
    family: "Lamiaceae",
    commonNames: ["Peppermint", "Pudina", "Mint"],
    category: ["Herb", "Aromatic"],
    bodySystem: ["Digestive", "Respiratory"],
    region: ["Pan-India"],
    partsUsed: [
      { part: "Leaves", icon: "🍃" }
    ],
    medicinalProperties: ["Carminative", "Cooling", "Antispasmodic", "Decongestant"],
    uses: ["Indigestion relief", "Nausea control", "Headache relief", "Fresh breath"],
    preparations: [
      {
        method: "Mint Chutney",
        type: "Paste",
        difficulty: "Easy",
        steps: ["Blend fresh mint leaves with green chili", "Add lemon juice, salt, cumin", "Grind to smooth paste", "Serve with meals as digestive aid"]
      }
    ],
    dosage: "Fresh leaves in food or 1-2 cups mint tea daily",
    cautions: ["May worsen acid reflux in some people", "Peppermint oil is very strong — dilute always"],
    verified: true,
    symptoms: ["digestion", "nausea", "headache", "bloating", "bad breath"],
    imageUrl: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=400&h=300&fit=crop",
    description: "A kitchen staple that doubles as a powerful digestive aid and cooling herb in Indian traditional medicine."
  },
  {
    id: "shatavari",
    name: "Shatavari",
    botanicalName: "Asparagus racemosus",
    family: "Asparagaceae",
    commonNames: ["Wild Asparagus", "Satavar", "Shatamull"],
    category: ["Climber", "Root Medicine"],
    bodySystem: ["Reproductive", "Digestive", "Immune"],
    region: ["Pan-India", "Himalayan foothills"],
    partsUsed: [
      { part: "Root", icon: "🌱" }
    ],
    medicinalProperties: ["Galactagogue", "Adaptogenic", "Antioxidant", "Demulcent"],
    uses: ["Women's reproductive health", "Lactation support", "Digestive soothing", "Hormonal balance"],
    preparations: [
      {
        method: "Shatavari Milk",
        type: "Decoction",
        difficulty: "Easy",
        steps: ["Add 1 tsp shatavari powder to warm milk", "Add a pinch of cardamom", "Sweeten with honey or jaggery", "Drink twice daily"]
      }
    ],
    dosage: "1-2 tsp powder daily with milk or water",
    cautions: ["Avoid if allergic to asparagus family", "Not recommended with kidney disorders"],
    verified: true,
    symptoms: ["hormonal", "lactation", "digestion", "women health", "reproductive"],
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
    description: "Known as the 'Queen of Herbs' for women, Shatavari has been used in Ayurveda for thousands of years."
  },
  {
    id: "ginger",
    name: "Ginger",
    botanicalName: "Zingiber officinale",
    family: "Zingiberaceae",
    commonNames: ["Adrak", "Shunthi", "Sonth"],
    category: ["Rhizome", "Spice"],
    bodySystem: ["Digestive", "Respiratory", "Circulatory"],
    region: ["Pan-India", "Kerala", "Karnataka"],
    partsUsed: [
      { part: "Rhizome", icon: "🫚" }
    ],
    medicinalProperties: ["Carminative", "Antiemetic", "Anti-inflammatory", "Circulatory stimulant"],
    uses: ["Nausea relief", "Cold & cough", "Digestion", "Joint pain"],
    preparations: [
      {
        method: "Ginger Kadha",
        type: "Decoction",
        difficulty: "Easy",
        steps: ["Grate 1-inch fresh ginger", "Boil with 2 cups water for 10 min", "Add tulsi leaves and black pepper", "Strain, add honey and lemon"]
      }
    ],
    dosage: "1-2 inches fresh ginger daily, or 1 tsp dry ginger powder",
    cautions: ["May interact with blood thinners", "Excess may cause heartburn"],
    verified: true,
    symptoms: ["nausea", "cold", "cough", "digestion", "joint pain", "inflammation"],
    imageUrl: "https://images.unsplash.com/photo-1615485500710-aa71300612aa?w=400&h=300&fit=crop",
    description: "Called 'Vishwabheshaja' (universal medicine) in Ayurveda, ginger is perhaps the most widely used medicinal spice."
  },
  {
    id: "mulethi",
    name: "Mulethi",
    botanicalName: "Glycyrrhiza glabra",
    family: "Fabaceae",
    commonNames: ["Liquorice", "Yashtimadhu", "Jethimadh"],
    category: ["Root Medicine", "Herb"],
    bodySystem: ["Respiratory", "Digestive", "Skin"],
    region: ["Jammu", "Punjab", "Sub-Himalayan"],
    partsUsed: [
      { part: "Root", icon: "🌱" }
    ],
    medicinalProperties: ["Demulcent", "Expectorant", "Anti-ulcer", "Skin brightening"],
    uses: ["Sore throat", "Cough relief", "Stomach ulcers", "Skin lightening"],
    preparations: [
      {
        method: "Mulethi Decoction",
        type: "Decoction",
        difficulty: "Easy",
        steps: ["Break 2-3 small pieces of mulethi root", "Boil in 2 cups water for 10 min", "Strain and sip slowly", "Best for sore throat — gargle if needed"]
      }
    ],
    dosage: "1-2 small sticks chewed daily or as decoction",
    cautions: ["Not for people with high blood pressure", "Avoid prolonged daily use", "May cause water retention"],
    verified: true,
    symptoms: ["sore throat", "cough", "ulcer", "skin lightening", "acidity"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    description: "One of the most ancient Ayurvedic herbs, Mulethi is the go-to remedy for throat and respiratory issues."
  }
];

export const symptoms = [
  "cold", "cough", "fever", "headache", "stress", "anxiety", "immunity",
  "digestion", "nausea", "bloating", "skin issues", "acne", "burns",
  "joint pain", "inflammation", "hair fall", "insomnia", "fatigue",
  "sore throat", "infection", "memory", "concentration", "dental",
  "wound", "hormonal", "women health"
];

export const gardenCategories = [
  { id: "kitchen", name: "Kitchen Garden", emoji: "🌿", description: "Essential herbs for your kitchen", plantIds: ["tulsi", "turmeric", "ginger", "peppermint"] },
  { id: "immunity", name: "Immunity Boosters", emoji: "🛡️", description: "Strengthen your natural defenses", plantIds: ["giloy", "amla", "ashwagandha", "tulsi"] },
  { id: "skin", name: "Skin Care", emoji: "✨", description: "Natural beauty from nature", plantIds: ["aloe-vera", "neem", "turmeric", "shatavari"] },
  { id: "digestive", name: "Digestive Health", emoji: "🫖", description: "Soothe and strengthen your gut", plantIds: ["ginger", "peppermint", "mulethi", "amla"] },
];
