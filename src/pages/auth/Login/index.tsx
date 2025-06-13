import { Link } from 'react-router-dom';
import { User, KeyRound } from 'lucide-react';
import { Form, Formik } from 'formik';
import { validationSchema } from './schema';
import { useLogin } from './useLogin';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const Login = () => {
  const { initialValues, rememberMe, isLoading, error, handleLogin, handleCheckRememberMe } =
    useLogin();

  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-gray-600">Ingresá tus credenciales para acceder a tu cuenta</p>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-error-50 text-error-800 rounded-md text-center">{error}</div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values.username, values.password, rememberMe);
          setSubmitting(false);
        }}
      >
        {formik => (
          <Form className="space-y-6">
            <Input
              required
              fullWidth
              id="username"
              name="username"
              type="email"
              label="Correo electrónico"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
              placeholder="tu@email.com"
              icon={<User size={18} />}
            />

            <Input
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
              placeholder="••••••••"
              icon={<KeyRound size={18} />}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  checked={rememberMe}
                  onChange={handleCheckRememberMe}
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Recordar correo
                </label>
              </div>

              <div className="text-sm">
                <Link to="/recover-password" className="text-primary-600 hover:text-primary-500">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="button"
                onClick={() => formik.handleSubmit()}
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={!formik.isValid}
              >
                Iniciar Sesión
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿No tenés una cuenta?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
