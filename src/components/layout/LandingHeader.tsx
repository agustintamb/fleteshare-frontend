import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Menu, X, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

const LandingHeader = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Cómo funciona', href: '#como-funciona' },
    { name: 'Ventajas', href: '#ventajas' },
    { name: 'Opiniones', href: '#opiniones' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    // useTimeout to ensure the menu closes before scrolling
    setTimeout(() => {
      if (href.startsWith('#')) {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };

  const scrollToTop = () => {
    // Cerrar el menú mobile si está abierto
    setMobileMenuOpen(false);

    // Scroll hacia arriba
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center text-primary-600 font-semibold gap-2 hover:text-primary-700 transition-colors"
          >
            <Truck size={24} />
            <span className="text-xl">FleteShare</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map(item => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="primary" size="sm" icon={<User size={16} />}>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/iniciar-sesion">
                  <Button variant="ghost" size="sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link to="/crear-cuenta">
                  <Button variant="primary" size="sm" icon={<LogIn size={16} />}>
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map(item => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                  >
                    {item.name}
                  </button>
                ))}

                <hr className="border-gray-200" />

                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" fullWidth icon={<User size={16} />}>
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link to="/iniciar-sesion" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" fullWidth>
                        Iniciar sesión
                      </Button>
                    </Link>
                    <Link to="/crear-cuenta" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth icon={<LogIn size={16} />}>
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default LandingHeader;
