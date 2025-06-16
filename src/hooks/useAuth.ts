import { useSelector } from 'react-redux';
import { selectorAuth } from '@/features/auth/slice';
import { selectorUser } from '@/features/user/slice';
import { getToken, removeToken } from '@/utils/storage';

export const useAuth = () => {
  const { isSessionExpired } = useSelector(selectorAuth);
  const { user: currentUser, isLoading, error } = useSelector(selectorUser);

  const isAuthenticated = getToken();

  const isCustomer = currentUser?.role === 'customer';
  const isTransporter = currentUser?.role === 'transporter';
  const isProfileCompleted = currentUser?.isProfileCompleted;

  const handleLogout = () => {
    removeToken();
    window.location.href = '/iniciar-sesion';
  };

  return {
    currentUser,
    error,
    isLoading,
    isSessionExpired,
    isAuthenticated,
    isCustomer,
    isTransporter,
    isProfileCompleted,
    handleLogout,
  };
};
