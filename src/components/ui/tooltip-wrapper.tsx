
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface TooltipWrapperProps {
  content: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ 
  content, 
  children, 
  showIcon = true 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || (
            <HelpCircle 
              size={16} 
              className="text-slate-400 hover:text-slate-600 cursor-help ml-1 inline-block" 
            />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
