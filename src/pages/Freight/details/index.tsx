import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import { useFreightDetails } from './useFreightDetail';
import { CustomerFreightDetails } from './CustomerFreightDetails';
import { TransporterFreightDetails } from './TransporterFreightDetails';

export const FreightDetails = () => {
  const { currentFreight, isLoading } = useFreightDetails();
  const { currentUser, isCustomer, isTransporter } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando flete...</span>
      </div>
    );
  }

  if (!currentFreight || !currentUser) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Flete no encontrado</h3>
        <p className="mt-1 text-sm text-gray-500">
          El flete que buscas no existe o no tienes permisos para verlo.
        </p>
        <div className="mt-6">
          <Link to={ROUTES.FREIGHT}>
            <Button variant="primary">Volver a fletes</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Renderizar el componente apropiado según el rol del usuario
  if (isCustomer)
    return <CustomerFreightDetails freight={currentFreight} currentUser={currentUser} />;

  if (isTransporter)
    return <TransporterFreightDetails freight={currentFreight} currentUser={currentUser} />;

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
