import type { Patient, HealthConcern, Question, Report, DashboardStats } from '@/types';

export const healthConcerns: HealthConcern[] = [
  {
    id: 'fever',
    title: 'Fever / Infection',
    icon: 'Thermometer',
    description: 'High temperature, chills, or signs of infection'
  },
  {
    id: 'skin',
    title: 'Skin Issue',
    icon: 'ScanFace',
    description: 'Rashes, itching, or skin abnormalities'
  },
  {
    id: 'stomach',
    title: 'Stomach Problem',
    icon: 'Activity',
    description: 'Pain, nausea, or digestive issues'
  },
  {
    id: 'respiratory',
    title: 'Respiratory Issue',
    icon: 'Wind',
    description: 'Cough, breathing difficulty, or chest congestion'
  },
  {
    id: 'general',
    title: 'General Consultation',
    icon: 'Stethoscope',
    description: 'Routine checkup or general health concerns'
  },
  {
    id: 'other',
    title: 'Other',
    icon: 'MoreHorizontal',
    description: 'Other health concerns not listed above'
  }
];

export const mockQuestions: Record<string, Question[]> = {
  fever: [
    {
      id: 'fever-1',
      type: 'date',
      question: 'When did your fever start?',
      required: true
    },
    {
      id: 'fever-2',
      type: 'slider',
      question: 'What is your current temperature?',
      min: 98,
      max: 105,
      required: true
    },
    {
      id: 'fever-3',
      type: 'yes-no',
      question: 'Have you taken any medication for fever?',
      required: true
    },
    {
      id: 'fever-4',
      type: 'text',
      question: 'If yes, what medication did you take?',
      required: false
    },
    {
      id: 'fever-5',
      type: 'multiple-choice',
      question: 'Any other symptoms?',
      options: ['Headache', 'Body ache', 'Chills', 'Sweating', 'None'],
      required: true
    }
  ],
  skin: [
    {
      id: 'skin-1',
      type: 'date',
      question: 'When did you first notice the skin issue?',
      required: true
    },
    {
      id: 'skin-2',
      type: 'multiple-choice',
      question: 'What type of skin issue?',
      options: ['Rash', 'Itching', 'Redness', 'Swelling', 'Dryness', 'Other'],
      required: true
    },
    {
      id: 'skin-3',
      type: 'slider',
      question: 'Rate the severity (1-10)',
      min: 1,
      max: 10,
      required: true
    },
    {
      id: 'skin-4',
      type: 'yes-no',
      question: 'Have you used any topical creams?',
      required: true
    }
  ],
  stomach: [
    {
      id: 'stomach-1',
      type: 'date',
      question: 'When did the symptoms start?',
      required: true
    },
    {
      id: 'stomach-2',
      type: 'multiple-choice',
      question: 'What symptoms are you experiencing?',
      options: ['Pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Bloating', 'Heartburn'],
      required: true
    },
    {
      id: 'stomach-3',
      type: 'slider',
      question: 'Rate the pain severity (1-10)',
      min: 1,
      max: 10,
      required: true
    },
    {
      id: 'stomach-4',
      type: 'yes-no',
      question: 'Have you eaten anything unusual recently?',
      required: true
    }
  ],
  respiratory: [
    {
      id: 'resp-1',
      type: 'date',
      question: 'When did the symptoms begin?',
      required: true
    },
    {
      id: 'resp-2',
      type: 'multiple-choice',
      question: 'What symptoms do you have?',
      options: ['Cough', 'Shortness of breath', 'Chest pain', 'Wheezing', 'Sore throat'],
      required: true
    },
    {
      id: 'resp-3',
      type: 'yes-no',
      question: 'Do you have a history of asthma or allergies?',
      required: true
    },
    {
      id: 'resp-4',
      type: 'slider',
      question: 'Rate breathing difficulty (1-10)',
      min: 1,
      max: 10,
      required: true
    }
  ],
  general: [
    {
      id: 'general-1',
      type: 'text',
      question: 'What is your main health concern today?',
      required: true
    },
    {
      id: 'general-2',
      type: 'yes-no',
      question: 'Are you currently taking any medications?',
      required: true
    },
    {
      id: 'general-3',
      type: 'text',
      question: 'Please list your current medications',
      required: false
    },
    {
      id: 'general-4',
      type: 'yes-no',
      question: 'Do you have any known allergies?',
      required: true
    }
  ],
  other: [
    {
      id: 'other-1',
      type: 'text',
      question: 'Please describe your health concern',
      required: true
    },
    {
      id: 'other-2',
      type: 'date',
      question: 'When did this issue start?',
      required: true
    },
    {
      id: 'other-3',
      type: 'slider',
      question: 'Rate the severity (1-10)',
      min: 1,
      max: 10,
      required: true
    }
  ]
};

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'female',
    phone: '+1 (555) 123-4567',
    visitType: 'new',
    complaint: 'Fever / Infection',
    status: 'waiting',
    arrivalTime: '09:30 AM',
    queueNumber: 'A001'
  },
  {
    id: 'p2',
    name: 'Michael Chen',
    age: 45,
    gender: 'male',
    phone: '+1 (555) 234-5678',
    visitType: 'follow-up',
    complaint: 'Respiratory Issue',
    status: 'in-consultation',
    arrivalTime: '09:15 AM',
    queueNumber: 'A002'
  },
  {
    id: 'p3',
    name: 'Emily Davis',
    age: 28,
    gender: 'female',
    phone: '+1 (555) 345-6789',
    visitType: 'new',
    complaint: 'Skin Issue',
    status: 'waiting',
    arrivalTime: '09:45 AM',
    queueNumber: 'A003'
  },
  {
    id: 'p4',
    name: 'Robert Wilson',
    age: 52,
    gender: 'male',
    phone: '+1 (555) 456-7890',
    visitType: 'follow-up',
    complaint: 'General Consultation',
    status: 'completed',
    arrivalTime: '08:45 AM',
    queueNumber: 'A004'
  },
  {
    id: 'p5',
    name: 'Amanda Martinez',
    age: 31,
    gender: 'female',
    phone: '+1 (555) 567-8901',
    visitType: 'new',
    complaint: 'Stomach Problem',
    status: 'waiting',
    arrivalTime: '10:00 AM',
    queueNumber: 'A005'
  },
  {
    id: 'p6',
    name: 'James Thompson',
    age: 67,
    gender: 'male',
    phone: '+1 (555) 678-9012',
    visitType: 'follow-up',
    complaint: 'General Consultation',
    status: 'completed',
    arrivalTime: '08:30 AM',
    queueNumber: 'A006'
  }
];

