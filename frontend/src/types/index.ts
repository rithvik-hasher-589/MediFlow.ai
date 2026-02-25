// Patient Types
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  visitType: 'new' | 'follow-up';
  complaint: string;
  status: 'waiting' | 'in-consultation' | 'completed';
  arrivalTime: string;
  queueNumber: string;
}

export interface PatientDetails {
  fullName: string;
  age: string;
  gender: string;
  phoneNumber: string;
  visitType: 'new' | 'follow-up';
}

export interface HealthConcern {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export type QuestionType = 'text' | 'multiple-choice' | 'yes-no' | 'slider' | 'date';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  required: boolean;
}

export interface QuestionAnswer {
  questionId: string;
  answer: string | number | boolean;
}

export interface Report {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  symptomSummary: string;
  keyObservations: string[];
  doctorFocusAreas: string[];
  patientAnswers: QuestionAnswer[];
  doctorNotes?: string;
  status: 'pending' | 'reviewed' | 'completed';
  createdAt: string;
}

export interface DashboardStats {
  todayPatients: number;
  waiting: number;
  completed: number;
  averageConsultationTime: string;
}

export interface NavItem {
  label: string;
  icon: string;
  path: string;
}
