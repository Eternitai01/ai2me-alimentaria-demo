export interface StepOption {
  id: string;
  label: string;
  description?: string;
  icon: string; // lucide icon name
}

export interface FinderStep {
  id: number;
  question: string;
  multiSelect?: boolean;
  options: StepOption[];
}

export const finderSteps: FinderStep[] = [
  {
    id: 1,
    question: "How do you connect to the Internet?",
    options: [
      { id: "ethernet", label: "Ethernet line", description: "For direct fiber or cable internet connections", icon: "Cable" },
      { id: "cable-modem", label: "Existing cable/fibre/DSL modem", description: "If you already have a modem", icon: "Router" },
      { id: "vdsl", label: "VDSL/ADSL line", description: "For traditional DSL connections", icon: "Phone" },
      { id: "mobile", label: "Mobile LTE/4G/3G network", description: "For mobile broadband users", icon: "Wifi" },
    ],
  },
  {
    id: 2,
    question: "How many devices will connect?",
    options: [
      { id: "1-5", label: "1-5 devices", icon: "Smartphone" },
      { id: "6-15", label: "6-15 devices", icon: "Monitor" },
      { id: "16-30", label: "16-30 devices", icon: "Laptop" },
      { id: "30+", label: "30+ devices", icon: "Server" },
    ],
  },
  {
    id: 3,
    question: "What's your coverage area?",
    options: [
      { id: "small-apt", label: "Small apartment", icon: "Home" },
      { id: "medium-home", label: "Medium home", icon: "Home" },
      { id: "large-home", label: "Large home", icon: "Building" },
      { id: "office", label: "Office/Business", icon: "Building2" },
    ],
  },
  {
    id: 4,
    question: "Do you need mesh Wi-Fi coverage?",
    options: [
      { id: "yes", label: "Yes - multiple floors/rooms", icon: "Layers" },
      { id: "no", label: "No - single area is fine", icon: "Square" },
      { id: "unsure", label: "Not sure", icon: "HelpCircle" },
    ],
  },
  {
    id: 5,
    question: "Which features matter most?",
    multiSelect: true,
    options: [
      { id: "vpn", label: "VPN support", icon: "Shield" },
      { id: "parental", label: "Parental controls", icon: "UserCheck" },
      { id: "usb", label: "USB storage", icon: "HardDrive" },
      { id: "smart-home", label: "Smart home integration", icon: "Settings" },
    ],
  },
];

export interface ProductResult {
  name: string;
  specs: string;
  price: string;
  features: string[];
}

export const productResults: Record<string, ProductResult> = {
  default: {
    name: "Keenetic Speedster",
    specs: "AC2600 Wi-Fi, 4x4 MU-MIMO, Gigabit Ports, VPN Server",
    price: "$208",
    features: ["Dual-band Wi-Fi", "Gigabit Ethernet", "VPN Server", "Parental Controls"],
  },
  heavy: {
    name: "Keenetic Ultra",
    specs: "AX3200 Wi-Fi 6, 8 Gigabit Ports, Multi-WAN, VPN",
    price: "$299",
    features: ["Wi-Fi 6", "8 Gigabit Ports", "Multi-WAN", "Advanced VPN"],
  },
  basic: {
    name: "Keenetic Start",
    specs: "N300 Wi-Fi, 4 Fast Ethernet Ports, Easy Setup",
    price: "$49",
    features: ["Easy Setup", "Compact Design", "Guest Network", "Parental Controls"],
  },
};
