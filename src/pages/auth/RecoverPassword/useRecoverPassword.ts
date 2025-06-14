import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/app/store';
import { ROUTES } from '@/utils/constants';
import { IRecoverPasswordParams } from '@/interfaces/auth';
import { clearAuth, selectorAuth } from '@/features/auth/slice';
import { recoverPassword } from '@/features/auth/asyncActions';

export const useRecoverPassword = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { recoverSent, error, isLoading } = useSelector(selectorAuth);

  const initialValues: IRecoverPasswordParams = {
    username: localStorage.getItem('username') || '',
  };

  const handleGoToLogin = () => navigate(ROUTES.LOGIN);

  const handleRecoverPassword = (username: string) => dispatch(recoverPassword({ username }));

  useEffect(() => {
    dispatch(clearAuth());
  }, [dispatch]);

  return {
    recoverSent,
    initialValues,
    isLoading,
    error,
    handleGoToLogin,
    handleRecoverPassword,
  };
};
