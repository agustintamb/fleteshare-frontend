import { AxiosResponse } from 'axios';
import {
  IGetCurrentUserResponse,
  IUpdateUserProfileParams,
  IUpdateUserProfileResponse,
} from '@/interfaces/user';
import { buildFormData } from '@/utils/formData';
import ServiceBase from '@/service//ServiceBase';

class UserService extends ServiceBase {
  getCurrentUser = () =>
    this.client.get<ResponseType, AxiosResponse<IGetCurrentUserResponse>>('users/current', {});

  updateUserProfile = (params: IUpdateUserProfileParams) => {
    if (params.license) {
      const formData = buildFormData(params, ['license']);
      return this.client.put<ResponseType, AxiosResponse<IUpdateUserProfileResponse>>(
        `users/profile/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    }
    return this.client.put<ResponseType, AxiosResponse<IUpdateUserProfileResponse>>(
      `users/profile/${params.id}`,
      params,
      {}
    );
  };
}

export default new UserService();
