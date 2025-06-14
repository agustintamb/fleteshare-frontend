import React, { useState } from 'react';
import { User, Mail, Phone, Pencil, Lock, LogOut } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const { currentUser, isCustomer, isTransporter, handleLogout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.firstName || '',
    username: currentUser?.username || '',
    phone: currentUser?.phone || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would send an API request to update the user's profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>

          {!isEditing && (
            <Button
              variant="outline"
              icon={<Pencil size={18} />}
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-600">
                <User size={64} />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            {isEditing ? (
              <>
                <Input
                  label="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  icon={<User size={18} />}
                  fullWidth
                />

                <Input
                  label="Correo electrónico"
                  id="username"
                  name="username"
                  type="email"
                  value={formData.username}
                  onChange={handleInputChange}
                  icon={<Mail size={18} />}
                  fullWidth
                />

                <Input
                  label="Teléfono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  icon={<Phone size={18} />}
                  fullWidth
                />

                <div className="flex gap-3 pt-4">
                  <Button variant="primary" onClick={handleSaveProfile}>
                    Guardar Cambios
                  </Button>

                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-medium text-gray-900">{currentUser.firstName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Correo electrónico</p>
                  <p className="font-medium text-gray-900">{currentUser.username}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium text-gray-900">
                    {currentUser.phone || 'No especificado'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Tipo de cuenta</p>
                  <p className="font-medium text-gray-900">
                    {isCustomer && 'Cliente'}
                    {isTransporter && 'Transportista'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Seguridad</h2>

        <div className="space-y-4">
          <Button variant="outline" icon={<Lock size={18} />} fullWidth className="justify-start">
            Cambiar contraseña
          </Button>

          <Button
            variant="outline"
            icon={<LogOut size={18} />}
            fullWidth
            className="justify-start"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </Card>

      {/* Promedios de estrellas */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Reputación</h2>
        <span className="text-gray-500">Sin calificaciones aún.</span>
      </div>

      {/* Listado de reseñas */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Reseñas recibidas</h2>
        <span className="text-gray-500">Aún no tienes reseñas.</span>
      </div>
    </div>
  );
};

export default Profile;
