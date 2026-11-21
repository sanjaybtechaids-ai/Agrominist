import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  iconColor = 'text-forest-600 bg-forest-50',
  badge,
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-agriBorder p-5 shadow-sm hover:shadow transition-shadow duration-150',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-agriMuted tracking-wider uppercase">{title}</p>
        {Icon && (
          <div className={cn('p-2 rounded-lg flex items-center justify-center', iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-agriText tracking-tight">{value}</span>
        {unit && <span className="text-sm font-medium text-agriMuted">{unit}</span>}
      </div>

      {(subtitle || badge || trend) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-agriMuted truncate">{subtitle}</span>}
          {badge && <div>{badge}</div>}
          {trend && (
            <span
              className={cn(
                'font-medium',
                trend.direction === 'up'
                  ? 'text-emerald-600'
                  : trend.direction === 'down'
                  ? 'text-rose-600'
                  : 'text-slate-600'
              )}
            >
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
