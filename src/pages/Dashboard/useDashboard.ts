import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { selectorFreigths } from '@/features/freights/slice';
import { getUserFreights, getFreights } from '@/features/freights/asyncActions';
import { GetUserFreightsQuery, GetFreightsQuery } from '@/interfaces/freight';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userFreights, isLoadingUserFreights, allFreights, isLoading } =
    useSelector(selectorFreigths);

  // Only user's own freights for dashboard
  const fetchUserFreights = useCallback(() => {
    const query: GetUserFreightsQuery = {
      page: 1,
      limit: 5, // Only show recent freights on dashboard
    };
    dispatch(getUserFreights(query));
  }, [dispatch]);

  // All available freights for opportunities
  const fetchAllFreights = useCallback(() => {
    const query: GetFreightsQuery = {
      page: 1,
      limit: 20,
      status: 'requested',
    };
    dispatch(getFreights(query));
  }, [dispatch]);

  useEffect(() => {
    fetchUserFreights();
    fetchAllFreights();
  }, [fetchUserFreights, fetchAllFreights]);

  return {
    userFreights: userFreights?.freights || [],
    userFreightsPagination: userFreights?.pagination,
    allFreights: allFreights?.freights || [],
    isLoading,
    isLoadingUserFreights,
    refetchUserFreights: fetchUserFreights,
  };
};
