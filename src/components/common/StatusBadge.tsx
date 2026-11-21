import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'measured' | 'estimated' | 'unavailable';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  if (status === 'measured') {
    return (
      <span
        title="Verified through certified agricultural soil/lab testing"
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200',
          className
        )}
      >
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        Lab Measured
      </span>
    );
  }

  if (status === 'estimated') {
    return (
      <span
        title="Calculated using regional agro-climatic satellite and soil models"
        className={cn(
          'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200',
          className
        )}
      >
        <AlertCircle className="w-3 h-3 text-amber-600" />
        Regional Estimate
      </span>
    );
  }

  return (
    <span
      title="Field soil test required for verified scientific calibration"
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200',
        className
      )}
    >
      <HelpCircle className="w-3 h-3 text-slate-500" />
      Data Pending
    </span>
  );
};
