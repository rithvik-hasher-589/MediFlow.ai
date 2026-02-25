import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepForm } from '@/components/patient/StepForm';
import { HealthConcernCard } from '@/components/patient/HealthConcernCard';
import { QuestionCard } from '@/components/patient/QuestionCard';
import type { PatientDetails } from '@/types';
import { healthConcerns, mockQuestions } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit2, User, Calendar, Phone, FileText } from 'lucide-react';
import { submitIntake } from '@/lib/api/intake.api';

interface PatientIntakeFlowProps {
  onComplete: () => void;
}

const TOTAL_STEPS = 5;

export function PatientIntakeFlow({ onComplete }: PatientIntakeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    fullName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    visitType: 'new'
  });
  const [selectedConcern, setSelectedConcern] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string | number | boolean | Date>>({});
  const [queueNumber, setQueueNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleNext = async () => {
    if (currentStep === TOTAL_STEPS - 2) {
      setSubmitError(null);
      setIsSubmitting(true);
      const ageNum = Number(patientDetails.age);
      if (Number.isNaN(ageNum)) {
        setSubmitError('Please enter a valid age.');
        setIsSubmitting(false);
        return;
      }
      const healthConcernTitle =
        healthConcerns.find((c) => c.id === selectedConcern)?.title ?? selectedConcern;
      const questions = mockQuestions[selectedConcern] ?? [];
      const answersPayload = questions.map((q) => ({
        question: q.question,
        answer: String(answers[q.id] ?? '')
      }));
      try {
        const result = await submitIntake({
          fullName: patientDetails.fullName,
          age: ageNum,
          gender: patientDetails.gender,
          phone: patientDetails.phoneNumber,
          visitType: patientDetails.visitType,
          healthConcern: healthConcernTitle,
          answers: answersPayload
        });
        setQueueNumber(result.queueNumber);
        setCurrentStep(TOTAL_STEPS - 1);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Submission failed');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return (
          patientDetails.fullName.trim() !== '' &&
          patientDetails.age.trim() !== '' &&
          patientDetails.gender !== '' &&
          patientDetails.phoneNumber.trim() !== ''
        );
      case 1:
        return selectedConcern !== '';
      case 2:
        const questions = mockQuestions[selectedConcern] || [];
        return questions.every((q) => !q.required || answers[q.id] !== undefined);
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleAnswerChange = (questionId: string, value: string | number | boolean | Date) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PatientDetailsStep details={patientDetails} onChange={setPatientDetails} />;
      case 1:
        return (
          <HealthConcernStep
            selectedConcern={selectedConcern}
            onSelect={setSelectedConcern}
          />
        );
      case 2:
        return (
          <QuestionnaireStep
            concernId={selectedConcern}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
        );
      case 3:
        return (
          <ReviewStep
            patientDetails={patientDetails}
            selectedConcern={selectedConcern}
            answers={answers}
            onEdit={(step) => setCurrentStep(step)}
          />
        );
      case 4:
        return <SuccessStep queueNumber={queueNumber} onComplete={onComplete} />;
      default:
        return null;
    }
  };

  if (currentStep === 4) {
    return <SuccessStep queueNumber={queueNumber} onComplete={onComplete} />;
  }

  return (
    <StepForm
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceed()}
      isLastStep={currentStep === TOTAL_STEPS - 2}
      nextLabel={currentStep === TOTAL_STEPS - 2 ? 'Submit Assessment' : 'Continue'}
      isSubmitting={isSubmitting}
    >
      {submitError && currentStep === 3 && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {submitError}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </StepForm>
  );
}

// Step 1: Patient Details
interface PatientDetailsStepProps {
  details: PatientDetails;
  onChange: (details: PatientDetails) => void;
}

