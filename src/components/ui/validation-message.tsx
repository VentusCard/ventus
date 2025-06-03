
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationMessageProps {
  errors: string[];
  className?: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ errors, className = '' }) => {
  if (errors.length === 0) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}>
      <div className="flex items-start">
        <AlertCircle size={16} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-sm text-red-700">
          {errors.length === 1 ? (
            <p>{errors[0]}</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationMessage;
