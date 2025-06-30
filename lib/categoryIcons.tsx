import { Globe, BrainCircuit, Briefcase, Palette } from 'lucide-react';
import { FC } from 'react';

type LucideIcon = FC<React.SVGProps<SVGSVGElement>>;

export const getCategoryIcon = (categoryName: string): LucideIcon => {
  const iconMap: { [key: string]: LucideIcon } = {
    'World': Globe,
    'AI': BrainCircuit,
    'Business': Briefcase,
    'Design': Palette,
    'Default': Globe, 
  };

  const normalizedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
  return iconMap[normalizedCategory] || iconMap['Default'];
};