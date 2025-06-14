import { Link } from 'react-router-dom';
import { User, Mail, KeyRound, Phone } from 'lucide-react';
import { Form, Formik } from 'formik';
import { validationSchema } from './schema';
import { useRegister } from './useRegister';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const Register = () => {
  const { initialValues, isLoading, handleRegister, error } = useRegister();

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-gray-600">Comenzá a usar FleteShare</p>
      </div>

      {error && (
        <div className="text-center mb-4 p-3 bg-error-50 text-error-800 rounded-md">{error}</div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleRegister(values);
          setSubmitting(false);
        }}
      >
        {formik => (
          <Form className="space-y-6">
            {/* Layout de dos columnas - solo en desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <Input
                  type="email"
                  label="Correo electrónico"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && formik.errors.username
                      ? formik.errors.username
                      : undefined
                  }
                  placeholder="tu@email.com"
                  required
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
                    formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined
                  }
                  required
                  placeholder="1112345678"
                  fullWidth
                  icon={<Phone size={18} />}
                />

                <Input
                  type="password"
                  label="Contraseña"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : undefined
                  }
                  placeholder="••••••••"
                  required
                  fullWidth
                  icon={<KeyRound size={18} />}
                  helperText="Mínimo 5 caracteres"
                />

                <Input
                  type="password"
                  label="Confirmar contraseña"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : undefined
                  }
                  placeholder="••••••••"
                  required
                  fullWidth
                  icon={<KeyRound size={18} />}
                />
              </div>

              {/* Columna derecha - Tipo de cuenta y documentos */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipo de cuenta <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col gap-4 lg:min-w-[385px]">
                    <div
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        formik.values.role === 'customer'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-primary-300'
                      }`}
                      onClick={() => {
                        formik.setFieldValue('role', 'customer');
                        formik.setFieldTouched('role', true);
                      }}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          checked={formik.values.role === 'customer'}
                          onChange={() => {
                            formik.setFieldValue('role', 'customer');
                            formik.setFieldTouched('role', true);
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label className="ml-3 font-medium text-gray-900">Cliente</label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 ml-7">
                        Quiero solicitar servicios de flete
                      </p>
                    </div>

                    <div
                      className={`border rounded-md p-4 cursor-pointer transition-colors ${
                        formik.values.role === 'transporter'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-300 hover:border-primary-300'
                      }`}
                      onClick={() => {
                        formik.setFieldValue('role', 'transporter');
                        formik.setFieldTouched('role', true);
                      }}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          checked={formik.values.role === 'transporter'}
                          onChange={() => {
                            formik.setFieldValue('role', 'transporter');
                            formik.setFieldTouched('role', true);
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label className="ml-3 font-medium text-gray-900">Transportista</label>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 ml-7">
                        Quiero ofrecer servicios de transporte
                      </p>
                    </div>
                  </div>
                  {formik.touched.role && formik.errors.role && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.role}</p>
                  )}
                </div>

                {/* Documentos para transportista */}
                {formik.values.role === 'transporter' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto de la licencia <span className="text-red-500">*</span>
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
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG o JPEG (máx. 5MB)</p>
                    </div>
                    {formik.touched.license && formik.errors.license && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.license}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Botón y enlaces - ancho completo */}
            <div className="pt-4">
              <Button
                type="button"
                onClick={() => {
                  formik.handleSubmit();
                }}
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={formik.isSubmitting}
              >
                Crear Cuenta
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tenés una cuenta?{' '}
          <Link to="/iniciar-sesion" className="text-primary-600 hover:text-primary-500 font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>

      <div className="mt-5 pt-6 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Al registrarte, aceptas los{' '}
          <Link to="/terms" className="text-primary-600 hover:text-primary-500">
            Términos de servicio
          </Link>{' '}
          y la{' '}
          <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
            Política de privacidad
          </Link>{' '}
          de FleteShare.
        </p>
      </div>
    </div>
  );
};

export default Register;
