import { DollarSign, Target, MapPin } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';

interface PerformanceSummaryProps {
  userFreights: IFreight[];
}

export const PerformanceSummary = ({ userFreights }: PerformanceSummaryProps) => {
  const completedFreights = userFreights.filter(freight => freight.status === 'finished').length;

  const totalEarnings = userFreights
    .filter(freight => freight.status === 'finished')
    .reduce((total, freight) => total + freight.totalPrice, 0);

  // Find best earning freight
  const bestFreight = userFreights
    .filter(freight => freight.status === 'finished')
    .reduce((best, current) => {
      if (!best) return current;
      const currentRate = current.totalPrice / (current.suggestedRoute?.totalDistance || 1);
      const bestRate = best.totalPrice / (best.suggestedRoute?.totalDistance || 1);
      return currentRate > bestRate ? current : best;
    }, null as IFreight | null);

  const bestEarningRate = bestFreight
    ? Math.round(bestFreight.totalPrice / (bestFreight.suggestedRoute?.totalDistance || 1))
    : 0;

  return (
    <>
      {/* Performance Summary */}
      {totalEarnings > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-green-100 rounded">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <span className="font-semibold text-green-800">💰 Resumen de ganancias</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Has ganado ${totalEarnings.toLocaleString('es-AR')} en {completedFreights} fletes
              completados
            </span>
            {bestEarningRate > 0 && (
              <span className="font-semibold text-green-800">
                Mejor tarifa: ${bestEarningRate.toLocaleString('es-AR')}/km
              </span>
            )}
          </div>
        </div>
      )}

      {/* Best Opportunity Alert */}
      {bestFreight && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-yellow-100 rounded">
              <Target className="h-4 w-4 text-yellow-600" />
            </div>
            <span className="font-semibold text-yellow-800">🏆 Tu Mejor Flete Completado</span>
            <span className="ml-auto text-lg font-bold text-yellow-900">
              ${bestEarningRate.toLocaleString('es-AR')}/km
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Flete #{bestFreight._id.slice(-8)}</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-green-500" />
                {bestFreight.participants[0]?.pickupAddress.city} →{' '}
                {bestFreight.participants[0]?.deliveryAddress.city}
              </span>
            </div>
            <div className="font-semibold text-yellow-800">
              ${bestFreight.totalPrice.toLocaleString('es-AR')} •{' '}
              {bestFreight.suggestedRoute?.totalDistance || 0}km
            </div>
          </div>
        </div>
      )}
    </>
  );
};
