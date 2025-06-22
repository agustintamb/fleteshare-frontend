import Button from '@/components/ui/Button';
import { JoinFormStep } from '../types';

interface NavigationButtonsProps {
  currentStep: JoinFormStep;
  isValid: boolean;
  isLoading: boolean;
  onNext: () => void;
  onPrev: () => void;
  onJoin: () => void;
  onCancel: () => void;
}

const NavigationButtons = ({
  currentStep,
  isValid,
  isLoading,
  onNext,
  onPrev,
  onJoin,
  onCancel,
}: NavigationButtonsProps) => {
  const isFirstStep = currentStep === 'locations';
  const isLastStep = currentStep === 'review';

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <div className="flex gap-3">
        {isFirstStep ? (
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
        ) : (
          <Button variant="outline" onClick={onPrev} disabled={isLoading}>
            Anterior
          </Button>
        )}
      </div>

      <div>
        {isLastStep ? (
          <Button
            variant="primary"
            onClick={onJoin}
            disabled={!isValid || isLoading}
            isLoading={isLoading}
          >
            Unirse al Flete
          </Button>
        ) : (
          <Button variant="primary" onClick={onNext} disabled={!isValid || isLoading}>
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
