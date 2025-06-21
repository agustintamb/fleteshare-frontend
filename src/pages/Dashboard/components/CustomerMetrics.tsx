import { Package, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IFreight } from '@/interfaces/freight';
import { ROUTES } from '@/utils/constants';
import { getStartOfDateUTC, getStartOfTodayUTC } from '@/utils/time';

interface CustomerMetricsProps {
  userFreights: IFreight[];
  allFreights: IFreight[];
}

export const CustomerMetrics = ({ userFreights, allFreights }: CustomerMetricsProps) => {
  const totalFreights = userFreights.length;
  const activeFreights = userFreights.filter(freight =>
    ['requested', 'taken', 'started', 'going'].includes(freight.status)
  ).length;

  // Get upcoming freights
  const today = getStartOfTodayUTC();
  const upcomingFreights = allFreights?.filter(freight => {
    const freightDate = getStartOfDateUTC(freight.scheduledDate);
    return freightDate >= today && ['requested', 'taken'].includes(freight.status);
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Package className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{totalFreights}</div>
            <div className="text-sm text-gray-700">Tus fletes totales</div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-900">{activeFreights}</div>
            <div className="text-sm text-green-700">Tus fletes activos</div>
          </div>
        </div>
      </div>

      <Link
        to={ROUTES.FREIGHT}
        title="Ver nuevas solicitudes de usuarios"
        className="bg-blue-50 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900">{upcomingFreights}</div>
            <div className="text-sm text-blue-700">
              {upcomingFreights === 1 ? 'Solicitud de usuario' : 'Solicitudes de usuarios'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
