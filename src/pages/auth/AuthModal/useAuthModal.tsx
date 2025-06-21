import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import RecoverPassword from '@/pages/Auth/RecoverPassword';

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
