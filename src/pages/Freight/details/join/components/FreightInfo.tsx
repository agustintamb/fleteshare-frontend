import { Calendar, Users, Route } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';
import { formatDateWithWeekday } from '@/utils/time';

interface FreightInfoProps {
  freight: IFreight;
}

const FreightInfo = ({ freight }: FreightInfoProps) => {
  return (
    <div className="bg-blue-50 p-4 rounded-md">
      <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
        <Route size={18} />
        Información del Flete
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-600" />
          <div>
            <p className="text-xs text-blue-600">Fecha programada</p>
            <p className="text-sm font-medium text-blue-900">
              {formatDateWithWeekday(new Date(freight.scheduledDate), 'short')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} className="text-blue-600" />
          <div>
            <p className="text-xs text-blue-600">Participantes actuales</p>
            <p className="text-sm font-medium text-blue-900">{freight.participants.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Route size={16} className="text-blue-600" />
          <div>
            <p className="text-xs text-blue-600">Distancia actual</p>
            <p className="text-sm font-medium text-blue-900">
              {freight.suggestedRoute?.totalDistance.toFixed(1)} km
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-blue-200">
        <p className="text-xs text-blue-700">
          <strong>ID del flete:</strong> {freight._id.slice(-8)}
        </p>
      </div>
    </div>
  );
};

export default FreightInfo;
