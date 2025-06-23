import { IFreight } from '@/interfaces/freight';
import { formatDateTimeUTC } from '@/utils/time';

interface FreightStatusTimelineProps {
  freight: IFreight;
}

export const FreightStatusTimeline = ({ freight }: FreightStatusTimelineProps) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <h3 className="font-medium text-gray-900 mb-2">Estado del Flete</h3>

    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Creado</span>
        <span>{formatDateTimeUTC(freight.createdAt)}</span>
      </div>
      {freight.startedAt && (
        <div className="flex justify-between">
          <span className="text-gray-600">En camino</span>
          <span>{formatDateTimeUTC(freight.startedAt)}</span>
        </div>
      )}
      {freight.completedAt && (
        <div className="flex justify-between">
          <span className="text-gray-600">Completado</span>
          <span>{formatDateTimeUTC(freight.completedAt)}</span>
        </div>
      )}
      {freight.cancelledAt && (
        <div className="flex justify-between">
          <span className="text-gray-600">Cancelado</span>
          <span>{formatDateTimeUTC(freight.cancelledAt)}</span>
        </div>
      )}
    </div>
  </div>
);
