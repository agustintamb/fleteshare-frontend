import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { selectorFreigths } from '@/features/freights/slice';
import { getFreights, getUserFreights } from '@/features/freights/asyncActions';
import { GetUserFreightsQuery, GetFreightsQuery } from '@/interfaces/freight';

export interface AvailableFreightFilters {
  search: string;
  dateFrom: string;
  dateTo: string;
}

export const useFreightRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userFreights, allFreights, isLoading, isLoadingUserFreights } =
    useSelector(selectorFreigths);

  // Filtros solo para fletes disponibles
  const [availableFilters, setAvailableFilters] = useState<AvailableFreightFilters>({
    search: '',
    dateFrom: '',
    dateTo: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [availablePage, setAvailablePage] = useState(1);
  const limit = 10; // Increased limit for full page view

  // Fetch user freights (sin filtros, ordenado por fecha de creación)
  const fetchUserFreights = useCallback(() => {
    const query: GetUserFreightsQuery = {
      page: currentPage,
      limit,
    };
    dispatch(getUserFreights(query));
  }, [dispatch, currentPage, limit]);

  // Fetch available freights con filtros
  const fetchAvailableFreights = useCallback(() => {
    const query: GetFreightsQuery = {
      page: availablePage,
      limit,
    };

    // Solo agregar filtros de fecha si tienen valor y son válidos
    if (availableFilters.dateFrom) {
      const fromDate = new Date(availableFilters.dateFrom);
      if (!isNaN(fromDate.getTime())) {
        query.scheduledDateFrom = fromDate.toISOString();
      }
    }

    if (availableFilters.dateTo) {
      const toDate = new Date(availableFilters.dateTo);
      if (!isNaN(toDate.getTime())) {
        // Agregar 23:59:59 para incluir todo el día
        toDate.setHours(23, 59, 59, 999);
        query.scheduledDateTo = toDate.toISOString();
      }
    }

    dispatch(getFreights(query));
  }, [dispatch, availablePage, availableFilters.dateFrom, availableFilters.dateTo, limit]);

  // Effects separados para cada tipo de fetch
  useEffect(() => {
    fetchUserFreights();
  }, [fetchUserFreights]);

  useEffect(() => {
    fetchAvailableFreights();
  }, [fetchAvailableFreights]);

  // Filtro de búsqueda solo para fletes disponibles (client-side)
  const filteredAvailableFreights = useMemo(() => {
    const freightList = allFreights?.freights || [];

    if (!availableFilters.search.trim()) {
      return freightList;
    }

    const searchLower = availableFilters.search.toLowerCase();
    return freightList.filter(freight => {
      return (
        freight._id.toLowerCase().includes(searchLower) ||
        freight.participants.some(
          p =>
            p.pickupAddress.city?.toLowerCase().includes(searchLower) ||
            p.deliveryAddress.city?.toLowerCase().includes(searchLower) ||
            p.pickupAddress.formattedAddress?.toLowerCase().includes(searchLower) ||
            p.deliveryAddress.formattedAddress?.toLowerCase().includes(searchLower)
        )
      );
    });
  }, [allFreights?.freights, availableFilters.search]);

  // Actualizar filtros con debounce para la búsqueda
  const updateAvailableFilters = useCallback((newFilters: Partial<AvailableFreightFilters>) => {
    setAvailableFilters(prev => ({ ...prev, ...newFilters }));

    // Si se cambia algo que no sea search, resetear página
    if ('dateFrom' in newFilters || 'dateTo' in newFilters) {
      setAvailablePage(1);
    }
  }, []);

  const resetAvailableFilters = useCallback(() => {
    setAvailableFilters({
      search: '',
      dateFrom: '',
      dateTo: '',
    });
    setAvailablePage(1);
  }, []);

  return {
    // Data - Mis fletes (sin filtros, ordenado por backend)
    userFreights: userFreights?.freights || [],
    userFreightsPagination: userFreights?.pagination,

    // Data - Fletes disponibles (con filtros)
    availableFreights: filteredAvailableFreights,
    availableFreightsPagination: allFreights?.pagination,

    isLoading,
    isLoadingUserFreights,

    // Pagination para mis fletes
    currentPage,
    setCurrentPage,
    userTotalPages: userFreights?.pagination?.totalPages || 1,

    // Pagination para fletes disponibles
    availablePage,
    setAvailablePage,
    availableTotalPages: allFreights?.pagination?.totalPages || 1,

    // Filtros solo para fletes disponibles
    availableFilters,
    updateAvailableFilters,
    resetAvailableFilters,

    // Actions
    refetch: () => {
      fetchUserFreights();
      fetchAvailableFreights();
    },
    refetchUserFreights: fetchUserFreights,
    refetchAvailableFreights: fetchAvailableFreights,
  };
};
