import { formatARS } from '@/utils/currency';
import { PriceCalculation as IPriceCalculation } from '@/interfaces/freight';

interface PriceCalculationProps {
  priceCalculation: IPriceCalculation | null;
  isCalculating: boolean;
}

const PriceCalculation = ({ priceCalculation, isCalculating }: PriceCalculationProps) => {
  if (!isCalculating && !priceCalculation) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <h4 className="font-medium text-gray-900 mb-3">Estimación de Precio</h4>

      {isCalculating ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
          <span className="text-sm text-gray-600">Calculando precio...</span>
        </div>
      ) : priceCalculation ? (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Por volumen ({priceCalculation.volumeM3} m³):</span>
            <span className="font-medium">{formatARS(priceCalculation.volumePrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Por distancia ({priceCalculation.distanceKm?.toFixed(1)} km):
            </span>
            <span className="font-medium">{formatARS(priceCalculation.distancePrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Comisión de servicio:</span>
            <span className="font-medium text-green-600">{formatARS(null)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-primary-600 pt-2 border-t border-gray-200">
            <span>Total Estimado:</span>
            <span>{formatARS(priceCalculation.totalPrice)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * El precio de puede variar al momento de confirmar el flete.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default PriceCalculation;
