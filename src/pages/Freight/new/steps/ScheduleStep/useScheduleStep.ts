import { useCallback, useMemo } from 'react';
import { FreightFormData, StepValidation } from '../../types';

interface UseScheduleStepProps {
  formData: FreightFormData;
  updateFormData: (updates: Partial<FreightFormData>) => void;
}

export const useScheduleStep = ({ formData, updateFormData }: UseScheduleStepProps) => {
  const updateScheduledDate = useCallback(
    (date: string) => {
      updateFormData({
        scheduledDate: date,
      });
    },
    [updateFormData]
  );

  const validation = useMemo((): StepValidation => {
    const errors: string[] = [];

    if (!formData.scheduledDate) errors.push('La fecha programada es obligatoria');

    if (formData.scheduledDate) {
      const selectedDate = new Date(formData.scheduledDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      // Verificar que no sea más de 30 días en el futuro
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      if (selectedDate > maxDate) errors.push('La fecha no puede ser más de 30 días en el futuro');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.scheduledDate]);

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  const maxDate = useMemo(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  }, []);

  const formattedDate = useMemo(() => {
    if (!formData.scheduledDate) return '';
    const date = new Date(`${formData.scheduledDate}T12:00:00`);
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [formData.scheduledDate]);

  return {
    scheduledDate: formData.scheduledDate,
    updateScheduledDate,
    validation,
    minDate,
    maxDate,
    formattedDate,
  };
};
