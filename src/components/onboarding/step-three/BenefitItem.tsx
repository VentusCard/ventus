
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BenefitItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, description, icon: IconComponent }) => {
  return (
    <div className="bg-white/15 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
      <div className="flex gap-4">
        <div className="bg-white/30 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <div className="space-y-2">
          <p className="font-bold text-white text-lg md:text-xl leading-tight">{title}</p>
          <p className="text-blue-100 text-base md:text-lg leading-relaxed font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitItem;
