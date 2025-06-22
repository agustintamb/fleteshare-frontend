import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '@/app/store';
import { selectorFreigths } from '@/features/freights/slice';
import {
  getFreightById,
  takeFreight,
  joinFreight,
  updateFreightStatus,
} from '@/features/freights/asyncActions';

export const useFreightDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentFreight, isLoading } = useSelector(selectorFreigths);

  const { id } = useParams<{ id: string }>();

  const handleTakeFreight = () => {
    console.log('Taking freight:', id);
  };

  const handleJoinFreight = () => {
    console.log('Joining freight:', id);
  };

  const handleCancelFreight = () => {
    console.log('Canceling freight:', id);
  };

  useEffect(() => {
    if (id) dispatch(getFreightById(id));
  }, [dispatch, id]);

  return {
    currentFreight,
    freightId: id,
    isLoading,
    handleTakeFreight,
    handleJoinFreight,
    handleCancelFreight,
  };
};
