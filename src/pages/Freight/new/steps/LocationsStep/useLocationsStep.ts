import { useCallback, useMemo } from 'react';
import { IAddress } from '@/interfaces/address';
import { FreightFormData, StepValidation } from '../../types';
import { emptyAddress } from '@/utils/constants';

interface UseLocationsStepProps {
  formData: FreightFormData;
  updateFormData: (updates: Partial<FreightFormData>) => void;
}

export const useLocationsStep = ({ formData, updateFormData }: UseLocationsStepProps) => {
  const updatePickupAddress = useCallback(
    (address: IAddress | null) => {
      updateFormData({
        pickup: address || emptyAddress,
      });
    },
    [updateFormData]
  );

  const updateDeliveryAddress = useCallback(
    (address: IAddress | null) => {
      updateFormData({
        delivery: address || emptyAddress,
      });
    },
    [updateFormData]
  );

  const validation = useMemo((): StepValidation => {
    const errors: string[] = [];

    if (!formData.pickup.formattedAddress.trim())
      errors.push('La dirección de origen es obligatoria');

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.pickup]);

  const generateMapsUrl = useCallback((address: IAddress) => {
    if (!address.latitude || !address.longitude) return null;
    return `https://www.google.com/maps/search/?api=1&query=${address.latitude},${address.longitude}`;
  }, []);

  return {
    pickup: formData.pickup,
    delivery: formData.delivery,
    updatePickupAddress,
    updateDeliveryAddress,
    validation,
    generateMapsUrl,
  };
};
