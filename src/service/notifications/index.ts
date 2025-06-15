import { AxiosResponse } from 'axios';
import ServiceBase from '@/service//ServiceBase';
import { IGetNotificationsResponse } from '@/interfaces/notifications';

class NotificationsService extends ServiceBase {
  getNotifications = (query?: {
    userId?: string;
    limit: number;
    page: number;
  }): Promise<AxiosResponse<IGetNotificationsResponse>> => {
    const getQuery = query
      ? `?page=${query.page}&limit=${query.limit}&userId=${query.userId || ''}`
      : '';
    return this.client.get(`notifications${getQuery}`, {});
  };

  readNotification = (id: string) => this.client.put(`notifications/${id}/read`, {});

  deleteNotification = (id: string) => this.client.delete(`notifications/${id}`, {});
}

export default new NotificationsService();
