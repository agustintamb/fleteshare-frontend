import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Menu, X } from 'lucide-react';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="bg-gray-50 fixed top-0 left-0 w-full z-50">
      <nav className=" mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center text-primary-600 font-semibold gap-2">
            <Truck size={24} />
            <span className="text-xl">FleteShare</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#" className="text-gray-700 hover:text-primary-600 transition">
              Inicio
            </a>
            <a
              href="/#como-funciona"
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 ease-in-out"
            >
              Cómo funciona
            </a>
            <a
              href="/#ventajas"
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 ease-in-out"
            >
              Ventajas
            </a>
            <a
              href="#opiniones"
              className="text-gray-700 hover:text-primary-600 transition-all duration-300 ease-in-out"
            >
              Opiniones
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 py-2"
            >
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-primary-600 py-2 transition">
                  Inicio
                </a>
                <a
                  href="#como-funciona"
                  className="text-gray-700 hover:text-primary-600 py-2 transition"
                >
                  Cómo funciona
                </a>
                <a
                  href="#ventajas"
                  className="text-gray-700 hover:text-primary-600 py-2 transition"
                >
                  Ventajas
                </a>
                <a
                  href="#opiniones"
                  className="text-gray-700 hover:text-primary-600 py-2 transition"
                >
                  Opiniones
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default LandingHeader;
