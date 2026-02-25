import { useState } from 'react';
import { PatientIntakeFlow } from '@/pages/patient/PatientIntakeFlow';
import { DoctorLogin } from '@/pages/doctor/DoctorLogin';
import { DoctorDashboard } from '@/pages/doctor/DoctorDashboard';

type AppView = 'landing' | 'patient-checkup' | 'doctor-login' | 'doctor-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'patient-checkup':
        return <PatientIntakeFlow onComplete={() => setCurrentView('landing')} />;
      case 'doctor-login':
        return <DoctorLogin 
          onLogin={() => setCurrentView('doctor-dashboard')} 
          onBack={() => setCurrentView('landing')}
        />;
      case 'doctor-dashboard':
        return <DoctorDashboard onLogout={() => setCurrentView('landing')} />;
      default:
        return <LandingPage 
          onPatientClick={() => setCurrentView('patient-checkup')}
          onDoctorClick={() => setCurrentView('doctor-login')}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {renderView()}
    </div>
  );
}

interface LandingPageProps {
  onPatientClick: () => void;
  onDoctorClick: () => void;
}

function LandingPage({ onPatientClick, onDoctorClick }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-xl">MedFlow AI</h1>
              <p className="text-xs text-slate-500">Intelligent Medical Intake System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Welcome to MedFlow AI
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Streamline your healthcare experience with our AI-powered pre-consultation system. 
              Get started by selecting your role below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Patient Card */}
            <button
              onClick={onPatientClick}
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 text-left hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <svg className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">I'm a Patient</h3>
              <p className="text-slate-600 mb-4">
                Start your pre-consultation assessment. Answer a few questions to help your doctor prepare for your visit.
              </p>
              <span className="inline-flex items-center text-blue-600 font-medium">
                Start Checkup
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            {/* Doctor Card */}
            <button
              onClick={onDoctorClick}
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 text-left hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">I'm a Doctor</h3>
              <p className="text-slate-600 mb-4">
                Access your dashboard to view patient queue, AI-generated reports, and manage consultations.
              </p>
              <span className="inline-flex items-center text-emerald-600 font-medium">
                Login to Dashboard
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Features */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Fast Intake</h4>
              <p className="text-sm text-slate-600">Complete your pre-consultation in under 5 minutes</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">AI-Powered</h4>
              <p className="text-sm text-slate-600">Smart analysis to help doctors prepare better</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Secure & Private</h4>
              <p className="text-sm text-slate-600">Your health data is encrypted and protected</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          © 2024 MedFlow AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
