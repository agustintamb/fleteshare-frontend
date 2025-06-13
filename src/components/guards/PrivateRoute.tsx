import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useAuth } from '@/hooks/useAuth';
import { getCurrentUser } from '@/features/user/asyncActions';
import { AlertTriangle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUser, isSessionExpired, handleLogout } = useAuth();

  useEffect(() => {
    if (!currentUser) dispatch(getCurrentUser());
  }, [currentUser, dispatch]);

  return (
    <div>
      {children}
      <Modal
        open={isSessionExpired}
        title={
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            <span>Sesión Expirada</span>
          </div>
        }
        children={
          <p className="text-gray-700">
            Ups, tu sesión ha expirado. <br />
            Por favor, inicia sesión nuevamente para continuar.
          </p>
        }
        actions={
          <div className="flex justify-end gap-2">
            <Button onClick={handleLogout}>Aceptar</Button>
          </div>
        }
      />
    </div>
  );
};

export default PrivateRoute;
