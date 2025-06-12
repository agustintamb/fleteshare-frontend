import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { IRegisterParams } from '@/interfaces/auth';
import { clearError, selectorAuth } from '@/features/auth/slice';
import { register } from '@/features/auth/asyncActions';

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { registerData, error, isLoading } = useSelector(selectorAuth);

  const token = registerData?.result?.token;

  const initialValues: IRegisterParams = {
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    license: null,
  };

  const handleRegister = async (values: IRegisterParams) => {
    try {
      dispatch(
        register({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
          role: values.role,
          phone: values.phone,
          // license: values.license, // TODO: Manejar la subida de archivo
        })
      );
    } catch (err) {
      console.error('Error en registro:', err);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    initialValues,
    isLoading,
    error,
    handleRegister,
  };
};
