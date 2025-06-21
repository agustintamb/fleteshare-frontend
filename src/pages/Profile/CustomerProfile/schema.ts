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

  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[+]?[\d\s\-()]+$/, 'Formato de teléfono inválido')
    .min(10, 'Debe tener al menos 10 dígitos'),

  address: Yup.object()
    .shape({
      street: Yup.string().required(
        'Parece que no hemos podido seleccionar la calle con precisión'
      ),
      latitude: Yup.number().required(
        'Parece que no hemos podido seleccionar la ubicación con precisión'
      ),
      longitude: Yup.number().required(
        'Parece que no hemos podido seleccionar la ubicación con precisión'
      ),
      formattedAddress: Yup.string().required('La dirección formateada es obligatoria'),
    })
    .nullable(),
});
