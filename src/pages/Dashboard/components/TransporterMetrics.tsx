import { Truck, Calendar, TrendingUp, Clock } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { getStartOfDateUTC, getStartOfTodayUTC } from '@/utils/time';

interface TransporterMetricsProps {
  userFreights: IFreight[];
  allFreights: IFreight[];
}

export const TransporterMetrics = ({ userFreights, allFreights }: TransporterMetricsProps) => {
  const totalFreights = userFreights.length;
  const activeFreights = userFreights.filter(freight =>
    ['taken', 'started'].includes(freight.status)
  ).length;

  // Get freights this week
  const today = getStartOfTodayUTC();
  const nextWeek = getStartOfTodayUTC();
  nextWeek.setDate(today.getDate() + 7);
  const freightsThisWeek = userFreights.filter(freight => {
    const freightDate = getStartOfDateUTC(freight.scheduledDate);
    return (
      freightDate >= today &&
      freightDate <= nextWeek &&
      ['taken', 'started'].includes(freight.status)
    );
  }).length;

  // Calculate opportunities in last 24 hours from ALL freights (not user's)
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const opportunitiesLast24h = allFreights.filter(freight => {
    const createdDate = new Date(freight.createdAt);
    return createdDate >= twentyFourHoursAgo && freight.status === 'requested';
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Truck className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{totalFreights}</div>
            <div className="text-sm text-gray-700">Tus fletes Totales</div>
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

      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-900">{freightsThisWeek}</div>
            <div className="text-sm text-purple-700">
              {freightsThisWeek === 1 ? 'Hay para esta semana' : 'Hay para esta semana'}
            </div>
          </div>
        </div>
      </div>

      <Link
        to={ROUTES.FREIGHT}
        title="Ver nuevas oportunidades"
        className="bg-orange-50 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
            <Clock className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-900">{opportunitiesLast24h}</div>
            <div className="text-sm text-orange-700">
              {opportunitiesLast24h === 1 ? 'Nuevo solicitado' : 'Nuevos solicitados'}
            </div>
            <div className="text-xs text-orange-600">en las últimas 24 horas</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
