import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Package, Star, MessageSquare, Award, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  return (
    <div className="space-y-0 pb-12">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 lg:pr-8"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Distribución compartida inteligente para tus envíos
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                FleteShare conecta clientes y transportistas de manera eficiente, reduciendo costos
                y optimizando rutas para un servicio de fletes más económico y ecológico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <>
                  <Link to="/login">
                    <Button size="lg" variant="primary" icon={<Truck size={20} />}>
                      Comenzar ahora
                    </Button>
                  </Link>
                </>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.2 },
              }}
            >
              <img
                src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Servicio de fletes"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50" id="como-funciona">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Cómo funciona</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Optimizá tus envíos en tres simples pasos
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={fadeIn}>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Package className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Crea tu solicitud</h3>
              <p className="text-gray-600">
                Describí tu envío, dimensiones, peso, direcciones de recogida y entrega, y tus
                preferencias de horario.
              </p>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={fadeIn}>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Obtén transportistas</h3>
              <p className="text-gray-600">
                Los transportistas disponibles en la zona reciben tu solicitud y pueden aceptarla
                según su ruta y disponibilidad.
              </p>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={fadeIn}>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Star className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Seguimiento en tiempo real</h3>
              <p className="text-gray-600">
                Seguí el estado de tu envío y mantente informado en todo momento.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 md:py-20 lg:py-24" id="ventajas">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Ventajas de FleteShare</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Una solución moderna para el transporte de mercancías
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeIn} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-secondary-600" size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Precios competitivos</h3>
                <p className="text-gray-600">
                  Ahorra hasta un 40% al compartir espacio con otros envíos en rutas similares.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="text-accent-600" size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Comunicación directa</h3>
                <p className="text-gray-600">
                  Chat en tiempo real con los transportistas para coordinar detalles del envío.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                  <Award className="text-success-600" size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Transportistas verificados</h3>
                <p className="text-gray-600">
                  Todos los transportistas pasan por un proceso de verificación para garantizar
                  calidad y seguridad.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Package className="text-primary-600" size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Adaptado a tus necesidades</h3>
                <p className="text-gray-600">
                  Desde pequeños paquetes hasta muebles grandes, encuentra el transporte ideal para
                  cada envío.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                  <Star className="text-warning-600" size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Sistema de calificaciones</h3>
                <p className="text-gray-600">
                  Evalúa a los transportistas y consulta sus reseñas para elegir el más adecuado.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                  <Truck className="text-error-600" size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Seguimiento en tiempo real</h3>
                <p className="text-gray-600">
                  Seguí el estado de tu envío y mantente informado en todo momento.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50" id="opiniones">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Lo que dicen nuestros usuarios</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Miles de usuarios confían en FleteShare para sus necesidades de transporte
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Cliente"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Carlos Rodríguez</h4>
                  <div className="flex items-center text-warning-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Increíble servicio. Necesitaba mover un sillón y encontré un transportista
                disponible en menos de una hora. El precio fue mucho mejor de lo esperado."
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Cliente"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Laura Martínez</h4>
                  <div className="flex items-center text-warning-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Como pequeña empresa, FleteShare ha sido un gran aliado para nuestras entregas.
                Reducimos costos y mejoramos la satisfacción de nuestros clientes con entregas más
                rápidas."
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Cliente"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Martín Sánchez</h4>
                  <div className="flex items-center text-warning-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Como transportista, FleteShare me permitió organizar mejor mis rutas y aumentar mis
                ingresos. La plataforma es intuitiva y los pagos son puntuales."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Unite a la revolución del transporte compartido
            </h2>
            <p className="text-lg mb-8 text-primary-100">
              Ya sea que necesites enviar algo o quieras optimizar tus rutas como transportista,
              <br className="hidden sm:block" />
              FleteShare tiene la solución para vos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary">
                  Ir a mi Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
