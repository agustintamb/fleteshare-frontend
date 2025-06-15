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
