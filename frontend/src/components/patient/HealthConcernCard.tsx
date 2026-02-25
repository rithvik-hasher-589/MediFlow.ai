import { Card, CardContent } from '@/components/ui/card';
import type { HealthConcern } from '@/types';
import { 
  Thermometer, 
  ScanFace, 
  Activity, 
  Wind, 
  Stethoscope, 
  MoreHorizontal,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthConcernCardProps {
  concern: HealthConcern;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Thermometer,
  ScanFace,
  Activity,
  Wind,
  Stethoscope,
  MoreHorizontal
};

export function HealthConcernCard({ concern, isSelected, onClick }: HealthConcernCardProps) {
  const Icon = iconMap[concern.icon] || Activity;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-all duration-200 border-2',
        isSelected
          ? 'border-blue-600 bg-blue-50 shadow-md'
          : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'p-3 rounded-xl transition-colors',
              isSelected ? 'bg-blue-600' : 'bg-slate-100'
            )}
          >
            <Icon
              className={cn(
                'w-6 h-6 transition-colors',
                isSelected ? 'text-white' : 'text-slate-600'
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'font-semibold text-base mb-1',
                isSelected ? 'text-blue-900' : 'text-slate-900'
              )}
            >
              {concern.title}
            </h3>
            <p
              className={cn(
                'text-sm leading-relaxed',
                isSelected ? 'text-blue-700' : 'text-slate-500'
              )}
            >
              {concern.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
