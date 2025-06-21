import { MapPin, Package, Calendar, DollarSign } from 'lucide-react';
import { FormStep } from '../types';

interface ProgressIndicatorProps {
  currentStep: FormStep;
}

const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
  const steps = [
    { key: 'locations', icon: MapPin, label: 'Ubicaciones' },
    { key: 'package', icon: Package, label: 'Paquete' },
    { key: 'schedule', icon: Calendar, label: 'Programación' },
    { key: 'review', icon: DollarSign, label: 'Revisión' },
  ] as const;

  const getStepIndex = (step: FormStep) => steps.findIndex(s => s.key === step);
  const currentIndex = getStepIndex(currentStep);

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const getStepClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          container: 'text-primary-600',
          circle: 'bg-primary-500 text-white',
          line: 'bg-primary-500',
        };
      case 'current':
        return {
          container: 'text-primary-600',
          circle: 'bg-primary-100 text-primary-600',
          line: 'bg-gray-200',
        };
      default:
        return {
          container: 'text-gray-500',
          circle: 'bg-gray-200 text-gray-500',
          line: 'bg-gray-200',
        };
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const classes = getStepClasses(status);
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className={`flex flex-col items-center ${classes.container}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${classes.circle}`}
                >
                  <Icon size={16} />
                </div>
                <span className="text-xs">{step.label}</span>
              </div>

              {!isLast && <div className={`flex-1 h-0.5 mx-2 ${classes.line}`}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
