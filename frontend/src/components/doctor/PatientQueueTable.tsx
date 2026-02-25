import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Patient } from '@/types';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Eye, User } from 'lucide-react';

interface PatientQueueTableProps {
  patients: Patient[];
  onViewReport: (patient: Patient) => void;
}

export function PatientQueueTable({ patients, onViewReport }: PatientQueueTableProps) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Patient</TableHead>
            <TableHead className="font-semibold text-slate-700">Age</TableHead>
            <TableHead className="font-semibold text-slate-700">Complaint</TableHead>
            <TableHead className="font-semibold text-slate-700">Status</TableHead>
            <TableHead className="font-semibold text-slate-700">Arrival</TableHead>
            <TableHead className="font-semibold text-slate-700">Queue #</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id} className="hover:bg-slate-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{patient.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{patient.gender}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-slate-700">{patient.age}</TableCell>
              <TableCell className="text-slate-700">{patient.complaint}</TableCell>
              <TableCell>
                <StatusBadge status={patient.status} />
              </TableCell>
              <TableCell className="text-slate-700">{patient.arrivalTime}</TableCell>
              <TableCell>
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                  {patient.queueNumber}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewReport(patient)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
