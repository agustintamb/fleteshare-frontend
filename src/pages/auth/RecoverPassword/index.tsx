import { Form, Formik } from 'formik';
import { Mail } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { validationSchema } from './schema';
import { useRecoverPassword } from './useRecoverPassword';

const RecoverPassword = () => {
  const { recoverSent, initialValues, isLoading, error, handleRecoverPassword, handleGoToLogin } =
    useRecoverPassword();
  return (
    <div className="max-w-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Restablecer Contraseña</h2>
        <p className="mt-2 text-gray-600">Ingresá tu correo para recibir instrucciones.</p>
      </div>

      {error && (
        <div className="text-center mb-4 p-3 bg-error-50 text-error-800 rounded-md">{error}</div>
      )}

      {recoverSent ? (
        <div className="text-center text-green-600 mb-4">
          Listo! Enviamos un correo electrónico con instrucciones para restablecer tu contraseña.
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleRecoverPassword(values.username);
            setSubmitting(false);
          }}
        >
          {formik => (
            <Form className="space-y-6">
              <Input
                required
                fullWidth
                label="Correo electrónico"
                type="email"
                id="username"
                name="username"
                placeholder="tu@email.com"
                value={formik.values.username}
                onChange={formik.handleChange}
                icon={<Mail size={18} />}
              />
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
                Enviar instrucciones
              </Button>
            </Form>
          )}
        </Formik>
      )}
      {recoverSent && (
        <div className="text-center mt-4">
          <p className="text-sm text-center text-gray-500 mb-4">
            Si no recibís el correo, revisá tu carpeta de spam.
          </p>
          <Button
            variant="outline"
            fullWidth
            onClick={handleGoToLogin}
          >
            Volver al inicio de sesión
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecoverPassword;
