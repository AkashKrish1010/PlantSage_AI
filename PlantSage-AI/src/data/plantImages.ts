/**
 * Plant Images Mapping
 * Maps plant names to their local image assets from the Medicinal plant dataset
 */

export const plantImages = {
  // A
  Aloevera: require("../../assets/plants/Aloevera.jpg"),
  Amla: require("../../assets/plants/Amla.jpg"),
  Amruta_Balli: require("../../assets/plants/Amruta_Balli.jpg"),
  Arali: require("../../assets/plants/Arali.jpg"),
  Ashoka: require("../../assets/plants/Ashoka.jpg"),
  Ashwagandha: require("../../assets/plants/Ashwagandha.jpg"),
  Avacado: require("../../assets/plants/Avacado.jpg"),

  // B
  Bamboo: require("../../assets/plants/Bamboo.jpg"),
  Basale: require("../../assets/plants/Basale.jpg"),
  Betel: require("../../assets/plants/Betel.jpg"),
  Betel_Nut: require("../../assets/plants/Betel_Nut.jpg"),
  Brahmi: require("../../assets/plants/Brahmi.jpg"),

  // C
  Castor: require("../../assets/plants/Castor.jpg"),
  Curry_Leaf: require("../../assets/plants/Curry_Leaf.jpg"),

  // D
  Doddapatre: require("../../assets/plants/Doddapatre.jpg"),

  // E
  Ekka: require("../../assets/plants/Ekka.jpg"),

  // G
  Ganike: require("../../assets/plants/Ganike.jpg"),
  Gauva: require("../../assets/plants/Gauva.jpg"),
  Geranium: require("../../assets/plants/Geranium.jpg"),

  // H
  Henna: require("../../assets/plants/Henna.jpg"),
  Hibiscus: require("../../assets/plants/Hibiscus.jpg"),
  Honge: require("../../assets/plants/Honge.jpg"),

  // I
  Insulin: require("../../assets/plants/Insulin.jpg"),

  // J
  Jasmine: require("../../assets/plants/Jasmine.jpg"),

  // L
  Lemon: require("../../assets/plants/Lemon.jpg"),
  Lemon_grass: require("../../assets/plants/Lemon_grass.jpg"),

  // M
  Mango: require("../../assets/plants/Mango.jpg"),
  Mint: require("../../assets/plants/Mint.jpg"),

  // N
  Nagadali: require("../../assets/plants/Nagadali.jpg"),
  Neem: require("../../assets/plants/Neem.jpg"),
  Nithyapushpa: require("../../assets/plants/Nithyapushpa.jpg"),
  Nooni: require("../../assets/plants/Nooni.jpg"),

  // P
  Pappaya: require("../../assets/plants/Pappaya.jpg"),
  Pepper: require("../../assets/plants/Pepper.jpg"),
  Pomegranate: require("../../assets/plants/Pomegranate.jpg"),

  // R
  Raktachandini: require("../../assets/plants/Raktachandini.jpg"),
  Rose: require("../../assets/plants/Rose.jpg"),

  // S
  Sapota: require("../../assets/plants/Sapota.jpg"),

  // T
  Tulasi: require("../../assets/plants/Tulasi.jpg"),

  // W
  Wood_sorel: require("../../assets/plants/Wood_sorel.jpg"),
};

/**
 * Multiple images per plant for the hero slider (3 images each).
 * Extra slots are filled with botanically similar plants for visual variety.
 */
