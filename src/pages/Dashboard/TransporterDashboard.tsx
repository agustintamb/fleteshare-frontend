import { Link } from 'react-router-dom';
import { Truck, RefreshCw, Target } from 'lucide-react';
import { FreightCard } from '@/components/freight/FreightCard';
import { useDashboard } from './useDashboard';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { getStartOfDateUTC, getStartOfTodayUTC } from '@/utils/time';
import { TransporterMetrics } from './components/TransporterMetrics';
import { UrgentOpportunitiesAlert } from './components/UrgentOpportunitiesAlert';
import { PerformanceSummary } from './components/PerformanceSummary';

export const TransporterDashboard = () => {
  const { userFreights, allFreights, isLoadingUserFreights, refetchUserFreights } = useDashboard();

  if (isLoadingUserFreights) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando tu información...</span>
      </div>
    );
  }

  // Get upcoming freights for priority display
  const today = getStartOfTodayUTC();
  const upcomingFreights = userFreights.filter(freight => {
    const freightDate = getStartOfDateUTC(freight.scheduledDate);
    return freightDate >= today && ['taken', 'started'].includes(freight.status);
  });

  return (
    <div className="space-y-6">
      {/* Transporter Metrics */}
      <TransporterMetrics userFreights={userFreights} allFreights={allFreights || []} />

      {/* Performance Summary */}
      <PerformanceSummary userFreights={userFreights} />

      {/* Urgent Opportunities Alert */}
      <UrgentOpportunitiesAlert allFreights={allFreights || []} />

      {/* My Assigned Freights Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Mis fletes asignados</h2>
              <p className="text-sm text-gray-600">Fletes que tomaste y debes completar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refetchUserFreights}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <Link to={ROUTES.FREIGHT}>
              <Button variant="outline" size="sm">
                Ver todos
              </Button>
            </Link>
          </div>
        </div>

        {userFreights.length === 0 ? (
          <div className="text-center py-12">
            <Truck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aún no tomaste ningún flete</h3>
            <p className="text-gray-600 mb-6">
              ¡Explorá las solicitudes disponibles y comenzá a generar ingresos!
            </p>
            <Link to={ROUTES.FREIGHT}>
              <Button variant="primary" icon={<Target size={18} />}>
                Explorar oportunidades
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Show active/upcoming freights first */}
            {upcomingFreights.slice(0, 2).map(freight => (
              <FreightCard key={freight._id} freight={freight} showCompact showPriorityBadge />
            ))}

            {/* Show other recent freights */}
            {userFreights
              .filter(freight => !upcomingFreights.includes(freight))
              .slice(0, 2)
              .map(freight => (
                <FreightCard key={freight._id} freight={freight} showCompact />
              ))}

            {userFreights.length > 4 && (
              <div className="text-center pt-4">
                <Link to={ROUTES.FREIGHT}>
                  <Button variant="outline">Ver {userFreights.length - 4} fletes más</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Performance Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          📈 Consejos para maximizar ganancias
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>• Prioriza fletes con mejor relación $/km</div>
          <div>• Completa fletes a tiempo para mejorar tu reputación</div>
          <div>• Combina fletes cercanos para optimizar rutas</div>
          <div>• Revisa regularmente nuevas oportunidades disponibles</div>
        </div>
      </div>
    </div>
  );
};
