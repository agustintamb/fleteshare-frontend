import { useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { FreightFormData, StepValidation } from '../../types';
import { CalculatePriceRequest } from '@/interfaces/freight';
import { selectorFreigths } from '@/features/freights/slice';
import { calculatePrice } from '@/features/freights/asyncActions';

interface UsePackageStepProps {
  formData: FreightFormData;
  updateFormData: (updates: Partial<FreightFormData>) => void;
}

export const usePackageStep = ({ formData, updateFormData }: UsePackageStepProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { priceCalculation, isLoading } = useSelector(selectorFreigths);

  const updatePackageDetails = useCallback(
    (field: keyof typeof formData.packageDetails, value: string | number) => {
      updateFormData({
        packageDetails: {
          ...formData.packageDetails,
          [field]: value,
        },
      });
    },
    [formData.packageDetails, updateFormData]
  );

  const validation = useMemo((): StepValidation => {
    const errors: string[] = [];
    const { packageDetails } = formData;

    if (packageDetails.width <= 0) errors.push('El ancho debe ser mayor a 0');
    if (packageDetails.height <= 0) errors.push('El alto debe ser mayor a 0');
    if (packageDetails.length <= 0) errors.push('El largo debe ser mayor a 0');
    if (!packageDetails.description.trim())
      errors.push('La descripción del paquete es obligatoria');

    // Validaciones de límites
    if (packageDetails.width > 1000) errors.push('El ancho no puede ser mayor a 1000 cm');
    if (packageDetails.height > 1000) errors.push('El alto no puede ser mayor a 1000 cm');
    if (packageDetails.length > 1000) errors.push('El largo no puede ser mayor a 1000 cm');

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.packageDetails]);

  // Auto-calcular precio cuando cambian las dimensiones o direcciones
  useEffect(() => {
    const calculatePriceAsync = async () => {
      const { packageDetails, pickup, delivery } = formData;
      if (
        packageDetails.width > 0 &&
        packageDetails.height > 0 &&
        packageDetails.length > 0 &&
        pickup.latitude !== 0 &&
        pickup.longitude !== 0 &&
        delivery.latitude !== 0 &&
        delivery.longitude !== 0
      ) {
        const priceRequest: CalculatePriceRequest = {
          packageDimensions: {
            length: packageDetails.length,
            width: packageDetails.width,
            height: packageDetails.height,
          },
          pickupAddress: {
            latitude: pickup.latitude,
            longitude: pickup.longitude,
          },
          deliveryAddress: {
            latitude: delivery.latitude,
            longitude: delivery.longitude,
          },
        };

        dispatch(calculatePrice(priceRequest));
      }
    };

    // Debounce para evitar muchas llamadas
    const timeoutId = setTimeout(calculatePriceAsync, 500);
    return () => clearTimeout(timeoutId);
  }, [
    formData.packageDetails.width,
    formData.packageDetails.height,
    formData.packageDetails.length,
    formData.pickup.latitude,
    formData.pickup.longitude,
    formData.delivery.latitude,
    formData.delivery.longitude,
    dispatch,
  ]);

  const volumeM3 = useMemo(() => {
    const { width, height, length } = formData.packageDetails;
    if (width > 0 && height > 0 && length > 0) return (width * height * length) / 1000000; // convertir cm³ a m³
    return 0;
  }, [formData.packageDetails]);

  return {
    packageDetails: formData.packageDetails,
    updatePackageDetails,
    validation,
    priceCalculation,
    isCalculatingPrice: isLoading,
    volumeM3,
  };
};
