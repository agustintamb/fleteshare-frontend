import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import { CustomerFreightDetails } from './CustomerFreightDetails';
import { TransporterFreightDetails } from './TransporterFreightDetails';

export const FreightDetails = () => {
  const { currentUser, isCustomer, isTransporter } = useAuth();

  if (!currentUser) return null;

  if (isCustomer) return <CustomerFreightDetails currentUser={currentUser} />;
  if (isTransporter) return <TransporterFreightDetails currentUser={currentUser} />;

  // Fallback en caso de que no se identifique el rol
  return (
    <div className="text-center py-12">
      <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Rol no reconocido</h3>
      <p className="mt-1 text-sm text-gray-500">
        No se pudo determinar tu rol para mostrar la vista apropiada.
      </p>
      <div className="mt-6">
        <Link to={ROUTES.FREIGHT}>
          <Button variant="primary">Volver a fletes</Button>
        </Link>
      </div>
    </div>
  );
};
