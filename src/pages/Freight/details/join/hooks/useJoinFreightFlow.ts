import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { selectorFreigths } from '@/features/freights/slice';
import { joinFreight } from '@/features/freights/asyncActions';
import { emptyAddress } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { IFreight } from '@/interfaces/freight';
import { JoinFormStep, JoinFreightFormData } from '../types';

const steps: JoinFormStep[] = ['locations', 'package', 'review'];

interface UseJoinFreightFlowProps {
  freight: IFreight;
  refetch: () => void;
}

export const useJoinFreightFlow = ({ freight, refetch }: UseJoinFreightFlowProps) => {
  const dispatch: AppDispatch = useDispatch();
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

  const submitJoinForm = useCallback(() => {
    const params = {
      freightId: freight._id,
      joinData: {
        pickupAddress: formData.pickup,
        deliveryAddress: formData.delivery,
        packageDimensions: {
          length: formData.packageDetails.length,
          width: formData.packageDetails.width,
          height: formData.packageDetails.height,
        },
      },
    };
    dispatch(joinFreight(params)).then(() => {
      refetch();
    });
  }, [formData, freight._id]);

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
