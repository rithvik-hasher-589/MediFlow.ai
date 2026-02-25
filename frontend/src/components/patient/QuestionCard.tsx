import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { Question } from '@/types';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  value: string | number | boolean | Date | undefined;
  onChange: (value: string | number | boolean | Date) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            type="text"
            placeholder="Type your answer..."
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 text-base"
          />
        );

      case 'multiple-choice':
        return (
          <RadioGroup
            value={(value as string) || ''}
            onValueChange={onChange}
            className="space-y-2"
          >
            {question.options?.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => onChange(option)}
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'yes-no':
        return (
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
            <span className="text-slate-700">
              {(value as boolean) ? 'Yes' : 'No'}
            </span>
            <Switch
              checked={(value as boolean) || false}
              onCheckedChange={onChange}
            />
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{question.min}</span>
              <span className="text-2xl font-bold text-blue-600">
                {value !== undefined ? String(value) : question.min}
              </span>
              <span className="text-sm text-slate-500">{question.max}</span>
            </div>
            <Slider
              value={[(value as number) || question.min || 0]}
              onValueChange={([val]) => onChange(val)}
              min={question.min}
              max={question.max}
              step={1}
              className="w-full"
            />
          </div>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal h-12',
                  !value && 'text-slate-400'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(value as Date, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value as Date}
                onSelect={(date) => date && onChange(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="border-slate-200">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start gap-2">
          <span className="text-blue-600 font-semibold">Q.</span>
          <Label className="text-base font-medium text-slate-900 leading-relaxed">
            {question.question}
            {question.required && (
              <span className="text-rose-500 ml-1">*</span>
            )}
          </Label>
        </div>
        <div className="pl-6">{renderQuestionInput()}</div>
      </CardContent>
    </Card>
  );
}
