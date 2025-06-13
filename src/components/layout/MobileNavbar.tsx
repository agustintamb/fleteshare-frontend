import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Home, Package, User, LogOut } from 'lucide-react';
import Modal from '@/components/ui/Modal';

const MobileNavbar = () => {
  const { handleLogout } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <Modal
        open={logoutOpen}
        title="Cerrar sesión"
        children={<p className="text-gray-700">¿Estás seguro de que deseas cerrar sesión?</p>}
        actions={
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => setLogoutOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                setLogoutOpen(false);
                handleLogout();
              }}
            >
              Cerrar sesión
            </button>
          </div>
        }
      />
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="grid grid-cols-4 h-16">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center ${
              isActive('/dashboard') ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link
            to="/freight"
            className={`flex flex-col items-center justify-center ${
              location.pathname.startsWith('/freight') ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <Package size={20} />
            <span className="text-xs mt-1">Fletes</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center ${
              isActive('/profile') ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            <User size={20} />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
          <button
            className={`flex flex-col items-center justify-center ${
              isActive('/logout') ? 'text-primary-600' : 'text-gray-500'
            }`}
            aria-label="Cerrar sesión"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Salir</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
