import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Bell, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  // { id: '1', userId: '123', title: 'Paquete entregado', message: 'Tu paquete ha sido entregado.', createdAt: new Date().toISOString(), read: false },
];

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, handleLogout } = useAuth();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Assuming user data is stored in localStorage

  // Close menus when route changes
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  const [notifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read && n.userId === user?.id).length;

  return (
    <header className="bg-gray-50 fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center text-primary-600 font-semibold gap-2">
            <Truck size={24} />
            <span className="text-xl">FleteShare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="relative text-gray-500 hover:text-primary-600 transition"
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                  Dashboard
                </Link>
                <Link to="/freight" className="text-gray-700 hover:text-primary-600 transition">
                  Fletes
                </Link>
                <div className="relative ml-3">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-700 rounded-full">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <User size={16} />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                      >
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Mi Perfil
                          </Link>
                          {user?.role === 'admin' && (
                            <Link
                              to="/admin"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Panel Administrador
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition shadow-sm"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          {isAuthenticated && (
            <div className="md:hidden flex items-center">
              <div className="relative mr-4">
                <Link to="/notifications" className="text-gray-500 hover:text-primary-600">
                  <Bell size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
