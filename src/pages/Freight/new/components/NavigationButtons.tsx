import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { FormStep } from '../types';

interface NavigationButtonsProps {
  currentStep: FormStep;
  isValid: boolean;
  isLoading: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const NavigationButtons = ({
  currentStep,
  isValid,
  isLoading,
  onNext,
  onPrev,
  onSubmit,
}: NavigationButtonsProps) => {
  const isFirstStep = currentStep === 'locations';
  const isLastStep = currentStep === 'review';

  return (
    <div className="flex justify-between mt-8">
      {!isFirstStep ? (
        <Button variant="outline" onClick={onPrev} icon={<ArrowLeft size={18} />}>
          Anterior
        </Button>
      ) : (
        <div></div>
      )}

      {!isLastStep ? (
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!isValid}
          icon={<ArrowRight size={18} />}
          iconPosition="right"
        >
          Siguiente
        </Button>
      ) : (
        <Button variant="primary" onClick={onSubmit} isLoading={isLoading} disabled={!isValid}>
          Crear Flete
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
