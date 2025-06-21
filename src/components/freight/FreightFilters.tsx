import { useCallback, useState, useEffect } from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';

interface AvailableFreightFilters {
  search: string;
  dateFrom: string;
  dateTo: string;
}

interface FreightFiltersProps {
  filters: AvailableFreightFilters;
  onFiltersChange: (filters: Partial<AvailableFreightFilters>) => void;
  onReset: () => void;
  title?: string;
  showSearchPlaceholder?: string;
}

export const FreightFilters = ({
  filters,
  onFiltersChange,
  onReset,
  title = 'Filtros',
  showSearchPlaceholder = 'Buscar por ID o ciudad...',
}: FreightFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search);

  // Debounce para la búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFiltersChange({ search: searchValue });
    }, 300); // 300ms de delay

    return () => clearTimeout(timeoutId);
  }, [searchValue, onFiltersChange]);

  // Sincronizar con filtros externos si cambian
  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const handleDateFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFiltersChange({ dateFrom: e.target.value });
    },
    [onFiltersChange]
  );

  const handleDateToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFiltersChange({ dateTo: e.target.value });
    },
    [onFiltersChange]
  );

  const hasActiveFilters = filters.search.trim() || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700">{title}</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
            Limpiar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={showSearchPlaceholder}
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        {/* Date From */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            value={filters.dateFrom}
            onChange={handleDateFromChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Fecha desde"
          />
        </div>

        {/* Date To */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            value={filters.dateTo}
            onChange={handleDateToChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Fecha hasta"
            min={filters.dateFrom || undefined} // No permitir fecha "hasta" menor que "desde"
          />
        </div>
      </div>
    </div>
  );
};
