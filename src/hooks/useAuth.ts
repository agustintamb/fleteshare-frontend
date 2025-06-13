import { useSelector } from 'react-redux';
import { selectorAuth } from '@/features/auth/slice';
import { selectorUser } from '@/features/user/slice';
import { getToken, removeToken } from '@/utils/storage';

export const useAuth = () => {
  const { isSessionExpired } = useSelector(selectorAuth);
  const { user: currentUser, isLoading } = useSelector(selectorUser);

  const isAuthenticated = getToken();

  const handleLogout = () => {
    removeToken();
    window.location.href = '/login';
  };

  return {
    currentUser,
    isLoading,
    isSessionExpired,
    isAuthenticated,
    handleLogout,
  };
};
