import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { FormStepProps } from '../../types';
import { ROUTES } from '@/utils/constants';
import { useLocationsStep } from './useLocationsStep';
import AddressSelector from '@/components/AddressSelector';

type LocationsStepProps = Omit<FormStepProps, 'isValid'>;

const LocationsStep = ({ formData, updateFormData }: LocationsStepProps) => {
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Información de Origen y Destino</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-3">Dirección de Origen</h3>
          <div className="bg-blue-50 p-3 rounded-md mb-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-700">
                Se usa la dirección configurada de tu perfil como origen por defecto.
              </p>
              <Link
                to={ROUTES.PROFILE}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
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
          <h3 className="text-md font-medium text-gray-900 mb-3">Dirección de Destino</h3>
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
          <div className="bg-red-50 p-4 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="text-red-500 mr-2 mt-0.5" size={16} />
              <div>
                <ul className="text-sm text-red-700 space-y-1">
                  {validation.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
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
