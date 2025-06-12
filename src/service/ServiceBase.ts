import axios, { AxiosResponse } from 'axios';
import { VITE_API_URL } from '@/utils/constants';

export default abstract class ServiceBase {
  protected readonly client;
  private isLoggedOut = false;

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

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private clearSession = () => {
    if (this.isLoggedOut) return;
    this.isLoggedOut = true;

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Disparar evento personalizado para que el store reaccione
    window.dispatchEvent(new CustomEvent('session-expired'));

    // Redirect después de un pequeño delay para permitir que el store se actualice
    setTimeout(() => {
      window.location.href = '/login';
      this.isLoggedOut = false;
    }, 100);
  };

  private setupInterceptors() {
    this.client.interceptors.request.use(config => {
      config.headers!.Authorization = 'Bearer ' + this.getToken();
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
            console.log('🔒 Sesión expirada o inválida. Cerrando sesión...');
            this.clearSession();
          }
        }

        return Promise.reject(error);
      }
    );
  }
}
