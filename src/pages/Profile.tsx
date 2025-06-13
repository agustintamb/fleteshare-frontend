import React, { useState } from 'react';
import { User, Mail, Phone, Star, Pencil, Lock, LogOut } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useFreight } from '../hooks/useFreight';
import mockUsers from '../data/mockUsers';

const Profile: React.FC = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const { reviews } = useFreight();

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

  if (!user) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  const receivedReviews = reviews.filter(r => r.targetId === user?.id);
  const customerReviews = receivedReviews.filter(r => r.role === 'customer');
  const transporterReviews = receivedReviews.filter(r => r.role === 'transporter');
  const avgCustomer = customerReviews.length
    ? (customerReviews.reduce((acc, r) => acc + r.rating, 0) / customerReviews.length).toFixed(2)
    : null;
  const avgTransporter = transporterReviews.length
    ? (
        transporterReviews.reduce((acc, r) => acc + r.rating, 0) / transporterReviews.length
      ).toFixed(2)
    : null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16 md:pb-0">
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
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
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
                  name="email"
                  type="email"
                  value={formData.email}
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
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Correo electrónico</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium text-gray-900">{user.phone || 'No especificado'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Tipo de cuenta</p>
                  <p className="font-medium text-gray-900">
                    {user.role === 'customer' && 'Cliente'}
                    {user.role === 'transporter' && 'Transportista'}
                    {user.role === 'admin' && 'Administrador'}
                  </p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-gray-500 mr-2">Calificación</p>
                  <div className="flex items-center">
                    <Star size={16} className="text-warning-500 fill-current" />
                    <span className="font-medium text-gray-900 ml-1">
                      {receivedReviews.length
                        ? (
                            receivedReviews.reduce((acc, r) => acc + r.rating, 0) /
                            receivedReviews.length
                          ).toFixed(1)
                        : '0.0'}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({receivedReviews.length} reseñas)
                    </span>
                  </div>
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

      {/* Preferences Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferencias</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notificaciones por correo electrónico</p>
              <p className="text-sm text-gray-500">
                Recibe actualizaciones sobre tus solicitudes de flete
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notificaciones push</p>
              <p className="text-sm text-gray-500">
                Recibe notificaciones en tu navegador o dispositivo
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notificaciones de chat</p>
              <p className="text-sm text-gray-500">Recibe alertas cuando recibas nuevos mensajes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Promedios de estrellas */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Reputación</h2>
        {avgCustomer && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400">
              <Star size={18} fill="currentColor" />
            </span>
            <span className="font-medium">{avgCustomer}</span>
            <span className="text-xs text-gray-500">como Cliente</span>
          </div>
        )}
        {avgTransporter && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-400">
              <Star size={18} fill="currentColor" />
            </span>
            <span className="font-medium">{avgTransporter}</span>
            <span className="text-xs text-gray-500">como Transportista</span>
          </div>
        )}
        {!avgCustomer && !avgTransporter && (
          <span className="text-gray-500">Sin calificaciones aún.</span>
        )}
      </div>

      {/* Listado de reseñas */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Reseñas recibidas</h2>
        {receivedReviews.length === 0 ? (
          <span className="text-gray-500">Aún no tienes reseñas.</span>
        ) : (
          <div className="space-y-4">
            {receivedReviews.map(r => {
              const authorUser = mockUsers.find(u => u.id === r.authorId);
              const authorName = authorUser ? authorUser.name : r.authorId;
              const authorAvatar = authorUser && authorUser.avatar;
              return (
                <div key={r.id} className="bg-gray-50 rounded p-4 flex items-start gap-3">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar}
                      alt={authorName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                      {authorName[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-gray-800 mb-1">{r.comment}</div>
                    <div className="text-xs text-gray-500">
                      De: {authorName} ({r.role === 'customer' ? 'Cliente' : 'Transportista'})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
