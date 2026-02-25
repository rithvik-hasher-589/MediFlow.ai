import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: 'blue' | 'emerald' | 'amber' | 'violet' | 'rose';
}

const colorConfig = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-100'
  },
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    border: 'border-emerald-100'
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    border: 'border-amber-100'
  },
  violet: {
    bg: 'bg-violet-50',
    icon: 'text-violet-600',
    border: 'border-violet-100'
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'text-rose-600',
    border: 'border-rose-100'
  }
};

export function DashboardStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color
}: DashboardStatCardProps) {
  const colors = colorConfig[color];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`border ${colors.border} hover:shadow-md transition-shadow`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-600">{title}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
              {subtitle && (
                <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
              )}
              {trend && trendValue && (
                <div className="flex items-center gap-1 mt-2">
                  <span
                    className={`text-xs font-medium ${
                      trend === 'up'
                        ? 'text-emerald-600'
                        : trend === 'down'
                        ? 'text-rose-600'
                        : 'text-slate-600'
                    }`}
                  >
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
                  </span>
                  <span className="text-xs text-slate-400">vs yesterday</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-xl ${colors.bg}`}>
              <Icon className={`w-6 h-6 ${colors.icon}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
