import { Link } from 'react-router-dom';
import { Plus, Package, Share2, RefreshCw } from 'lucide-react';
import { FreightCard } from '@/components/freight/FreightCard';
import { FreightFilters } from '@/components/freight/FreightFilters';
import { Pagination } from '@/components/ui/Pagination';
import { useFreightRequests } from './useFreightRequests';
import Button from '@/components/ui/Button';

export const CustomerFreightRequests = () => {
  const {
    userFreights,
    availableFreights,
    isLoading,
    isLoadingUserFreights,

    // Paginación separada
    currentPage,
    setCurrentPage,
    userTotalPages,
    availablePage,
    setAvailablePage,
    availableTotalPages,

    // Filtros solo para disponibles
    availableFilters,
    updateAvailableFilters,
    resetAvailableFilters,

    refetch,
    refetchUserFreights,
    refetchAvailableFreights,
  } = useFreightRequests();

  const activeFilters =
    availableFilters.search.trim() || availableFilters.dateFrom || availableFilters.dateTo;

  if (isLoading && isLoadingUserFreights) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando fletes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Todas las Solicitudes de Flete</h1>
          <p className="text-gray-600 mt-1">
            Gestioná todas tus solicitudes de flete y explorá fletes compartidos
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link to="/fletes/nuevo">
            <Button variant="primary" icon={<Plus size={18} />}>
              Solicitar nuevo flete
            </Button>
          </Link>
        </div>
      </div>

      {/* Shared Freights Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Share2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Fletes compartidos disponibles
              </h2>
              <p className="text-sm text-gray-600">
                Unite a fletes de otros usuarios y ahorra en costos
              </p>
            </div>
          </div>
          <button
            onClick={refetchAvailableFreights}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Filtros solo para fletes disponibles */}
        <div className="mb-6">
          <FreightFilters
            filters={availableFilters}
            onFiltersChange={updateAvailableFilters}
            onReset={resetAvailableFilters}
            title="Filtros para fletes compartidos"
            showSearchPlaceholder="Buscar fletes por ID o ciudad"
          />
        </div>

        {availableFreights.length === 0 ? (
          <div className="text-center py-12">
            <Share2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeFilters ? 'No se encontraron fletes' : 'No hay fletes disponibles'}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeFilters
                ? 'Probá ajustando tus filtros de búsqueda.'
                : 'Creá tu propio flete o volvé más tarde.'}
            </p>
            {activeFilters && (
              <button
                onClick={resetAvailableFilters}
                className="text-blue-600 hover:text-blue-700 transition-colors mb-4"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-4 mb-6">
              {availableFreights.map(freight => (
                <FreightCard key={freight._id} freight={freight} showJoinButton={true} />
              ))}
            </div>

            {availableTotalPages > 1 && (
              <Pagination
                currentPage={availablePage}
                totalPages={availableTotalPages}
                onPageChange={setAvailablePage}
              />
            )}
          </>
        )}
      </div>

      {/* My Freights Section - All user freights with pagination */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Todos mis fletes</h2>
              <p className="text-sm text-gray-600">
                Historial completo de fletes que creaste o te uniste
              </p>
            </div>
          </div>
          <button
            onClick={refetchUserFreights}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {userFreights.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes fletes registrados</h3>
            <p className="text-gray-600 mb-6">
              Aún no participaste de ningún flete. <br />
              ¡Creá tu primer flete o unite a uno existente!
            </p>
            <Link to="/fletes/nuevo">
              <Button variant="primary" icon={<Plus size={18} />}>
                Solicitar
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-4 mb-6">
              {userFreights.map(freight => (
                <FreightCard
                  key={freight._id}
                  freight={freight}
                  isOwner={freight.createdBy === freight.participants[0]?.userId}
                />
              ))}
            </div>

            {userTotalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={userTotalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
