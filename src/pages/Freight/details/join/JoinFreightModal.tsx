import { useJoinFreightFlow } from './hooks/useJoinFreightFlow';
import { useFormValidation } from './hooks/useFormValidation';
import { IFreight } from '@/interfaces/freight';
import Modal from '@/components/ui/Modal';
import ProgressIndicator from './components/ProgressIndicator';
import NavigationButtons from './components/NavigationButtons';
import LocationsStep from './steps/LocationsStep';
import PackageStep from './steps/PackageStep';
import ReviewStep from './steps/ReviewStep';

interface JoinFreightModalProps {
  open: boolean;
  onClose: () => void;
  freight: IFreight;
  onJoinSuccess?: () => void;
}

export const JoinFreightModal = ({
  open,
  onClose,
  freight,
  onJoinSuccess,
}: JoinFreightModalProps) => {
  const {
    currentStep,
    formData,
    updateFormData,
    clearFormData,
    nextStep,
    prevStep,
    submitJoinForm,
    isLoading,
    priceCalculation,
  } = useJoinFreightFlow({ freight, onJoinSuccess });

  const { getCurrentStepValidation } = useFormValidation({
    currentStep,
    formData,
  });

  const currentStepValidation = getCurrentStepValidation();

  const handleNext = () => {
    if (currentStepValidation.isValid) {
      nextStep();
    }
  };

  const handleJoinFreight = () => {
    if (currentStepValidation.isValid) submitJoinForm();
  };

  const handleOnCancel = () => {
    onClose();
    clearFormData();
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onPrev: prevStep,
      isValid: currentStepValidation.isValid,
      freight,
      priceCalculation,
    };

    console.log('Rendering step:', currentStep, stepProps);

    switch (currentStep) {
      case 'locations':
        return <LocationsStep {...stepProps} />;
      case 'package':
        return <PackageStep {...stepProps} />;
      case 'review':
        return <ReviewStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Unirse al Flete" size="lg">
      <div className="space-y-6">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Current Step Content */}
        <div className="">{renderCurrentStep()}</div>

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={currentStep}
          isValid={currentStepValidation.isValid}
          isLoading={isLoading}
          onNext={handleNext}
          onPrev={prevStep}
          onJoin={handleJoinFreight}
          onCancel={handleOnCancel}
        />
      </div>
    </Modal>
  );
};
