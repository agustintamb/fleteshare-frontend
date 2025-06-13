import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const isCustomer = currentUser?.role === 'customer';
  const isTransporter = currentUser?.role === 'transporter';

  const user = currentUser || JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bienvenido, {user?.firstName}</h1>
            <p className="text-gray-600 mt-1">
              {isCustomer && '¿Necesitas enviar algo hoy?'}
              {isTransporter && '¿Listo para aceptar nuevos fletes?'}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            {isCustomer && (
              <>
                <Link to="/freight/new">
                  <Button variant="primary" icon={<Plus size={18} />}>
                    Solicitar nuevo flete
                  </Button>
                </Link>
                <Link to="/freight">
                  <Button variant="outline" icon={<Users size={18} />}>
                    Unirse a un flete compartido
                  </Button>
                </Link>
              </>
            )}
            {isTransporter && (
              <Link to="/freight">
                <Button variant="primary" icon={<Package size={18} />}>
                  Ver solicitudes disponibles
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
