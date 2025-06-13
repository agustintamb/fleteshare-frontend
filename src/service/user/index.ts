import { AxiosResponse } from 'axios';
import ServiceBase from '@/service//ServiceBase';
import { IGetCurrentUserResponse } from '@/interfaces/user';

class UserService extends ServiceBase {
  getCurrentUser = () =>
    this.client.get<ResponseType, AxiosResponse<IGetCurrentUserResponse>>('users/current', {});
}

export default new UserService();
