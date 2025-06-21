import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useAuth } from '@/hooks/useAuth';
import { emptyAddress } from '@/utils/constants';
import { FormStep, FreightFormData } from '../types';
import { CreateFreightRequest } from '@/interfaces/freight';
import { toast } from 'react-toastify';
import { cleanPriceCalculation, selectorFreigths } from '@/features/freights/slice';
import { createFreight } from '@/features/freights/asyncActions';

export const useNewFreightFlow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(selectorFreigths);
  const { currentUser } = useAuth();

  const [currentStep, setCurrentStep] = useState<FormStep>('locations');
  const [formData, setFormData] = useState<FreightFormData>({
    pickup: currentUser?.address || emptyAddress,
    delivery: emptyAddress,
    packageDetails: {
      width: 0,
      height: 0,
      length: 0,
      description: '',
    },
    scheduledDate: '',
  });

  const updateFormData = useCallback((updates: Partial<FreightFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const nextStep = useCallback(() => {
    const stepOrder: FormStep[] = ['locations', 'package', 'schedule', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    const stepOrder: FormStep[] = ['locations', 'package', 'schedule', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  }, [currentStep]);

  const submitForm = useCallback(async () => {
    try {
      const freightRequest: CreateFreightRequest = {
        pickupAddress: formData.pickup,
        deliveryAddress: formData.delivery,
        packageDimensions: {
          length: formData.packageDetails.length,
          width: formData.packageDetails.width,
          height: formData.packageDetails.height,
        },
        scheduledDate: new Date(formData.scheduledDate).toISOString(),
      };
      dispatch(createFreight(freightRequest))
        .unwrap()
        .then(response => {
          if (response.result) navigate(`/freight/${response.result._id}`);
        });
    } catch (error) {
      console.error('Error creating freight request:', error);
      toast.error('Error al crear el flete');
    }
  }, [formData, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(cleanPriceCalculation());
      setFormData({
        pickup: currentUser?.address || emptyAddress,
        delivery: emptyAddress,
        packageDetails: {
          width: 0,
          height: 0,
          length: 0,
          description: '',
        },
        scheduledDate: '',
      });
    };
  }, [currentUser]);

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    submitForm,
    isLoading,
  };
};
