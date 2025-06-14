export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface IGetNotificationsParams {
  query?: IGetNotificationsQuery;
}

export interface IGetNotificationsResponse {
  notifications: INotification[];
  count: INotificationsCount;
  pagination: INotificationsPagination;
}

export interface IGetNotificationsQuery {
  userId?: string;
  limit: number;
  offset: number;
}

export interface INotification {
  _id: string;
  subject: string;
  body: string;
  type: NotificationType;
  readed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface INotificationsCount {
  unread: number;
  all: number;
}

export interface INotificationsPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  offset: number;
}
