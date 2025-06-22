import { useMemo } from 'react';
import { JoinFormStep, JoinFreightFormData, StepValidation } from '../types';

interface UseFormValidationProps {
  currentStep: JoinFormStep;
  formData: JoinFreightFormData;
}

export const useFormValidation = ({ currentStep, formData }: UseFormValidationProps) => {
  const validateLocationsStep = useMemo((): StepValidation => {
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

  const validatePackageStep = useMemo((): StepValidation => {
    const errors: string[] = [];
    const { packageDetails } = formData;

    if (packageDetails.width <= 0) errors.push('El ancho debe ser mayor a 0');
    if (packageDetails.height <= 0) errors.push('El alto debe ser mayor a 0');
    if (packageDetails.length <= 0) errors.push('El largo debe ser mayor a 0');
    if (!packageDetails.description.trim()) {
      errors.push('La descripción del paquete es obligatoria');
    }

    // Validaciones de límites
    if (packageDetails.width > 1000) errors.push('El ancho no puede ser mayor a 1000 cm');
    if (packageDetails.height > 1000) errors.push('El alto no puede ser mayor a 1000 cm');
    if (packageDetails.length > 1000) errors.push('El largo no puede ser mayor a 1000 cm');

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.packageDetails]);

  const validateReviewStep = useMemo((): StepValidation => {
    // En el step de review, validamos que todos los pasos anteriores sean válidos
    const locationsValid = validateLocationsStep.isValid;
    const packageValid = validatePackageStep.isValid;

    return {
      isValid: locationsValid && packageValid,
      errors: [],
    };
  }, [validateLocationsStep.isValid, validatePackageStep.isValid]);

  const getCurrentStepValidation = () => {
    switch (currentStep) {
      case 'locations':
        return validateLocationsStep;
      case 'package':
        return validatePackageStep;
      case 'review':
        return validateReviewStep;
      default:
        return { isValid: false, errors: ['Step no válido'] };
    }
  };

  return {
    getCurrentStepValidation,
    validateLocationsStep,
    validatePackageStep,
    validateReviewStep,
  };
};
