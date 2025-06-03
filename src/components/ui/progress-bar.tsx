
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  completedSections: boolean[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, completedSections }) => {
  const progressPercentage = (completedSections.filter(Boolean).length / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700">Application Progress</h3>
        <span className="text-sm text-slate-600">
          {completedSections.filter(Boolean).length} of {totalSteps} sections complete
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-3 mb-4" />
      
      <div className="flex justify-between">
        {['Business Info', 'Targeting Tools', 'Budget & Timeline', 'Contact Info'].map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
              completedSections[index] 
                ? 'bg-green-500 text-white' 
                : currentStep === index + 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-200 text-slate-600'
            }`}>
              {completedSections[index] ? '✓' : index + 1}
            </div>
            <span className={`text-xs text-center ${
              completedSections[index] ? 'text-green-600' : 'text-slate-600'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
