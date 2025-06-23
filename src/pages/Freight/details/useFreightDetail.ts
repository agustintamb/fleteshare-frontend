import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '@/app/store';
import { useAuth } from '@/hooks/useAuth';
import { selectorFreigths } from '@/features/freights/slice';
import {
  getFreightById,
  takeFreight,
  startFreight,
  cancelFreight,
  leaveFreight,
  finishFreight,
  markStopAsVisited,
} from '@/features/freights/asyncActions';

export const useFreightDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCustomer, isTransporter } = useAuth();
  const { currentFreight, isLoading, isActionLoading } = useSelector(selectorFreigths);

  const { id } = useParams<{ id: string }>();

  const fetchCurrentFreight = useCallback(() => {
    if (!id) return;
    dispatch(getFreightById(id));
  }, [dispatch, id]);

  const handleTakeFreight = useCallback(() => {
    if (isCustomer || !id) return;
    dispatch(takeFreight(id)).then(() => fetchCurrentFreight());
  }, [dispatch, id, isCustomer, fetchCurrentFreight]);

  const handleStartFreight = useCallback(() => {
    if (isCustomer || !id) return;
    dispatch(startFreight(id)).then(() => fetchCurrentFreight());
  }, [dispatch, id, isCustomer, fetchCurrentFreight]);

  const handleCancelFreight = useCallback(() => {
    if (!id) return;
    dispatch(cancelFreight(id)).then(() => fetchCurrentFreight());
  }, [dispatch, id, fetchCurrentFreight]);

  const handleLeaveFreight = useCallback(() => {
    if (!id) return;
    dispatch(leaveFreight(id)).then(() => fetchCurrentFreight());
  }, [dispatch, id, fetchCurrentFreight]);

  const handleFinishFreight = useCallback(() => {
    if (isCustomer || !id) return;
    dispatch(finishFreight(id)).then(() => fetchCurrentFreight());
  }, [dispatch, id, isCustomer, fetchCurrentFreight]);

  const handleMarkAsVisited = useCallback(
    (participantIndex: number, stopType: 'pickup' | 'delivery') => {
      if (isTransporter || !id) return;
      dispatch(
        markStopAsVisited({
          freightId: id,
          participantIndex,
          stopType,
        })
      ).then(() => fetchCurrentFreight());
    },
    [dispatch, id, isTransporter, fetchCurrentFreight]
  );

  useEffect(() => {
    fetchCurrentFreight();
  }, [fetchCurrentFreight]);

  return {
    currentFreight,
    freightId: id,
    isLoading,
    isActionLoading,
    refetch: fetchCurrentFreight,
    // Actions
    handleTakeFreight,
    handleStartFreight,
    handleCancelFreight,
    handleLeaveFreight,
    handleFinishFreight,
    handleMarkAsVisited,
  };
};
