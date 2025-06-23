import { Link } from 'react-router-dom';
import { Plus, Package, Users } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import { CustomerDashboard } from './CustomerDashboard';
import { TransporterDashboard } from './TransporterDashboard';

const Dashboard = () => {
  const { currentUser, isCustomer, isTransporter } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hola {currentUser?.firstName}!</h1>
            <p className="text-gray-600 mt-1">
              {isCustomer && '¿Necesitás enviar algo hoy?'}
              {isTransporter && '¿Listo para aceptar nuevos fletes?'}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            {isCustomer && (
              <>
                <Link to={ROUTES.FREIGHT_NEW}>
                  <Button variant="primary" icon={<Plus size={18} />}>
                    Solicitar nuevo flete
                  </Button>
                </Link>
                <Link to={ROUTES.FREIGHT}>
                  <Button variant="outline" icon={<Users size={18} />}>
                    Ver todas las solicitudes
                  </Button>
                </Link>
              </>
            )}
            {isTransporter && (
              <Link to={ROUTES.FREIGHT}>
                <Button variant="primary" icon={<Package size={18} />}>
                  Ver solicitudes disponibles
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard content based on user role */}
      {isCustomer && <CustomerDashboard />}
      {isTransporter && <TransporterDashboard />}
    </div>
  );
};

export default Dashboard;
