import { PriceCalculation } from '@/interfaces/freight';
import { formatARS } from '@/utils/currency';

interface PriceSummaryProps {
  priceCalculation: PriceCalculation;
}

const PriceSummary = ({ priceCalculation }: PriceSummaryProps) => {
  return (
    <div className="bg-primary-50 p-4 rounded-md">
      <h3 className="font-medium text-primary-900 mb-3">Resumen de Precio</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Precio por volumen:</span>
          <span className="font-medium">{formatARS(priceCalculation.volumePrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Precio por distancia:</span>
          <span className="font-medium">{formatARS(priceCalculation.distancePrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Comisión de servicio:</span>
          <span className="font-medium text-green-600">{formatARS(null)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-primary-900 pt-2 border-t border-primary-200">
          <span>Precio Total estimado:</span>
          <span>{formatARS(priceCalculation.totalPrice)}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        * El precio puede variar al momento de confirmar el flete.
      </p>
    </div>
  );
};

export default PriceSummary;
