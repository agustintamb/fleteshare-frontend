import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '@/app/store';
import { selectorFreigths } from '@/features/freights/slice';
import { getFreightById } from '@/features/freights/asyncActions';

export const useFreightDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentFreight, isLoading } = useSelector(selectorFreigths);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) dispatch(getFreightById(id));
  }, [dispatch, id]);

  return {
    currentFreight,
    isLoading,
  };
};
