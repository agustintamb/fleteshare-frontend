import { AxiosResponse } from 'axios';
import ServiceBase from '@/service//ServiceBase';
import {
  ILoginParams,
  ILoginResponse,
  IRegisterParams,
  IRegisterResponse,
  IRecoverPasswordParams,
  IRecoverPasswordResponse,
} from '@/interfaces/auth';

class AuthService extends ServiceBase {
  register = (params: IRegisterParams) =>
    this.client.post<ResponseType, AxiosResponse<IRegisterResponse>>('auth/register', params, {});
  login = (params: ILoginParams) =>
    this.client.post<ResponseType, AxiosResponse<ILoginResponse>>('auth/login', params, {});
  recoverPassword = (params: IRecoverPasswordParams) =>
    this.client.post<ResponseType, AxiosResponse<IRecoverPasswordResponse>>(
      'auth/recoverPassword',
      params,
      {}
    );
  validateToken = (params: { token: string }) =>
    this.client.get<ResponseType, AxiosResponse<{ valid: boolean }>>(
      `auth/validateToken?token=${params.token}`
    );
}

export default new AuthService();
