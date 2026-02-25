import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'waiting' | 'in-consultation' | 'completed' | 'pending' | 'reviewed';
  className?: string;
}

const statusConfig = {
  waiting: {
    label: 'Waiting',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200'
  },
  'in-consultation': {
    label: 'In Consultation',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  completed: {
    label: 'Completed',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200'
  },
  pending: {
    label: 'Pending',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200'
  },
  reviewed: {
    label: 'Reviewed',
    bgColor: 'bg-violet-100',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200'
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
    >
      {config.label}
    </span>
  );
}
