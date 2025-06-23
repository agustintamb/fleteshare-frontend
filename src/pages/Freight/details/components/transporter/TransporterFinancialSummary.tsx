import { DollarSign } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';
import { formatARS } from '@/utils/currency';

interface TransporterFinancialSummaryProps {
  freight: IFreight;
}

export const TransporterFinancialSummary = ({ freight }: TransporterFinancialSummaryProps) => {
  if (freight.status === 'canceled') return null;
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <DollarSign size={20} />
        Resumen Financiero
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Ingreso total</span>
          <span className="font-semibold text-green-600 text-lg">
            {formatARS(freight.totalPrice)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Por participante</span>
          <span className="font-medium">
            {formatARS(Math.round(freight.totalPrice / freight.participants.length))} promedio
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Distancia total</span>
          <span className="font-medium">{freight.suggestedRoute?.totalDistance.toFixed(1)} km</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Por kilómetro</span>
          <span className="font-medium">
            {freight.suggestedRoute
              ? formatARS(Math.round(freight.totalPrice / freight.suggestedRoute.totalDistance))
              : '$ 0'}
            /km
          </span>
        </div>
        {freight.suggestedRoute?.estimatedDuration && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Duración estimada</span>
            <span className="font-medium">
              {Math.round(freight.suggestedRoute.estimatedDuration / 60)}h{' '}
              {freight.suggestedRoute.estimatedDuration % 60}min
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
