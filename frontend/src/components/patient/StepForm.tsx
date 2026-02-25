import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepFormProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  isLastStep?: boolean;
  nextLabel?: string;
  isSubmitting?: boolean;
}

export function StepForm({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  canProceed,
  isLastStep = false,
  nextLabel = 'Continue',
  isSubmitting = false
}: StepFormProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-600">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-slate-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 h-12 text-base"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={!canProceed || isSubmitting}
            className="flex-1 h-12 text-base bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Submitting...' : nextLabel}
            {!isLastStep && !isSubmitting && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </div>

      {/* Spacer for fixed bottom bar */}
      <div className="h-24" />
    </div>
  );
}
