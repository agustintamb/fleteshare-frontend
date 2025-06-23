import { useCallback, useMemo } from 'react';
import { IAddress } from '@/interfaces/address';
import { JoinFreightFormData, StepValidation } from '../types';
import { emptyAddress } from '@/utils/constants';

interface UseLocationsStepProps {
  formData: JoinFreightFormData;
  updateFormData: (updates: Partial<JoinFreightFormData>) => void;
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

    if (!formData.pickup.formattedAddress.trim()) {
      errors.push('La dirección de origen es obligatoria');
    }

    if (!formData.delivery.formattedAddress.trim()) {
      errors.push('La dirección de destino es obligatoria');
    }

    // Verificar que no sean la misma dirección
    if (
      formData.pickup.formattedAddress.trim() &&
      formData.delivery.formattedAddress.trim() &&
      formData.pickup.formattedAddress === formData.delivery.formattedAddress
    ) {
      errors.push('Las direcciones de origen y destino no pueden ser iguales');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.pickup, formData.delivery]);

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
