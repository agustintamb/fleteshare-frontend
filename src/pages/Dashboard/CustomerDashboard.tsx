import { Link } from 'react-router-dom';
import { Package, RefreshCw } from 'lucide-react';
import { FreightCard } from '@/components/freight/FreightCard';
import { useDashboard } from './useDashboard';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { CustomerMetrics } from './components/CustomerMetrics';
import { UrgentOpportunitiesAlert } from './components/UrgentOpportunitiesAlert';

export const CustomerDashboard = () => {
  const { userFreights, allFreights, isLoadingUserFreights, refetchUserFreights } = useDashboard();

  if (isLoadingUserFreights) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando tu información...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Customer Metrics */}
      <CustomerMetrics userFreights={userFreights} allFreights={allFreights} />

      {/* Urgent Opportunities Alert */}
      <UrgentOpportunitiesAlert allFreights={allFreights || []} />

      {/* My Recent Freights Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Mis fletes recientes</h2>
              <p className="text-sm text-gray-600">Últimos fletes que creaste o te uniste</p>
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
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tenés fletes solicitados</h3>
            <p className="text-gray-600 mb-6">¡Creá tu primer flete o unite a uno existente!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userFreights.slice(0, 3).map(freight => (
              <FreightCard
                key={freight._id}
                freight={freight}
                isOwner={freight.createdBy === freight.participants[0]?.user?._id}
              />
            ))}

            {userFreights.length > 3 && (
              <div className="text-center pt-4">
                <Link to={ROUTES.FREIGHT}>
                  <Button variant="outline">Ver {userFreights.length - 3} fletes más</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🚛 Acciones rápidas</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>• Creá un flete para envíos personales</div>
          <div>• Unite a fletes compartidos para ahorrar</div>
          <div>• Revisá el estado de tus envíos actuales</div>
          <div>• Explorá nuevas opciones de flete disponibles</div>
        </div>
      </div>
    </div>
  );
};
