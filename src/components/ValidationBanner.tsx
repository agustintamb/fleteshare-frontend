import { Link } from 'react-router-dom';
import { AlertCircle, Clock } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';

export const ValidationBanner = () => {
  const { isProfileCompleted, isProfileValidated, isTransporter, currentUser } = useAuth();

  if (isProfileCompleted && isProfileValidated) return null;

  if (!isProfileCompleted) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-amber-800">
              Completá tu perfil para acceder a todas las funcionalidades
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              Necesitás completar tu información personal para continuar.
            </p>
            <Link
              to={ROUTES.PROFILE}
              className="inline-flex items-center text-sm font-medium text-amber-800 hover:text-amber-900 mt-2"
            >
              Completar perfil →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Transportista con licencia pendiente o rechazada
  if (isTransporter && !isProfileValidated) {
    const licenseStatus = currentUser?.licenseStatus;

    if (licenseStatus === 'pending') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                Tu licencia está siendo revisada
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Estamos validando tu licencia. Podrás tomar fletes una vez que sea aprobada.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (licenseStatus === 'rejected') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Tu licencia fue rechazada</h3>
              <p className="text-sm text-red-700 mt-1">
                Subí una nueva imagen clara de tu licencia vigente para continuar.
              </p>
              <Link
                to="/mi-perfil"
                className="inline-flex items-center text-sm font-medium text-red-800 hover:text-red-900 mt-2"
              >
                Actualizar licencia →
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
};