function PatientDetailsStep({ details, onChange }: PatientDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Patient Details</h2>
        <p className="text-slate-600">Please provide your basic information</p>
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-700">
              Full Name <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={details.fullName}
                onChange={(e) => onChange({ ...details, fullName: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-slate-700">
                Age <span className="text-rose-500">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="age"
                  type="number"
                  placeholder="Years"
                  value={details.age}
                  onChange={(e) => onChange({ ...details, age: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-slate-700">
                Gender <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={details.gender}
                onValueChange={(value) => onChange({ ...details, gender: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700">
              Phone Number <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={details.phoneNumber}
                onChange={(e) => onChange({ ...details, phoneNumber: e.target.value })}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700">Visit Type</Label>
            <RadioGroup
              value={details.visitType}
              onValueChange={(value: 'new' | 'follow-up') =>
                onChange({ ...details, visitType: value })
              }
              className="grid grid-cols-2 gap-3"
            >
              <div>
                <RadioGroupItem
                  value="new"
                  id="new"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="new"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all"
                >
                  <FileText className="mb-2 h-5 w-5 text-slate-600 peer-data-[state=checked]:text-blue-600" />
                  <span className="text-sm font-medium text-slate-900">New Visit</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="follow-up"
                  id="follow-up"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="follow-up"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all"
                >
                  <Calendar className="mb-2 h-5 w-5 text-slate-600 peer-data-[state=checked]:text-blue-600" />
                  <span className="text-sm font-medium text-slate-900">Follow-up</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Step 2: Health Concern
interface HealthConcernStepProps {
  selectedConcern: string;
  onSelect: (concern: string) => void;
}

function HealthConcernStep({ selectedConcern, onSelect }: HealthConcernStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Health Concern</h2>
        <p className="text-slate-600">What brings you in today?</p>
      </div>

      <div className="space-y-3">
        {healthConcerns.map((concern) => (
          <HealthConcernCard
            key={concern.id}
            concern={concern}
            isSelected={selectedConcern === concern.id}
            onClick={() => onSelect(concern.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Step 3: Questionnaire
interface QuestionnaireStepProps {
  concernId: string;
  answers: Record<string, string | number | boolean | Date>;
  onAnswerChange: (questionId: string, value: string | number | boolean | Date) => void;
}

function QuestionnaireStep({ concernId, answers, onAnswerChange }: QuestionnaireStepProps) {
  const questions = mockQuestions[concernId] || [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Health Questionnaire</h2>
        <p className="text-slate-600">Please answer a few questions about your symptoms</p>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => onAnswerChange(question.id, value)}
          />
        ))}
      </div>
    </div>
  );
}

// Step 4: Review
interface ReviewStepProps {
  patientDetails: PatientDetails;
  selectedConcern: string;
  answers: Record<string, string | number | boolean | Date>;
  onEdit: (step: number) => void;
}

function ReviewStep({ patientDetails, selectedConcern, answers, onEdit }: ReviewStepProps) {
  const concern = healthConcerns.find((c) => c.id === selectedConcern);
  const questions = mockQuestions[selectedConcern] || [];

  const formatAnswer = (_question: typeof questions[0], answer: unknown) => {
    if (answer === undefined) return 'Not answered';
    if (typeof answer === 'boolean') return answer ? 'Yes' : 'No';
    if (answer instanceof Date) return answer.toLocaleDateString();
    return String(answer);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Review Your Answers</h2>
        <p className="text-slate-600">Please review your information before submitting</p>
      </div>

      {/* Patient Details Summary */}
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(0)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Name:</span>
              <p className="font-medium text-slate-900">{patientDetails.fullName}</p>
            </div>
            <div>
              <span className="text-slate-500">Age:</span>
              <p className="font-medium text-slate-900">{patientDetails.age} years</p>
            </div>
            <div>
              <span className="text-slate-500">Gender:</span>
              <p className="font-medium text-slate-900 capitalize">{patientDetails.gender}</p>
            </div>
            <div>
              <span className="text-slate-500">Phone:</span>
              <p className="font-medium text-slate-900">{patientDetails.phoneNumber}</p>
            </div>
            <div>
              <span className="text-slate-500">Visit Type:</span>
              <p className="font-medium text-slate-900 capitalize">
                {patientDetails.visitType === 'new' ? 'New Visit' : 'Follow-up'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Concern Summary */}
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Health Concern
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <p className="font-medium text-slate-900">{concern?.title}</p>
          <p className="text-sm text-slate-600 mt-1">{concern?.description}</p>
        </CardContent>
      </Card>

      {/* Answers Summary */}
      <Card className="border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Your Responses
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="space-y-3">
            {questions.map((question) => (
              <div key={question.id} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <p className="text-sm text-slate-500">{question.question}</p>
                <p className="font-medium text-slate-900">
                  {formatAnswer(question, answers[question.id])}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Step 5: Success
interface SuccessStepProps {
  queueNumber: string;
  onComplete: () => void;
}

function SuccessStep({ queueNumber, onComplete }: SuccessStepProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full"
      >
        <Card className="border-slate-200 text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Assessment Submitted Successfully
          </h2>
          <p className="text-slate-600 mb-6">
            Your doctor will review your report before consultation.
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-slate-600 mb-1">Your Queue Number</p>
            <p className="text-4xl font-bold text-blue-600">{queueNumber}</p>
          </div>

          <div className="space-y-3 text-sm text-slate-500 mb-6">
            <p>Please save this number for your reference.</p>
            <p>You will be called shortly.</p>
          </div>

          <Button
            onClick={onComplete}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            Return to Home
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
