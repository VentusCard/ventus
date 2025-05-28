
import { Check } from "lucide-react";

interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem = ({ title, description }: BenefitItemProps) => {
  return (
    <div className="flex gap-3 bg-slate-50 p-3 rounded-lg transition-all hover:bg-slate-100 hover:translate-x-1">
      <div className="bg-gradient-to-r from-blue-400 to-cyan-300 p-1 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <Check className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="font-medium text-blue-700">{title}</p>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
