import { useCallback, useMemo } from 'react';
import { FreightFormData, StepValidation } from '../../types';
import { formatDateWithWeekday, getStartOfTodayUTC } from '@/utils/time';

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

    if (!formData.scheduledDate)
      errors.push('Debes seleccionar una fecha válida para la programación');

    // Crear fecha seleccionada con hora específica para evitar problemas de zona horaria
    const selectedDate = new Date(`${formData.scheduledDate}T12:00:00`);

    // Fecha de hoy a las 00:00:00 para comparación
    const today = getStartOfTodayUTC();

    // Fecha máxima (30 días desde hoy)
    const maxAllowedDate = new Date();
    maxAllowedDate.setDate(maxAllowedDate.getDate() + 30);
    maxAllowedDate.setHours(23, 59, 59, 999);

    // Verificar que no sea anterior a hoy
    if (selectedDate < today) errors.push('No puedes seleccionar una fecha anterior al día de hoy');

    // Verificar que no sea más de 30 días en el futuro
    if (selectedDate > maxAllowedDate)
      errors.push('La fecha no puede ser más de 30 días en el futuro');

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }, [formData.scheduledDate]);

  const minDate = useMemo(() => {
    const today = getStartOfTodayUTC();
    return today.toISOString().split('T')[0];
  }, []);

  const maxDate = useMemo(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  }, []);

  const formattedDate = useMemo(() => {
    if (!formData.scheduledDate) return '';
    return formatDateWithWeekday(formData.scheduledDate);
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
