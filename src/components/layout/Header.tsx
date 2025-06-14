import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import NotificationDropdown from '@/components/NotificationDropdown';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { currentUser, isAuthenticated, handleLogout } = useAuth();
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => {
    setIsProfileOpen(false);
  });

  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-gray-50 fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center" ref={dropdownRef}>
          {/* Logo */}
          <Link to="/" className="flex items-center text-primary-600 font-semibold gap-2">
            <Truck size={24} />
            <span className="text-xl">FleteShare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                  Dashboard
                </Link>
                <Link to="/freight" className="text-gray-700 hover:text-primary-600 transition">
                  Fletes
                </Link>
                <NotificationDropdown />
                <div className="relative ml-3">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-primary-100 text-primary-700 rounded-full">
                      {currentUser?.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.firstName}
                          className="w-6 h-6 rounded-full"
                        />
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
                  to="/iniciar-sesion"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition shadow-sm"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          {isAuthenticated && (
            <div className="md:hidden flex items-center space-x-4">
              <NotificationDropdown />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
