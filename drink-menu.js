const drinkMenu = [
  { name: 'Tea', sku: 'DRINK-TEA', unit: 'cup', sellingPrice: 10 },
  { name: 'Ginger Tea', sku: 'DRINK-GINGER-TEA', unit: 'cup', sellingPrice: 20 },
  { name: 'Coffee', sku: 'DRINK-COFFEE', unit: 'cup', sellingPrice: 20 },
  { name: 'Oreo Cookie Shake', sku: 'DRINK-OREO-SHAKE', unit: 'glass', sellingPrice: 50 },
  { name: 'Bourbon Cookie Shake', sku: 'DRINK-BOURBON-SHAKE', unit: 'glass', sellingPrice: 50 },
  { name: 'Mint Mojito', sku: 'DRINK-MINT-MOJITO', unit: 'glass', sellingPrice: 40 },
  { name: 'Classic Mojito', sku: 'DRINK-CLASSIC-MOJITO', unit: 'glass', sellingPrice: 40 },
  { name: 'Normal Falooda', sku: 'DRINK-NORMAL-FALOODA', unit: 'glass', sellingPrice: 50 },
  { name: 'Rose Falooda', sku: 'DRINK-ROSE-FALOODA', unit: 'glass', sellingPrice: 50 },
  { name: 'Strawberry Seasonal Shake', sku: 'DRINK-STRAWBERRY-SEASONAL-SHAKE', unit: 'glass', sellingPrice: 50 },
  { name: 'Mango Seasonal Shake', sku: 'DRINK-MANGO-SEASONAL-SHAKE', unit: 'glass', sellingPrice: 50 },
  { name: 'Lemon Juice', sku: 'DRINK-LEMON-JUICE', unit: 'glass', sellingPrice: 20 },
  { name: 'Classic Lemonade', sku: 'DRINK-CLASSIC-LEMONADE', unit: 'glass', sellingPrice: 20 },
  { name: 'Pista Ice Cream Shake', sku: 'DRINK-PISTA-ICE-CREAM-SHAKE', unit: 'glass', sellingPrice: 60 },
  { name: 'Vanilla Ice Cream Shake', sku: 'DRINK-VANILLA-ICE-CREAM-SHAKE', unit: 'glass', sellingPrice: 50 },
  { name: 'Butter Carranti Malba', sku: 'DRINK-BUTTER-CARRANTI-MALBA', unit: 'glass', sellingPrice: 80 },
  { name: 'Kesar Malba', sku: 'DRINK-KESAR-MALBA', unit: 'glass', sellingPrice: 80 },
  { name: 'Water Melon Juice', sku: 'DRINK-WATER-MELON-JUICE', unit: 'glass', sellingPrice: 20 },
  { name: 'Anjeer Juice', sku: 'DRINK-ANJEER-JUICE', unit: 'glass', sellingPrice: 80 },
  { name: 'Orange Juice', sku: 'DRINK-ORANGE-JUICE', unit: 'glass', sellingPrice: 30 }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = drinkMenu;
} else {
  window.RESTAURANT_DRINK_MENU = drinkMenu;
}
