import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('El nombre de usuario es obligatorio')
    .email('Debe ser un correo electrónico válido'),

  password: Yup.string().required('La contraseña es obligatoria'),

  rememberMe: Yup.boolean(),
});
