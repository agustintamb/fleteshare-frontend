import { useState } from 'react';
import { User, Mail, Phone, Shield, Upload, Hash, Ruler } from 'lucide-react';
import { Form, Formik } from 'formik';
import { validationSchema } from './schema';
import { useAuth } from '@/hooks/useAuth';
import { getDocumentationStatusStyles, getDocumentationStatusText } from '@/utils/status';
import { UserDocumentationsStatus } from '@/interfaces/user';
import { useTransporterProfile } from './useTransporterProfile';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';

const renderLicenseStatus = (status: UserDocumentationsStatus) => (
  <span className={`text-center px-2 py-1 text-xs rounded-full ${getDocumentationStatusStyles(status)}`}>
    {getDocumentationStatusText(status)}
  </span>
);

const TransporterProfile = () => {
  const { currentUser } = useAuth();
  const { initialValues, isLoading, error, handleUpdateProfile } = useTransporterProfile();
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  const licenseImageUrl = currentUser.licenseUrl;

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
              {formik => (
                <Form className="space-y-6">
                  {/* Información Personal */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
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

                  {/* Información del Vehículo */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Información del Vehículo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Input
                        type="text"
                        label="Patente"
                        id="plate"
                        name="plate"
                        value={formik.values.plate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.plate && formik.errors.plate
                            ? formik.errors.plate
                            : undefined
                        }
                        placeholder="ABC123"
                        required
                        fullWidth
                        icon={<Hash size={18} />}
                      />

                      <Input
                        type="number"
                        label="Largo (cm)"
                        id="storageLength"
                        name="storageLength"
                        placeholder="420"
                        value={formik.values.storageLength}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.storageLength && formik.errors.storageLength
                            ? formik.errors.storageLength
                            : undefined
                        }
                        required
                        fullWidth
                        icon={<Ruler size={18} />}
                      />

                      <Input
                        type="number"
                        label="Ancho (cm)"
                        id="storageWidth"
                        name="storageWidth"
                        placeholder="200"
                        value={formik.values.storageWidth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.storageWidth && formik.errors.storageWidth
                            ? formik.errors.storageWidth
                            : undefined
                        }
                        required
                        fullWidth
                        icon={<Ruler size={18} />}
                      />

                      <Input
                        type="number"
                        label="Alto (cm)"
                        id="storageHeight"
                        name="storageHeight"
                        placeholder="220"
                        value={formik.values.storageHeight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.storageHeight && formik.errors.storageHeight
                            ? formik.errors.storageHeight
                            : undefined
                        }
                        required
                        fullWidth
                        icon={<Ruler size={18} />}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Las dimensiones del vehículo son importantes para calcular el espacio de
                      almacenamiento disponible.
                    </p>
                  </div>

                  {/* Documentación */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Documentación</h3>
                      {renderLicenseStatus(currentUser?.licenseStatus || 'pending')}
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield size={20} className="text-gray-500" />
                      <span className="text-sm text-gray-700">Licencia de Conducir</span>
                      <button
                        type="button"
                        onClick={() => setShowLicenseModal(true)}
                        className="text-primary-600 hover:underline"
                      >
                        Ver licencia
                      </button>
                    </div>

                    {/* Actualizar licencia */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Actualizar licencia
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-primary-300 transition-colors">
                        <input
                          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                          type="file"
                          name="license"
                          accept="image/*"
                          onChange={event => {
                            const file = event.currentTarget.files?.[0] || null;
                            formik.setFieldValue('license', file);
                            formik.setFieldTouched('license', true);
                          }}
                        />
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Upload size={14} className="mr-1" />
                          PNG, JPG o JPEG (máx. 5MB)
                        </div>
                        {formik.values.license && (
                          <p className="mt-2 text-sm text-primary-600">
                            Nuevo archivo seleccionado: {formik.values.license?.name || '-'}
                          </p>
                        )}
                      </div>
                      {formik.touched.license && formik.errors.license && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.license}</p>
                      )}
                    </div>
                  </div>

                  {/* Botón de guardar */}
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
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Modal para ver la licencia */}
      <Modal
        open={showLicenseModal}
        onClose={() => setShowLicenseModal(false)}
        title="Licencia de Conducir"
        size="lg"
      >
        {licenseImageUrl && (
            <div className="text-center">
            <img
              src={licenseImageUrl}
              alt="Licencia de conducir"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            </div>
        )}
      </Modal>
    </div>
  );
};
export default TransporterProfile;
