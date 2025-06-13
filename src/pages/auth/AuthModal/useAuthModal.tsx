import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RecoverPassword from '@/pages/auth/RecoverPassword';

interface UseAuthModalProps {
  type: 'login' | 'register' | 'recover';
}

export const useAuthModal = ({ type }: UseAuthModalProps) => {
  const getModalTitle = () => {
    if (type === 'login') return 'Iniciar Sesión';
    if (type === 'register') return 'Crear Cuenta';
    if (type === 'recover') return 'Restablecer Contraseña';
    return '';
  };

  const renderContent = () => {
    if (type === 'login') return <Login />;
    if (type === 'register') return <Register />;
    if (type === 'recover') return <RecoverPassword />;
    return null;
  };

  return {
    getModalTitle,
    renderContent,
  };
};
