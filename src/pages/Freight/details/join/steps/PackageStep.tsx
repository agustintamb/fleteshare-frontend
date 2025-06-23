import { motion } from 'framer-motion';
import { AlertCircle, Package } from 'lucide-react';
import Input from '@/components/ui/Input';
import { JoinFormStepProps } from '../types';
import { usePackageStep } from './usePackageStep';
import PriceCalculation from '../components/PriceCalculation';

type PackageStepProps = Omit<JoinFormStepProps, 'isValid'>;

const PackageStep = ({ formData, updateFormData, freight }: PackageStepProps) => {
  const {
    packageDetails,
    updatePackageDetails,
    validation,
    priceCalculation,
    isCalculatingPrice,
    volumeM3,
    availableSpace,
    vehicleAssigned,
    excededSpace,
  } = usePackageStep({ formData, updateFormData, freight });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Detalles del Paquete</h3>

      {/* Info del espacio disponible */}
      {vehicleAssigned && (
        <div className={`p-4 rounded-lg mb-4 ${excededSpace ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} className={excededSpace ? 'text-red-600' : 'text-green-600'} />
            <h4 className={`font-medium ${excededSpace ? 'text-red-900' : 'text-green-900'}`}>
              {excededSpace ? 'Espacio Insuficiente' : 'Espacio Disponible en el Flete'}
            </h4>
          </div>
          <p className={`text-sm ${excededSpace ? 'text-red-700' : 'text-green-700'}`}>
            <strong>{availableSpace} m³</strong> disponibles de{' '}
            <strong>{freight.usedVolumeM3 + availableSpace} m³</strong> totales
          </p>
          {excededSpace && (
            <p className="text-sm text-red-700 mt-2">
              ⚠️ Tu paquete ({volumeM3} m³) excede el espacio disponible
            </p>
          )}
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Ancho (cm)"
            type="number"
            min="1"
            max="1000"
            value={packageDetails.width || ''}
            onChange={e => updatePackageDetails('width', Number(e.target.value))}
            fullWidth
          />

          <Input
            label="Alto (cm)"
            type="number"
            min="1"
            max="1000"
            value={packageDetails.height || ''}
            onChange={e => updatePackageDetails('height', Number(e.target.value))}
            fullWidth
          />

          <Input
            label="Largo (cm)"
            type="number"
            min="1"
            max="1000"
            value={packageDetails.length || ''}
            onChange={e => updatePackageDetails('length', Number(e.target.value))}
            fullWidth
          />
        </div>

        <Input
          label="Descripción del paquete"
          type="text"
          placeholder="Ej: Cajas con libros, muebles, una mesa, etc."
          value={packageDetails.description}
          onChange={e => updatePackageDetails('description', e.target.value)}
          fullWidth
        />

        {/* Mostrar volumen calculado */}
        {volumeM3 > 0 && (
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-700">
              <strong>Volumen calculado:</strong> {volumeM3} m³
            </p>
          </div>
        )}

        {priceCalculation && (
          <PriceCalculation
            priceCalculation={priceCalculation}
            isCalculating={isCalculatingPrice}
          />
        )}

        {/* Mostrar errores de validación */}
        {validation.errors && validation.errors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="text-red-500 mr-2 mt-0.5" size={16} />
              <div>
                <h4 className="text-sm font-medium text-red-800 mb-1">Errores de validación</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {validation.errors.map((error: string, index: number) => (
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

export default PackageStep;
