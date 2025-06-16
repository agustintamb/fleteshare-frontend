import { useState } from 'react';
import { User, Mail, Phone, MapPin, Plus, Edit3 } from 'lucide-react';
import { Form, Formik, FormikProps } from 'formik';
import { validationSchema } from './schema';
import { useAuth } from '@/hooks/useAuth';
import { useCustomerProfile } from './useCustomerProfile';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AddressSearchModal from './AddressSearchModal';
import { IAddress } from '@/interfaces/freight';

interface ICustomerProfileValues {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  address: IAddress | null;
}

const CustomerProfile = () => {
  const { currentUser } = useAuth();
  const { initialValues, isLoading, error, handleUpdateProfile } = useCustomerProfile();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-800 rounded-md text-center">{error}</div>
        )}

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

          <div className="flex-1 w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                handleUpdateProfile(values);
                setSubmitting(false);
              }}
            >
              {(formik: FormikProps<ICustomerProfileValues>) => (
                <>
                  <Form className="space-y-6">
                    {/* Información Personal */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Información Personal
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="text"
                          label="Nombre"
                          id="firstName"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.firstName && formik.errors.firstName
                              ? formik.errors.firstName
                              : undefined
                          }
                          placeholder="Juan"
                          required
                          fullWidth
                          icon={<User size={18} />}
                        />

                        <Input
                          type="text"
                          label="Apellido"
                          id="lastName"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.lastName && formik.errors.lastName
                              ? formik.errors.lastName
                              : undefined
                          }
                          placeholder="Pérez"
                          required
                          fullWidth
                          icon={<User size={18} />}
                        />
                      </div>
                    </div>

                    {/* Información de Contacto */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Información de Contacto
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="email"
                          label="Correo electrónico"
                          id="username"
                          name="username"
                          value={formik.values.username}
                          disabled
                          fullWidth
                          icon={<Mail size={18} />}
                        />

                        <Input
                          type="tel"
                          label="Teléfono"
                          id="phone"
                          name="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.phone && formik.errors.phone
                              ? formik.errors.phone
                              : undefined
                          }
                          required
                          placeholder="1112345678"
                          fullWidth
                          icon={<Phone size={18} />}
                        />
                      </div>
                    </div>

                    {/* Sección de Dirección */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Dirección</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAddressModalOpen(true)}
                          className="flex items-center gap-2"
                        >
                          {formik.values.address ? (
                            <>
                              <Edit3 size={16} />
                              Editar
                            </>
                          ) : (
                            <>
                              <Plus size={16} />
                              Agregar
                            </>
                          )}
                        </Button>
                      </div>

                      {formik.values.address ? (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start gap-3">
                            <MapPin size={20} className="text-primary-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <div className="font-medium text-gray-900">
                                  {formik.values.address.street} {formik.values.address.number}
                                </div>
                                <a
                                  href={`https://www.google.com/maps?q=${formik.values.address.latitude},${formik.values.address.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1 ml-2"
                                >
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Ver en Maps
                                </a>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                {formik.values.address.city}, {formik.values.address.state}
                              </div>
                              <div className="text-xs text-gray-500 mb-2">
                                {formik.values.address.formattedAddress}
                              </div>
                              <div className="flex justify-between items-end">
                                <div className="flex gap-4 text-xs text-gray-500">
                                  <span>Lat: {formik.values.address.latitude.toFixed(6)}</span>
                                  <span>Lng: {formik.values.address.longitude.toFixed(6)}</span>
                                </div>
                                <div className="text-xs text-gray-400">
                                  💡 Verificá en Google Maps
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 text-center">
                          <MapPin size={32} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 mb-2">No tenés una dirección configurada</p>
                        </div>
                      )}

                      {/* Error de validación para address */}
                      {formik.touched.address && formik.errors.address && (
                        <div className="mt-2 text-sm text-red-600">
                          {typeof formik.errors.address === 'string'
                            ? formik.errors.address
                            : 'La dirección es requerida'}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 text-end">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        disabled={formik.isSubmitting || !formik.dirty}
                        className="w-full md:w-auto"
                      >
                        Guardar Cambios
                      </Button>
                    </div>
                  </Form>

                  {/* Modal de búsqueda de dirección */}
                  <AddressSearchModal
                    isOpen={isAddressModalOpen}
                    onClose={() => setIsAddressModalOpen(false)}
                    onAddressSelect={(address: IAddress) => {
                      formik.setFieldValue('address', address);
                      formik.setFieldTouched('address', true);
                      setIsAddressModalOpen(false);
                    }}
                    currentAddress={formik.values.address}
                  />
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
