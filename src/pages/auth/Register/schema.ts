import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres'),

  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres'),

  username: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido'),

  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[+]?[\d\s\-()]+$/, 'Formato de teléfono inválido')
    .min(10, 'Debe tener al menos 10 dígitos'),

  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(5, 'Debe tener al menos 5 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Debe contener al menos una mayúscula y un número'
    ),

  confirmPassword: Yup.string()
    .required('Debes confirmar la contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),

  role: Yup.string()
    .required('Debes seleccionar un tipo de perfil')
    .oneOf(['customer', 'transporter'], 'Tipo de perfil inválido'),

  license: Yup.mixed().when('role', {
    is: 'transporter',
    then: schema =>
      schema
        .required('Debes subir una foto de tu licencia')
        .test('fileSize', 'El archivo debe ser menor a 5MB', value => {
          if (!value) return false;
          return (value as File).size <= 5 * 1024 * 1024; // 5MB
        })
        .test('fileType', 'Solo se permiten archivos PNG, JPG o JPEG', value => {
          if (!value) return false;
          const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
          return allowedTypes.includes((value as File).type);
        }),
    otherwise: schema => schema.nullable(),
  }),
});
