import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import Card from '@/components/ui/Card';

// Hooks
import { useNewFreightFlow } from './hooks/useNewFreightFlow';
import { useFormValidation } from './hooks/useFormValidation';

// Components
import ProgressIndicator from './components/ProgressIndicator';
import NavigationButtons from './components/NavigationButtons';
import LocationsStep from './steps/LocationsStep';
import PackageStep from './steps/PackageStep';
import ScheduleStep from './steps/ScheduleStep';
import ReviewStep from './steps/ReviewStep';

import { selectorFreigths } from '@/features/freights/slice';

const NewFreightRequest = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { priceCalculation } = useSelector(selectorFreigths);

  const { currentStep, formData, updateFormData, nextStep, prevStep, submitForm, isLoading } =
    useNewFreightFlow();

  const { getCurrentStepValidation } = useFormValidation({
    currentStep,
    formData,
  });

  const currentStepValidation = getCurrentStepValidation();

  // Verificar si el usuario es transportista
  useEffect(() => {
    if (currentUser?.role === 'transporter') {
      toast.error('Los transportistas no pueden crear fletes.');
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Manejar navegación con validación
  const handleNext = () => {
    if (currentStepValidation.isValid) {
      nextStep();
    }
  };

  const handleSubmit = () => {
    if (currentStepValidation.isValid && priceCalculation) {
      submitForm();
    }
  };

  if (currentUser?.role === 'transporter') return null;

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onPrev: prevStep,
      isValid: currentStepValidation.isValid,
      priceCalculation,
    };

    switch (currentStep) {
      case 'locations':
        return <LocationsStep {...stepProps} />;
      case 'package':
        return <PackageStep {...stepProps} />;
      case 'schedule':
        return <ScheduleStep {...stepProps} />;
      case 'review':
        return <ReviewStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-16 md:pb-0 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link to="/fletes" className="text-gray-500 hover:text-primary-600 mr-2">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Solicitar Nuevo Flete</h1>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} />

      {/* Main Content */}
      <Card className="p-4 sm:p-6" allowOverflow>
        {renderCurrentStep()}

        {/* Navigation Buttons */}
        <NavigationButtons
          currentStep={currentStep}
          isValid={
            currentStepValidation.isValid && (currentStep !== 'review' || !!priceCalculation)
          }
          isLoading={isLoading}
          onNext={handleNext}
          onPrev={prevStep}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default NewFreightRequest;
