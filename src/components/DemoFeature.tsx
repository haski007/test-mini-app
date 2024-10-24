import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DemoFeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const DemoFeature: React.FC<DemoFeatureProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      className="p-4 bg-white/10 backdrop-blur-lg rounded-lg cursor-pointer transition-all hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-6 h-6" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};