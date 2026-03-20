export interface StepOption {
  id: string;
  label: string;
  description?: string;
  icon: string;
}

export interface FinderStep {
  id: number;
  question: string;
  multiSelect?: boolean;
  options: StepOption[];
}

export const literaSteps: FinderStep[] = [
  {
    id: 1,
    question: "What type of buyer are you?",
    options: [
      { id: "importer", label: "Importer", description: "Import fresh pork for distribution", icon: "Ship" },
      { id: "processor", label: "Processor", description: "Secondary processing (sausages, cured meats)", icon: "Factory" },
      { id: "retailer", label: "Retail Chain", description: "Supermarkets, hypermarkets", icon: "Store" },
      { id: "foodservice", label: "Food Service", description: "Hotels, restaurants, catering", icon: "ChefHat" },
    ],
  },
  {
    id: 2,
    question: "What's your target order volume?",
    options: [
      { id: "5-10", label: "5-10 tons", description: "Small-medium order", icon: "Package" },
      { id: "10-20", label: "10-20 tons", description: "Standard container", icon: "Container" },
      { id: "20-50", label: "20-50 tons", description: "Multiple containers", icon: "Truck" },
      { id: "50+", label: "50+ tons", description: "Ongoing supply contract", icon: "Warehouse" },
    ],
  },
  {
    id: 3,
    question: "Which cuts do you need?",
    multiSelect: true,
    options: [
      { id: "loin", label: "Loin", description: "Boneless, bone-in, chops", icon: "CircleSlash" },
      { id: "shoulder", label: "Shoulder", description: "Boston butt, picnic", icon: "Circle" },
      { id: "belly", label: "Belly", description: "Fresh, skin-on/off", icon: "Layers" },
      { id: "ribs", label: "Ribs", description: "Baby back, spare ribs", icon: "Grid" },
      { id: "offal", label: "Offal & By-products", description: "Liver, heart, ears, feet", icon: "Heart" },
    ],
  },
  {
    id: 4,
    question: "Where are you shipping to?",
    options: [
      { id: "eu", label: "EU / Europe", description: "Fast delivery, no customs", icon: "MapPin" },
      { id: "china", label: "China / Asia", description: "Lowest EU tariffs to China!", icon: "Globe" },
      { id: "middle-east", label: "Middle East", description: "Halal certified available", icon: "Palmtree" },
      { id: "americas", label: "Americas", description: "North & South America", icon: "Map" },
    ],
  },
  {
    id: 5,
    question: "Required certifications?",
    multiSelect: true,
    options: [
      { id: "ifs", label: "IFS", description: "International Featured Standards", icon: "Award" },
      { id: "brc", label: "BRC", description: "Global Food Safety", icon: "ShieldCheck" },
      { id: "halal", label: "Halal", description: "Islamic dietary certification", icon: "Verified" },
      { id: "china", label: "China GACC", description: "China customs approved", icon: "FileCheck" },
    ],
  },
];

export interface ProductResult {
  name: string;
  specs: string;
  price: string;
  features: string[];
  delivery: string;
  tariffs?: string;
}

export const literaResults: Record<string, ProductResult> = {
  default: {
    name: "Pork Loin - Grade A",
    specs: "Boneless, vacuum-packed, 5-7kg pieces, carton 20kg",
    price: "€3.20/kg FOB (10-20 ton order)",
    features: ["IFS & BRC certified", "Blast frozen -18°C", "Shelf life: 12 months", "Available cuts: whole, half, chops"],
    delivery: "15-25 days from order (depending on destination)",
  },
  china: {
    name: "China Export Pack - Mixed Cuts",
    specs: "Loin, shoulder, belly, ribs - 20ft container (18 tons)",
    price: "€2.95/kg FOB (bulk discount)",
    features: ["GACC approved facility", "Lowest EU tariff (5-year agreement)", "Mandarin documentation", "Shanghai/Guangzhou port delivery"],
    delivery: "22-28 days sea freight to Shanghai",
    tariffs: "8.5% import duty (lowest in EU!) vs 13-25% for other suppliers"
  },
  halal: {
    name: "Halal Certified Pork Shoulder",
    specs: "Boston butt, boneless, 4-6kg, halal slaughter, vacuum",
    price: "€3.50/kg FOB (halal premium)",
    features: ["IAWS Halal certified", "Traceability to farm", "Middle East export documentation", "Arabic labels available"],
    delivery: "10-14 days to Dubai/Riyadh",
  },
  premium: {
    name: "Premium Ibérico-Style Pork Selection",
    specs: "Loin, secreto, pluma, presa - artisan cuts",
    price: "€7.50/kg FOB (specialty pricing)",
    features: ["Heritage breed genetics", "Free-range Spanish pork", "Michelin-starred chef favorite", "Custom butchery available"],
    delivery: "5-7 days refrigerated EU delivery",
  },
  bulk: {
    name: "Long-Term Supply Contract - Full Carcass",
    specs: "Whole carcasses, 80-100kg, weekly deliveries",
    price: "€2.40/kg (12-month contract, negotiable)",
    features: ["Guaranteed weekly supply (160,000 heads/week capacity)", "Price lock for 12 months", "Flexible cut specifications", "Dedicated account manager"],
    delivery: "Weekly scheduled delivery to your facility",
  }
};
