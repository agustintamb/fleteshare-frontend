//import { Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
//import Card from '@/components/ui/Card';
//import Button from '@/components/ui/Button';
import CustomerProfile from './CustomerProfile';
import TransporterProfile from './TransporterProfile';

const Profile = () => {
  const { currentUser, isCustomer, isTransporter } = useAuth();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }
  if (!isCustomer && !isTransporter) {
    return (
      <div className="text-center py-10">
        <p>Acceso no autorizado. Por favor, inicia sesión como cliente o transportista.</p>
      </div>
    );
  }
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      {/* Profile Section */}
      {isCustomer && <CustomerProfile />}
      {isTransporter && <TransporterProfile />}
      {/* Security Section */}
      {/*<Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Seguridad</h2>
        <div className="space-y-4">
          <Button variant="outline" icon={<Lock size={18} />} fullWidth className="justify-start">
            Cambiar contraseña
          </Button>
          <Button variant="danger" fullWidth className="justify-start">
            Quiero eliminar mi cuenta
          </Button>
        </div>
      </Card>*/}
    </div>
  );
};

export default Profile;
