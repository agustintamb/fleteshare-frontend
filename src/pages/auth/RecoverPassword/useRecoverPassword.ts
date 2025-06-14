import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { clearAuth, selectorAuth } from '@/features/auth/slice';
import { recoverPassword } from '@/features/auth/asyncActions';
import { IRecoverPasswordParams } from '@/interfaces/auth';
import { useNavigate } from 'react-router-dom';

export const useRecoverPassword = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { recoverSent, error, isLoading } = useSelector(selectorAuth);

  const initialValues: IRecoverPasswordParams = {
    username: localStorage.getItem('username') || '',
  };

  const handleGoToLogin = () => navigate('/iniciar-sesion');

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
