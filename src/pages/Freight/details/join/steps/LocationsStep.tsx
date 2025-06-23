import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { JoinFormStepProps } from '../types';
import { ROUTES } from '@/utils/constants';
import { useLocationsStep } from './useLocationsStep';
import AddressSelector from '@/components/AddressSelector';
import { formatDateWithWeekday } from '@/utils/time';

type LocationsStepProps = Omit<JoinFormStepProps, 'isValid'>;

const LocationsStep = ({ formData, updateFormData, freight }: LocationsStepProps) => {
  const {
    pickup,
    delivery,
    updatePickupAddress,
    updateDeliveryAddress,
    validation,
    generateMapsUrl,
  } = useLocationsStep({ formData, updateFormData });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Info del flete */}
      <p className="text-sm text-blue-700 mb-3">
        Flete programado para el día{' '}
        <strong>{formatDateWithWeekday(new Date(freight.scheduledDate))}</strong> con{' '}
        <strong>
          {freight.participants.length} participante
          {freight.participants.length === 1 ? '' : 's'}
        </strong>{' '}
        actual{freight.participants.length === 1 ? '' : 'es'}.
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">Información de Origen y Destino</h3>

      <div className="space-y-3">
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-1">Dirección de Origen</h4>
          <div className="bg-blue-50 p-3 rounded-md mb-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-blue-700">
                Se usa la dirección configurada de tu perfil como origen por defecto.
              </p>
              <Link
                to={ROUTES.PROFILE}
                className="text-blue-600 hover:text-blue-800 text-xs font-medium underline"
              >
                Modificar
              </Link>
            </div>
          </div>
          <AddressSelector
            disabled
            value={pickup}
            onChange={updatePickupAddress}
            placeholder="Buscar dirección de origen..."
          />
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 mb-2">Dirección de Destino</h4>
          <AddressSelector
            value={delivery}
            onChange={updateDeliveryAddress}
            placeholder="Buscar dirección de destino..."
          />
          {delivery.formattedAddress && (
            <div className="mt-2">
              <a
                href={generateMapsUrl(delivery) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Ver en Google Maps
              </a>
            </div>
          )}
        </div>

        {/* Mostrar errores de validación */}
        {validation.errors && validation.errors.length > 0 && (
          <div className="bg-red-50 p-2 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="text-red-500 mr-2 mt-0.5" size={16} />
              <div>
                <ul className="text-sm text-red-700">
                  {validation.errors.map((error: string, index: number) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LocationsStep;
