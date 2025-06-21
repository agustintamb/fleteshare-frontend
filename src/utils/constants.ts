export const VITE_API_URL = import.meta.env.VITE_API_URL;
export const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
export const APP_PATH = import.meta.env.APP_PATH;

export enum ROUTES {
  HOME = '/',
  LOGIN = '/iniciar-sesion',
  CREATE_ACCOUNT = '/crear-cuenta',
  RECOVER_ACCOUNT = '/recuperar-cuenta',
  DASHBOARD = '/dashboard',
  PROFILE = '/mi-perfil',
  NOTIFICATIONS = '/notificaciones',
  FREIGHT = '/fletes',
  FREIGHT_NEW = '/fletes/nuevo',
  FREIGHT_DETAILS = '/fletes/:id',
  NOT_FOUND = '/*',
}

export const FREIGHT_CONSTANTS = {
  MAX_PARTICIPANTS: 3,
  MAX_DISTANCE_RANGE_KM: 20,
  MIN_PACKAGE_DIMENSION_CM: 1,
  VOLUME_CONVERSION_FACTOR: 1000000, // cm³ a m³
} as const;

export const emptyAddress = {
  street: '',
  number: '',
  city: 'Buenos Aires',
  state: 'Buenos Aires',
  country: 'Argentina',
  postalCode: '',
  latitude: 0,
  longitude: 0,
  formattedAddress: '',
  neighborhood: '',
};
