import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/doctor/Sidebar';
import { DashboardStatCard } from '@/components/common/DashboardStatCard';
import { PatientQueueTable } from '@/components/doctor/PatientQueueTable';
import { WeeklyPatientsChart, ComplaintDistributionChart } from '@/components/doctor/Charts';
import { ReportSection } from '@/components/common/ReportSection';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PatientCard } from '@/components/patient/PatientCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Clock,
  CheckCircle,
  Timer,
  Search,
  Filter,
  ChevronLeft,
  User,
  Calendar,
  FileText,
  Stethoscope,
  AlertCircle,
  Lightbulb,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  CheckSquare
} from 'lucide-react';
import { mockPatients, mockReports, dashboardStats } from '@/data/mockData';
import type { Patient, Report } from '@/types';

type ViewType = 'dashboard' | 'queue' | 'reports' | 'history' | 'settings';

interface DoctorDashboardProps {
  onLogout: () => void;
}

export function DoctorDashboard({ onLogout }: DoctorDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleViewReport = (patient: Patient) => {
    const report = mockReports.find((r) => r.patientId === patient.id);
    if (report) {
      setSelectedReport(report);
      setSelectedPatient(patient);
    }
  };

  const handleBackToQueue = () => {
    setSelectedReport(null);
    setSelectedPatient(null);
  };

  const renderContent = () => {
    if (selectedReport && selectedPatient) {
      return (
        <ReportViewPage
          report={selectedReport}
          patient={selectedPatient}
          onBack={handleBackToQueue}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <DashboardHome />;
      case 'queue':
        return <PatientQueuePage onViewReport={handleViewReport} />;
      case 'reports':
        return <ReportsPage onViewReport={handleViewReport} />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {currentView === 'dashboard' && 'Dashboard'}
                  {currentView === 'queue' && 'Patient Queue'}
                  {currentView === 'reports' && 'Reports'}
                  {currentView === 'history' && 'Patient History'}
                  {currentView === 'settings' && 'Settings'}
                  {selectedReport && 'AI Report View'}
                </h1>
                <p className="text-sm text-slate-500">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="font-medium text-slate-900">Dr. Sarah Mitchell</p>
                  <p className="text-sm text-slate-500">General Physician</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView + (selectedReport ? '-report' : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Dashboard Home
function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatCard
          title="Today's Patients"
          value={dashboardStats.todayPatients}
          subtitle="Total consultations"
          icon={Users}
          trend="up"
          trendValue="12%"
          color="blue"
        />
        <DashboardStatCard
          title="Waiting"
          value={dashboardStats.waiting}
          subtitle="In queue"
          icon={Clock}
          trend="neutral"
          trendValue="0%"
          color="amber"
        />
        <DashboardStatCard
          title="Completed"
          value={dashboardStats.completed}
          subtitle="Consultations done"
          icon={CheckCircle}
          trend="up"
          trendValue="8%"
          color="emerald"
        />
        <DashboardStatCard
          title="Avg. Consultation"
          value={dashboardStats.averageConsultationTime}
          subtitle="Per patient"
          icon={Timer}
          trend="down"
          trendValue="3%"
          color="violet"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <WeeklyPatientsChart />
        <ComplaintDistributionChart />
      </div>

      {/* Recent Patients */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Patients</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPatients.slice(0, 3).map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Patient Queue Page
interface PatientQueuePageProps {
  onViewReport: (patient: Patient) => void;
}

function PatientQueuePage({ onViewReport }: PatientQueuePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.complaint.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
            className="h-11"
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'waiting' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('waiting')}
            className="h-11"
          >
            Waiting
          </Button>
          <Button
            variant={statusFilter === 'in-consultation' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('in-consultation')}
            className="h-11"
          >
            In Progress
          </Button>
        </div>
      </div>

      {/* Patient Table */}
      <PatientQueueTable patients={filteredPatients} onViewReport={onViewReport} />
    </div>
  );
}

// Reports Page
interface ReportsPageProps {
  onViewReport: (patient: Patient) => void;
}

function ReportsPage({ onViewReport }: ReportsPageProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockReports.map((report) => {
          const patient = mockPatients.find((p) => p.id === report.patientId);
          if (!patient) return null;

          return (
            <Card key={report.id} className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{report.patientName}</h3>
                    <p className="text-sm text-slate-500">
                      {report.age} years • {report.gender}
                    </p>
                  </div>
                  <StatusBadge status={report.status} />
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Complaint:</span> {report.chiefComplaint}
                  </p>
                  <p className="text-sm text-slate-500">
                    Created: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => onViewReport(patient)}
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Report
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Report View Page
interface ReportViewPageProps {
  report: Report;
  patient: Patient;
  onBack: () => void;
}

function ReportViewPage({ report, patient, onBack }: ReportViewPageProps) {
  const [doctorNotes, setDoctorNotes] = useState(report.doctorNotes || '');
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="text-slate-600">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Queue
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Report Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Information */}
          <ReportSection title="Patient Information" icon={User}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-medium text-slate-900">{report.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Age</p>
                <p className="font-medium text-slate-900">{report.age} years</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Gender</p>
                <p className="font-medium text-slate-900">{report.gender}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Queue #</p>
                <p className="font-medium text-slate-900">{patient.queueNumber}</p>
              </div>
            </div>
          </ReportSection>

          {/* Chief Complaint */}
          <ReportSection title="Chief Complaint" icon={Stethoscope}>
            <p className="text-slate-700">{report.chiefComplaint}</p>
          </ReportSection>

          {/* Symptom Summary */}
          <ReportSection title="Symptom Summary" icon={FileText}>
            <p className="text-slate-700 leading-relaxed">{report.symptomSummary}</p>
          </ReportSection>

          {/* Key Observations */}
          <ReportSection title="Key Observations" icon={AlertCircle}>
            <ul className="space-y-2">
              {report.keyObservations.map((observation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <span className="text-slate-700">{observation}</span>
                </li>
              ))}
            </ul>
          </ReportSection>

          {/* Doctor Focus Areas */}
          <ReportSection title="Doctor Focus Areas" icon={Lightbulb}>
            <ul className="space-y-2">
              {report.doctorFocusAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-700">{area}</span>
                </li>
              ))}
            </ul>
          </ReportSection>

          {/* Patient Answers */}
          <ReportSection
            title="Patient Answers"
            icon={ClipboardList}
            action={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllAnswers(!showAllAnswers)}
              >
                {showAllAnswers ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Show All
                  </>
                )}
              </Button>
            }
          >
            <div className="space-y-3">
              {report.patientAnswers
                .slice(0, showAllAnswers ? undefined : 3)
                .map((answer, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                  >
                    <p className="text-sm text-slate-500">Question {index + 1}</p>
                    <p className="font-medium text-slate-900">
                      {typeof answer.answer === 'boolean'
                        ? answer.answer
                          ? 'Yes'
                          : 'No'
                        : String(answer.answer)}
                    </p>
                  </div>
                ))}
            </div>
          </ReportSection>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="border-slate-200">
            <CardContent className="p-5">
              <p className="text-sm text-slate-500 mb-2">Report Status</p>
              <StatusBadge status={report.status} />
            </CardContent>
          </Card>

          {/* Doctor Notes */}
          <Card className="border-slate-200">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Doctor Notes
              </h3>
              <Textarea
                placeholder="Add your notes here..."
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                className="min-h-[150px] resize-none"
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Save Notes
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-slate-200">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-slate-900 mb-2">Actions</h3>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Print Report
              </Button>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <CheckSquare className="w-4 h-4 mr-2" />
                Mark as Completed
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// History Page
function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const completedPatients = mockPatients.filter((p) => p.status === 'completed');

  const filteredPatients = completedPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.complaint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search patient history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <Button variant="outline" className="h-11">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* History Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Complaint
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{patient.name}</p>
                      <p className="text-xs text-slate-500">
                        {patient.age} years • {patient.gender === 'male' ? 'M' : 'F'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-slate-700">{patient.complaint}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={patient.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <FileText className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Settings Page
function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile Settings</h2>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label className="text-slate-700">Full Name</Label>
              <Input defaultValue="Dr. Sarah Mitchell" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Email</Label>
              <Input defaultValue="sarah.mitchell@hospital.com" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Specialization</Label>
              <Input defaultValue="General Physician" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <span className="text-slate-700">Email notifications for new patients</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300" />
              <span className="text-slate-700">SMS alerts for urgent cases</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300" />
              <span className="text-slate-700">Daily summary reports</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Missing import
import { Label } from '@/components/ui/label';
