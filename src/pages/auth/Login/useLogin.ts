import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useAuth } from '@/hooks/useAuth';
import { clearError, selectorAuth } from '@/features/auth/slice';
import { login } from '@/features/auth/asyncActions';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { error, isLoading } = useSelector(selectorAuth);
  const [rememberMe, setRememberMe] = useState(Boolean(localStorage.getItem('rememberMe')));

  const initialValues = {
    username: localStorage.getItem('username') || '',
    password: '',
    rememberMe,
  };

  const handleCheckRememberMe = () => {
    setRememberMe(prev => !prev);
    if (rememberMe) localStorage.removeItem('rememberMe');
    else localStorage.setItem('rememberMe', (!rememberMe).toString());
  };

  const handleLogin = (username: string, password: string, rememberMe: boolean) => {
    if (rememberMe) localStorage.setItem('username', username);
    else localStorage.removeItem('username');
    dispatch(
      login({
        username,
        password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    rememberMe,
    initialValues,
    isLoading,
    error,
    handleCheckRememberMe,
    handleLogin,
  };
};
