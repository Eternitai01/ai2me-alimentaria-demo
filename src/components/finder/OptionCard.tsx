import {
  Cable, Router, Phone, Wifi, Smartphone, Monitor, Laptop, Server,
  Home, Building, Building2, Layers, Square, HelpCircle, Shield,
  UserCheck, HardDrive, Settings,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cable, Router, Phone, Wifi, Smartphone, Monitor, Laptop, Server,
  Home, Building, Building2, Layers, Square, HelpCircle, Shield,
  UserCheck, HardDrive, Settings,
};

interface OptionCardProps {
  label: string;
  description?: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

const OptionCard = ({ label, description, icon, selected, onClick }: OptionCardProps) => {
  const IconComp = iconMap[icon] || Square;

  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center justify-center p-6 rounded-lg border transition-all duration-200 cursor-pointer min-h-[130px] ${
        selected
          ? "border-foreground bg-secondary shadow-sm"
          : "border-border bg-card hover:border-[hsl(142,71%,45%)]"
      }`}
    >
      <IconComp
        className={`w-8 h-8 mb-3 transition-colors ${
          selected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        }`}
      />
      <span className="font-semibold text-sm text-foreground text-center">{label}</span>
      {description && (
        <span className="text-xs text-muted-foreground mt-1.5 text-center leading-snug max-w-[180px]">
          {description}
        </span>
      )}
    </button>
  );
};

export default OptionCard;
