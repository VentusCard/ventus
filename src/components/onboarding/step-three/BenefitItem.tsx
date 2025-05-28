
import { Check } from "lucide-react";

interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem = ({ title, description }: BenefitItemProps) => {
  return (
    <div className="flex gap-4 bg-gradient-to-r from-slate-50 to-blue-50/50 p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-100/50 hover:translate-x-1 hover:shadow-md border border-slate-100">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
        <Check className="h-4 w-4 text-white" />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-slate-800 leading-tight">{title}</p>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
