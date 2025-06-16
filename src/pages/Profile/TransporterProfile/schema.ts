import * as Yup from 'yup';

// Validación para transportista
export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres'),

  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres'),

  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[+]?[\d\s\-()]+$/, 'Formato de teléfono inválido')
    .min(10, 'Debe tener al menos 10 dígitos'),

  plate: Yup.string()
    .required('La patente es obligatoria')
    .min(6, 'Debe tener al menos 6 caracteres')
    .max(10, 'No puede exceder los 10 caracteres'),

  storageLength: Yup.number()
    .required('El largo es obligatorio')
    .positive('Debe ser un número positivo')
    .min(1, 'Debe ser mayor a 0'),

  storageWidth: Yup.number()
    .required('El ancho es obligatorio')
    .positive('Debe ser un número positivo')
    .min(1, 'Debe ser mayor a 0'),

  storageHeight: Yup.number()
    .required('El alto es obligatorio')
    .positive('Debe ser un número positivo')
    .min(1, 'Debe ser mayor a 0'),

  license: Yup.mixed()
    .nullable()
    .test('fileSize', 'El archivo debe ser menor a 5MB', value => {
      if (!value) return true; // Es opcional en la actualización
      return (value as File).size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Solo se permiten archivos PNG, JPG o JPEG', value => {
      if (!value) return true; // Es opcional en la actualización
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      return allowedTypes.includes((value as File).type);
    }),
});