export const plantImageSets: Record<string, any[]> = {
  Tulasi:       [require("../../assets/plants/Tulasi.jpg"),        require("../../assets/plants/Mint.jpg"),         require("../../assets/plants/Doddapatre.jpg")],
  Neem:         [require("../../assets/plants/Neem.jpg"),          require("../../assets/plants/Ashoka.jpg"),        require("../../assets/plants/Honge.jpg")],
  Ashwagandha:  [require("../../assets/plants/Ashwagandha.jpg"),   require("../../assets/plants/Amruta_Balli.jpg"),  require("../../assets/plants/Castor.jpg")],
  Brahmi:       [require("../../assets/plants/Brahmi.jpg"),        require("../../assets/plants/Basale.jpg"),        require("../../assets/plants/Ganike.jpg")],
  Amla:         [require("../../assets/plants/Amla.jpg"),          require("../../assets/plants/Avacado.jpg"),       require("../../assets/plants/Gauva.jpg")],
  Aloevera:     [require("../../assets/plants/Aloevera.jpg"),      require("../../assets/plants/Insulin.jpg"),       require("../../assets/plants/Basale.jpg")],
  Mint:         [require("../../assets/plants/Mint.jpg"),          require("../../assets/plants/Doddapatre.jpg"),    require("../../assets/plants/Lemon_grass.jpg")],
  Hibiscus:     [require("../../assets/plants/Hibiscus.jpg"),      require("../../assets/plants/Rose.jpg"),          require("../../assets/plants/Jasmine.jpg")],
  Rose:         [require("../../assets/plants/Rose.jpg"),          require("../../assets/plants/Hibiscus.jpg"),      require("../../assets/plants/Geranium.jpg")],
  Jasmine:      [require("../../assets/plants/Jasmine.jpg"),       require("../../assets/plants/Rose.jpg"),          require("../../assets/plants/Nithyapushpa.jpg")],
  Curry_Leaf:   [require("../../assets/plants/Curry_Leaf.jpg"),    require("../../assets/plants/Mango.jpg"),         require("../../assets/plants/Pappaya.jpg")],
  Lemon:        [require("../../assets/plants/Lemon.jpg"),         require("../../assets/plants/Avacado.jpg"),       require("../../assets/plants/Pappaya.jpg")],
  Mango:        [require("../../assets/plants/Mango.jpg"),         require("../../assets/plants/Pappaya.jpg"),       require("../../assets/plants/Gauva.jpg")],
  Henna:        [require("../../assets/plants/Henna.jpg"),         require("../../assets/plants/Basale.jpg"),        require("../../assets/plants/Ganike.jpg")],
  Pepper:       [require("../../assets/plants/Pepper.jpg"),        require("../../assets/plants/Lemon_grass.jpg"),   require("../../assets/plants/Mint.jpg")],
  Pomegranate:  [require("../../assets/plants/Pomegranate.jpg"),   require("../../assets/plants/Gauva.jpg"),         require("../../assets/plants/Amla.jpg")],
  Castor:       [require("../../assets/plants/Castor.jpg"),        require("../../assets/plants/Ekka.jpg"),          require("../../assets/plants/Arali.jpg")],
  Ashoka:       [require("../../assets/plants/Ashoka.jpg"),        require("../../assets/plants/Arali.jpg"),         require("../../assets/plants/Nithyapushpa.jpg")],
  Bamboo:       [require("../../assets/plants/Bamboo.jpg"),        require("../../assets/plants/Honge.jpg"),         require("../../assets/plants/Wood_sorel.jpg")],
  Betel:        [require("../../assets/plants/Betel.jpg"),         require("../../assets/plants/Betel_Nut.jpg"),     require("../../assets/plants/Basale.jpg")],
  Nooni:        [require("../../assets/plants/Nooni.jpg"),         require("../../assets/plants/Sapota.jpg"),        require("../../assets/plants/Gauva.jpg")],
  Lemon_grass:  [require("../../assets/plants/Lemon_grass.jpg"),   require("../../assets/plants/Mint.jpg"),          require("../../assets/plants/Doddapatre.jpg")],
  Geranium:     [require("../../assets/plants/Geranium.jpg"),      require("../../assets/plants/Rose.jpg"),          require("../../assets/plants/Hibiscus.jpg")],
  Nagadali:     [require("../../assets/plants/Nagadali.jpg"),      require("../../assets/plants/Arali.jpg"),         require("../../assets/plants/Ekka.jpg")],
  Insulin:      [require("../../assets/plants/Insulin.jpg"),       require("../../assets/plants/Aloevera.jpg"),      require("../../assets/plants/Basale.jpg")],
  Raktachandini:[require("../../assets/plants/Raktachandini.jpg"), require("../../assets/plants/Rose.jpg"),          require("../../assets/plants/Hibiscus.jpg")],
  Sapota:       [require("../../assets/plants/Sapota.jpg"),        require("../../assets/plants/Nooni.jpg"),         require("../../assets/plants/Gauva.jpg")],
  Wood_sorel:   [require("../../assets/plants/Wood_sorel.jpg"),    require("../../assets/plants/Basale.jpg"),        require("../../assets/plants/Ganike.jpg")],
  Doddapatre:   [require("../../assets/plants/Doddapatre.jpg"),    require("../../assets/plants/Mint.jpg"),          require("../../assets/plants/Lemon_grass.jpg")],
  Avacado:      [require("../../assets/plants/Avacado.jpg"),       require("../../assets/plants/Mango.jpg"),         require("../../assets/plants/Gauva.jpg")],
  Amruta_Balli: [require("../../assets/plants/Amruta_Balli.jpg"),  require("../../assets/plants/Ashwagandha.jpg"),   require("../../assets/plants/Castor.jpg")],
  Arali:        [require("../../assets/plants/Arali.jpg"),         require("../../assets/plants/Nagadali.jpg"),      require("../../assets/plants/Ekka.jpg")],
  Betel_Nut:    [require("../../assets/plants/Betel_Nut.jpg"),     require("../../assets/plants/Betel.jpg"),         require("../../assets/plants/Basale.jpg")],
  Ekka:         [require("../../assets/plants/Ekka.jpg"),          require("../../assets/plants/Arali.jpg"),         require("../../assets/plants/Nagadali.jpg")],
  Ganike:       [require("../../assets/plants/Ganike.jpg"),        require("../../assets/plants/Wood_sorel.jpg"),    require("../../assets/plants/Basale.jpg")],
  Honge:        [require("../../assets/plants/Honge.jpg"),         require("../../assets/plants/Neem.jpg"),          require("../../assets/plants/Ashoka.jpg")],
  Nithyapushpa: [require("../../assets/plants/Nithyapushpa.jpg"),  require("../../assets/plants/Jasmine.jpg"),       require("../../assets/plants/Rose.jpg")],
  Basale:       [require("../../assets/plants/Basale.jpg"),        require("../../assets/plants/Wood_sorel.jpg"),    require("../../assets/plants/Ganike.jpg")],
  Gauva:        [require("../../assets/plants/Gauva.jpg"),         require("../../assets/plants/Pomegranate.jpg"),   require("../../assets/plants/Amla.jpg")],
  Pappaya:      [require("../../assets/plants/Pappaya.jpg"),       require("../../assets/plants/Mango.jpg"),         require("../../assets/plants/Avacado.jpg")],
};

/** Returns 3-image array for the hero slider, falling back to single image */
export function getPlantImageSet(plantName: string): any[] {
  if (plantName in plantImageSets) return plantImageSets[plantName as keyof typeof plantImageSets];
  const single = getPlantImage(plantName);
  return single ? [single] : [];
}

/** Get plant image by name */
export function getPlantImage(plantName: string) {
  return plantImages[plantName as keyof typeof plantImages];
}

/** Get all available plant names */
export function getAvailablePlants(): string[] {
  return Object.keys(plantImages);
}

/** Check if a plant image exists */
export function hasPlantImage(plantName: string): boolean {
  return plantName in plantImages;
}
