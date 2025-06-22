import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectorFreigths } from '@/features/freights/slice';
import { emptyAddress } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { IFreight } from '@/interfaces/freight';
import { JoinFormStep, JoinFreightFormData } from '../types';

const steps: JoinFormStep[] = ['locations', 'package', 'review'];

interface UseJoinFreightFlowProps {
  freight: IFreight;
  onJoinSuccess?: () => void;
}

export const useJoinFreightFlow = ({ freight, onJoinSuccess }: UseJoinFreightFlowProps) => {
  const { currentUser } = useAuth();
  const { priceCalculation, isLoadingJoin: isLoading } = useSelector(selectorFreigths);

  const initialFormData: JoinFreightFormData = {
    pickup: currentUser?.address || emptyAddress,
    delivery: emptyAddress,
    packageDetails: {
      width: 0,
      height: 0,
      length: 0,
      description: '',
    },
  };

  const [formData, setFormData] = useState<JoinFreightFormData>(initialFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex];

  const updateFormData = useCallback((updates: Partial<JoinFreightFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const clearFormData = useCallback(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  const submitJoinForm = useCallback(async () => {
    // Aquí iría la lógica de join al freight
    // const joinData = {
    //   freightId: freight._id,
    //   pickupAddress: formData.pickup,
    //   deliveryAddress: formData.delivery,
    //   packageDimensions: {
    //     length: formData.packageDetails.length,
    //     width: formData.packageDetails.width,
    //     height: formData.packageDetails.height,
    //   },
    // };

    // await joinFreight(joinData);
    onJoinSuccess?.();
  }, [formData, freight._id, onJoinSuccess]);

  return {
    currentStep,
    currentStepIndex,
    formData,
    priceCalculation,
    updateFormData,
    clearFormData,
    nextStep,
    prevStep,
    submitJoinForm,
    isLoading,
  };
};
