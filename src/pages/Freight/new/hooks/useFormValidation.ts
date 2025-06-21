import { useMemo } from 'react';
import { FormStep, FreightFormData, StepValidation } from '../types';

interface UseFormValidationProps {
  currentStep: FormStep;
  formData: FreightFormData;
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

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.pickup, formData.delivery]);

  const validatePackageStep = useMemo((): StepValidation => {
    const errors: string[] = [];
    const { packageDetails } = formData;

    if (packageDetails.width <= 0) {
      errors.push('El ancho debe ser mayor a 0');
    }

    if (packageDetails.height <= 0) {
      errors.push('El alto debe ser mayor a 0');
    }

    if (packageDetails.length <= 0) {
      errors.push('El largo debe ser mayor a 0');
    }

    if (!packageDetails.description.trim()) {
      errors.push('La descripción del paquete es obligatoria');
    }

    // Validaciones de límites
    if (packageDetails.width > 1000) {
      errors.push('El ancho no puede ser mayor a 1000 cm');
    }

    if (packageDetails.height > 1000) {
      errors.push('El alto no puede ser mayor a 1000 cm');
    }

    if (packageDetails.length > 1000) {
      errors.push('El largo no puede ser mayor a 1000 cm');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.packageDetails]);

  const validateScheduleStep = useMemo((): StepValidation => {
    const errors: string[] = [];

    if (!formData.scheduledDate) {
      errors.push('La fecha programada es obligatoria');
    }

    if (formData.scheduledDate) {
      const selectedDate = new Date(formData.scheduledDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (selectedDate < tomorrow) {
        errors.push('La fecha debe ser al menos 24 horas en el futuro');
      }

      // Verificar que no sea más de 30 días en el futuro
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      if (selectedDate > maxDate) {
        errors.push('La fecha no puede ser más de 30 días en el futuro');
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.scheduledDate]);

  const validateReviewStep = useMemo((): StepValidation => {
    // Para el review, validamos que todos los pasos anteriores sean válidos
    const locationsValid = validateLocationsStep.isValid;
    const packageValid = validatePackageStep.isValid;
    const scheduleValid = validateScheduleStep.isValid;

    return {
      isValid: locationsValid && packageValid && scheduleValid,
      errors:
        !locationsValid || !packageValid || !scheduleValid
          ? ['Por favor, revisa los pasos anteriores para corregir los errores']
          : undefined,
    };
  }, [validateLocationsStep, validatePackageStep, validateScheduleStep]);

  const getCurrentStepValidation = (): StepValidation => {
    switch (currentStep) {
      case 'locations':
        return validateLocationsStep;
      case 'package':
        return validatePackageStep;
      case 'schedule':
        return validateScheduleStep;
      case 'review':
        return validateReviewStep;
      default:
        return { isValid: false };
    }
  };

  return {
    getCurrentStepValidation,
    validateLocationsStep,
    validatePackageStep,
    validateScheduleStep,
    validateReviewStep,
  };
};
