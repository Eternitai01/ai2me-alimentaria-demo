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

export const ferrariniSteps: FinderStep[] = [
  {
    id: 1,
    question: "What type of business are you?",
    options: [
      { id: "restaurant", label: "Restaurant", description: "Fine dining, casual, bistro", icon: "UtensilsCrossed" },
      { id: "hotel", label: "Hotel", description: "Hotel restaurant, room service, catering", icon: "Hotel" },
      { id: "retailer", label: "Retailer", description: "Gourmet shop, deli, supermarket", icon: "ShoppingBag" },
      { id: "distributor", label: "Distributor", description: "Food service distributor", icon: "Truck" },
    ],
  },
  {
    id: 2,
    question: "What monthly volume do you need?",
    options: [
      { id: "small", label: "10-50 kg/month", description: "Small restaurant or boutique", icon: "Package" },
      { id: "medium", label: "50-200 kg/month", description: "Mid-size restaurant or multiple locations", icon: "Boxes" },
      { id: "large", label: "200-500 kg/month", description: "Large venue or hotel", icon: "Container" },
      { id: "bulk", label: "500+ kg/month", description: "Distributor or retail chain", icon: "Warehouse" },
    ],
  },
  {
    id: 3,
    question: "Which products interest you most?",
    multiSelect: true,
    options: [
      { id: "prosciutto", label: "Prosciutto di Parma", description: "18-24 month aged", icon: "Ham" },
      { id: "mortadella", label: "Mortadella Bologna IGP", description: "Traditional recipe", icon: "CircleDot" },
      { id: "salami", label: "Salami & Soppressata", description: "Various regional styles", icon: "Circle" },
      { id: "bresaola", label: "Bresaola", description: "Air-dried beef", icon: "Beef" },
    ],
  },
  {
    id: 4,
    question: "Do you need pairing recommendations?",
    options: [
      { id: "wine", label: "Wine pairings", description: "Sommelier suggestions", icon: "Wine" },
      { id: "cheese", label: "Cheese pairings", description: "Artisan cheese boards", icon: "Milk" },
      { id: "menu", label: "Menu ideas", description: "Recipe inspiration", icon: "BookOpen" },
      { id: "none", label: "Not needed", description: "I know what I want", icon: "X" },
    ],
  },
  {
    id: 5,
    question: "Which certifications matter to you?",
    multiSelect: true,
    options: [
      { id: "dop", label: "DOP/PDO", description: "Protected designation", icon: "Award" },
      { id: "organic", label: "Organic", description: "EU organic certified", icon: "Leaf" },
      { id: "halal", label: "Halal", description: "Halal certified products", icon: "CheckCircle" },
      { id: "none", label: "No preference", description: "Certification not required", icon: "Minus" },
    ],
  },
];

export interface ProductResult {
  name: string;
  specs: string;
  price: string;
  features: string[];
  pairings?: string[];
  delivery: string;
}

export const ferrariniResults: Record<string, ProductResult> = {
  default: {
    name: "Ferrarini Prosciutto di Parma 18 Months",
    specs: "DOP certified, boneless, 7-8kg, pre-sliced available",
    price: "€42/kg (wholesale)",
    features: ["DOP Certified", "18-month aged", "Sweet, delicate flavor", "Perfect for antipasti"],
    pairings: ["Chianti Classico", "Parmigiano-Reggiano", "Melon & figs"],
    delivery: "3-5 business days, refrigerated"
  },
  premium: {
    name: "Ferrarini Selection Pack - Mixed Charcuterie",
    specs: "Prosciutto, Mortadella, Salami, Bresaola - 5kg total",
    price: "€180 (€36/kg)",
    features: ["DOP Prosciutto", "Bologna IGP Mortadella", "Artisan Salami", "Premium Bresaola"],
    pairings: ["Barolo wine", "Aged Pecorino", "Grissini & olive oil"],
    delivery: "2-3 business days, white glove service"
  },
  bulk: {
    name: "Ferrarini Mortadella Bologna IGP - Bulk",
    specs: "Traditional recipe, 15kg whole piece",
    price: "€22/kg (bulk pricing)",
    features: ["IGP Certified", "Pistacchio variant available", "Ideal for slicing machines", "30-day shelf life"],
    pairings: ["Lambrusco wine", "Fresh mozzarella", "Focaccia bread"],
    delivery: "Next day delivery for orders >50kg"
  },
  restaurant: {
    name: "Ferrarini Chef's Selection - Starter Kit",
    specs: "Prosciutto (3kg), Mortadella (2kg), Salami (2kg)",
    price: "€245 (€35/kg average)",
    features: ["Perfect for antipasti", "Pre-portioned options", "Chef training materials included", "Recipe cards"],
    pairings: ["Prosecco", "Burrata", "Grilled vegetables", "Rosemary focaccia"],
    delivery: "Weekly delivery schedule available"
  }
};
