import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Route } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';
import { formatDateWithWeekday } from '@/utils/time';
import { statusConfig } from '@/utils/status';
import { ROUTES } from '@/utils/constants';

interface CustomerHeaderProps {
  freight: IFreight;
}

export const CustomerHeader = ({ freight }: CustomerHeaderProps) => {
  const statusInfo = statusConfig[freight.status];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to={ROUTES.DASHBOARD} className="text-blue-100 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Detalle del Flete</h1>
          <div className="flex items-center gap-3 mt-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
            >
              {statusInfo.label}
            </span>
            <span className="text-blue-100 text-sm">ID: {freight._id.slice(-8)}</span>
          </div>
        </div>
      </div>

      {/* Información clave del flete - Solo si no está cancelado */}
      {freight.status !== 'canceled' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-blue-200" />
            <div>
              <p className="text-blue-100 text-sm">Programado para</p>
              <p className="font-medium">
                {formatDateWithWeekday(new Date(freight.scheduledDate))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users size={20} className="text-blue-200" />
            <div>
              <p className="text-blue-100 text-sm">Participantes</p>
              <p className="font-medium">{freight.participants.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Route size={20} className="text-blue-200" />
            <div>
              <p className="text-blue-100 text-sm">Distancia total</p>
              <p className="font-medium">{freight.suggestedRoute?.totalDistance.toFixed(1)} km</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