export const mockReports: Report[] = [
  {
    id: 'r1',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    chiefComplaint: 'Fever with body ache',
    symptomSummary: 'Patient reports fever starting 2 days ago with temperature ranging 101-102°F. Associated symptoms include headache, body ache, and mild chills. No cough or respiratory symptoms reported.',
    keyObservations: [
      'Elevated temperature (101.5°F)',
      'Patient appears fatigued',
      'No visible rash or skin abnormalities',
      'Vital signs stable except for fever'
    ],
    doctorFocusAreas: [
      'Rule out viral infection',
      'Check for seasonal flu',
      'Evaluate need for blood tests',
      'Assess hydration status'
    ],
    patientAnswers: [
      { questionId: 'fever-1', answer: '2024-01-15' },
      { questionId: 'fever-2', answer: 101.5 },
      { questionId: 'fever-3', answer: true },
      { questionId: 'fever-4', answer: 'Paracetamol 500mg' },
      { questionId: 'fever-5', answer: 'Headache, Body ache' }
    ],
    status: 'pending',
    createdAt: '2024-01-17T09:30:00Z'
  },
  {
    id: 'r2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    age: 45,
    gender: 'Male',
    chiefComplaint: 'Persistent cough and breathing difficulty',
    symptomSummary: 'Patient reports dry cough for past 5 days with increasing breathing difficulty. History of seasonal allergies. Symptoms worse at night and early morning.',
    keyObservations: [
      'Mild wheezing on auscultation',
      'Respiratory rate slightly elevated',
      'No chest pain reported',
      'Oxygen saturation normal'
    ],
    doctorFocusAreas: [
      'Evaluate for allergic asthma exacerbation',
      'Consider chest X-ray if symptoms persist',
      'Review current allergy medications',
      'Assess need for bronchodilator'
    ],
    patientAnswers: [
      { questionId: 'resp-1', answer: '2024-01-12' },
      { questionId: 'resp-2', answer: 'Cough, Shortness of breath' },
      { questionId: 'resp-3', answer: true },
      { questionId: 'resp-4', answer: 6 }
    ],
    doctorNotes: 'Patient has history of allergic asthma. Current symptoms consistent with seasonal exacerbation. Recommend adjusting inhaler dosage and follow-up in 1 week.',
    status: 'reviewed',
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: 'r3',
    patientId: 'p3',
    patientName: 'Emily Davis',
    age: 28,
    gender: 'Female',
    chiefComplaint: 'Skin rash on arms and neck',
    symptomSummary: 'Patient reports itchy red rash that started 3 days ago. Rash appears on both arms and neck area. No known allergies. Recently started using new skincare products.',
    keyObservations: [
      'Erythematous patches on bilateral arms',
      'Mild scaling visible',
      'No signs of infection',
      'Patient reports moderate itching'
    ],
    doctorFocusAreas: [
      'Consider contact dermatitis',
      'Review recent product changes',
      'Evaluate for allergic reaction',
      'Assess need for topical treatment'
    ],
    patientAnswers: [
      { questionId: 'skin-1', answer: '2024-01-14' },
      { questionId: 'skin-2', answer: 'Rash, Itching' },
      { questionId: 'skin-3', answer: 6 },
      { questionId: 'skin-4', answer: false }
    ],
    status: 'pending',
    createdAt: '2024-01-17T09:45:00Z'
  }
];

export const dashboardStats: DashboardStats = {
  todayPatients: 24,
  waiting: 8,
  completed: 14,
  averageConsultationTime: '18 min'
};

export const chartData = [
  { name: 'Mon', patients: 18, completed: 15 },
  { name: 'Tue', patients: 22, completed: 19 },
  { name: 'Wed', patients: 20, completed: 17 },
  { name: 'Thu', patients: 24, completed: 21 },
  { name: 'Fri', patients: 28, completed: 24 },
  { name: 'Sat', patients: 15, completed: 13 },
  { name: 'Sun', patients: 12, completed: 10 }
];

export const complaintDistribution = [
  { name: 'General', value: 35, color: '#3b82f6' },
  { name: 'Fever', value: 25, color: '#ef4444' },
  { name: 'Respiratory', value: 20, color: '#10b981' },
  { name: 'Skin', value: 12, color: '#f59e0b' },
  { name: 'Stomach', value: 8, color: '#8b5cf6' }
];
