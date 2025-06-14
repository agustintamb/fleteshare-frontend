import { AxiosResponse } from 'axios';
import ServiceBase from '@/service//ServiceBase';
import { IGetNotificationsResponse } from '@/interfaces/notifications';

class NotificationsService extends ServiceBase {
  getNotifications = (query?: {
    userId?: string;
    limit: number;
    offset: number;
  }): Promise<AxiosResponse<IGetNotificationsResponse>> => {
    let getQuery = '';
    if (query) {
      const { userId, limit, offset } = query;
      getQuery = `?limit=${limit}&offset=${offset}&userId=${userId || ''}`;
    }
    return this.client.get(`notifications${getQuery}`, {});
  };

  readNotification = (id: string) => this.client.put(`notifications/${id}/read`, {});

  deleteNotification = (id: string) => this.client.delete(`notifications/${id}`, {});
}

export default new NotificationsService();
