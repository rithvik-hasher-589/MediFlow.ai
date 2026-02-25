import { Card, CardContent } from '@/components/ui/card';
import type { Patient } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { User, Phone, Clock } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
}

export function PatientCard({ patient, onClick }: PatientCardProps) {
  return (
    <Card
      onClick={onClick}
      className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{patient.name}</h4>
              <p className="text-sm text-slate-500">
                {patient.age} years • {patient.gender === 'male' ? 'M' : 'F'}
              </p>
            </div>
          </div>
          <StatusBadge status={patient.status} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="w-4 h-4 text-slate-400" />
            {patient.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="w-4 h-4 text-slate-400" />
            {patient.arrivalTime}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              {patient.complaint}
            </span>
            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
              {patient.queueNumber}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
