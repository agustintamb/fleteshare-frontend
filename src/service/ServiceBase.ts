import axios, { AxiosResponse } from 'axios';
import store from '@/app/store';
import { getToken } from '@/utils/storage';
import { setIsSessionExpired } from '@/features/auth/slice';
import { VITE_API_URL } from '@/utils/constants';

export default abstract class ServiceBase {
  protected readonly client;

  constructor() {
    this.client = axios.create({
      baseURL: VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.setupInterceptors();
  }


  private handleSessionExpired() {
    store.dispatch(setIsSessionExpired(true));
  }

  private clearSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.handleSessionExpired();
  };

  private setupInterceptors() {
    this.client.interceptors.request.use(config => {
      config.headers!.Authorization = 'Bearer ' + getToken();
      return config;
    });

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      error => {
        // Manejar errores de autenticación y autorización
        if (error.response?.status === 401 || error.response?.status === 403) {
          const errorMessage = error.response?.data?.error?.toLowerCase() || '';

          // Casos específicos que requieren logout
          const logoutCases = [
            'token es inválido o ha expirado',
            'usuario no encontrado',
            'usuario deshabilitado',
          ];

          const shouldLogout =
            logoutCases.some(logoutCase => errorMessage.includes(logoutCase)) ||
            !localStorage.getItem('token');

          const isLoginPage = location.pathname === '/login';

          if (!isLoginPage && shouldLogout) {
            this.clearSession();
          }
        }

        return Promise.reject(error);
      }
    );
  }
}
