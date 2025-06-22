import { motion } from 'framer-motion';
import { AlertCircle, Calendar } from 'lucide-react';
import Input from '@/components/ui/Input';
import { FormStepProps } from '../../types';
import { useScheduleStep } from './useScheduleStep';

type ScheduleStepProps = Omit<FormStepProps, 'isValid'>;

const ScheduleStep = ({ formData, updateFormData }: ScheduleStepProps) => {
  const { scheduledDate, updateScheduledDate, validation, minDate, maxDate, formattedDate } =
    useScheduleStep({ formData, updateFormData });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Fecha de Programación</h2>

      <div className="space-y-6">
        <Input
          label="Fecha deseada"
          type="date"
          min={minDate}
          max={maxDate}
          value={scheduledDate}
          onChange={e => updateScheduledDate(e.target.value)}
          fullWidth
          icon={<Calendar size={18} />}
        />

        {/* Mostrar fecha formateada */}
        {scheduledDate && scheduledDate >= minDate && (
          <div className="bg-green-50 p-3 rounded-md">
            <div className="flex items-start">
              <Calendar className="text-green-500 mr-2 mt-0.5" size={16} />
              <div>
                <p className="text-sm text-green-700">
                  <strong>Fecha seleccionada:</strong> {formattedDate}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mostrar errores de validación */}
        {validation.errors && validation.errors.length > 0 && (
          <div className="bg-red-50 p-3 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="text-red-500 mr-2 mt-0.5" size={16} />
              <div>
                {validation.errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-800">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 p-3 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-500 mr-2 mt-0.5" size={16} />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                El horario exacto lo coordinarás con el transportista
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleStep;
