import { Truck, RefreshCw, Package } from 'lucide-react';
import { FreightCard } from '@/components/freight/FreightCard';
import { FreightFilters } from '@/components/freight/FreightFilters';
import { Pagination } from '@/components/ui/Pagination';
import { useFreightRequests } from './useFreightRequests';

export const TransporterFreightRequests = () => {
  const {
    userFreights,
    availableFreights,
    isLoading,
    isLoadingUserFreights,
    availableFilters,
    updateAvailableFilters,
    resetAvailableFilters,
    availablePage,
    setAvailablePage,
    availableTotalPages,
    currentPage,
    setCurrentPage,
    userTotalPages,
    refetchAvailableFreights,
    refetchUserFreights,
  } = useFreightRequests();

  const activeFilters =
    availableFilters.search.trim() || availableFilters.dateFrom || availableFilters.dateTo;

  if (isLoading && isLoadingUserFreights) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando solicitudes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Fletes</h1>
            <p className="text-gray-600 mt-1">
              Administra tus fletes asignados y explora nuevas oportunidades
            </p>
          </div>
          <button
            onClick={() => {
              refetchAvailableFreights();
              refetchUserFreights();
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar todo
          </button>
        </div>
      </div>

      {/* Available Freights Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Título y descripción */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Solicitudes disponibles</h2>
              <p className="text-sm text-gray-600">
                Explora nuevas oportunidades y toma los fletes más rentables
              </p>
            </div>
          </div>

          {/* Filtros y refresh button */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:min-w-0 lg:flex-1 lg:max-w-2xl lg:ml-6">
            {/* Filtros compactos */}
            <div className="lg:order-1 lg:flex-1">
              <FreightFilters
                filters={availableFilters}
                onFiltersChange={updateAvailableFilters}
                onReset={resetAvailableFilters}
                title="Filtros de solicitudes"
                showSearchPlaceholder="Buscar solicitudes por ID o ciudad..."
                compact={true}
              />
            </div>
          </div>
        </div>

        {availableFreights.length === 0 ? (
          <div className="text-center py-12">
            <Truck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeFilters ? 'No se encontraron solicitudes' : 'No hay solicitudes disponibles'}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeFilters
                ? 'Probá ajustando tus filtros de búsqueda.'
                : 'No encontramos solicitudes de flete disponibles en este momento.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {activeFilters && (
                <button
                  onClick={resetAvailableFilters}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 mb-6">
              {[...availableFreights]
                .sort((a, b) => {
                  // Sort by price per km (best opportunities first)
                  const aRate = a.totalPrice / (a.suggestedRoute?.totalDistance || 1);
                  const bRate = b.totalPrice / (b.suggestedRoute?.totalDistance || 1);
                  return bRate - aRate;
                })
                .map(freight => (
                  <FreightCard key={freight._id} freight={freight} />
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

      {/* My Assigned Freights Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Todos mis fletes asignados</h2>
              <p className="text-sm text-gray-600">Historial completo de fletes que tomaste</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aún no tomaste ningún flete</h3>
            <p className="text-gray-600 mb-6">
              No tienes fletes asignados aún. <br />
              ¡Explora las solicitudes disponibles y toma tu primer flete!
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 mb-6">
              {userFreights.map(freight => (
                <FreightCard key={freight._id} freight={freight} />
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

      {/* Tips for Transporters */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          💎 Consejos para identificar oportunidades
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>• Priorizá fletes con mejor relación $/km</div>
          <div>• Los fletes de corta distancia suelen ser más eficientes</div>
          <div>• Fletes de alto valor (+$200k) pueden justificar distancias largas</div>
          <div>• Combina varios fletes cortos para optimizar rutas</div>
        </div>
      </div>
    </div>
  );
};
