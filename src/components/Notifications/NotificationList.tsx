import React from 'react';
import { Bell } from 'lucide-react';
import { INotification } from '@/interfaces/notifications';
import NotificationListItem from './NotificationListItem';

interface NotificationListProps {
  notifications: INotification[];
  selectedNotification: INotification | null;
  isMobile?: boolean;
  isLoading: boolean;
  hasMore: boolean;
  onNotificationSelect: (notification: INotification) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  getTimeAgo: (date: string) => string;
}

const NotificationList = ({
  notifications,
  selectedNotification,
  isMobile = false,
  isLoading,
  hasMore,
  onNotificationSelect,
  onScroll,
  getTimeAgo,
}: NotificationListProps) => {
  const renderContent = () => {
    if (isLoading && notifications.length === 0) {
      return (
        <div className="p-8 text-center">
          <div className="inline-block w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-2">Cargando notificaciones...</p>
        </div>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">
          <Bell size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No tienes notificaciones</p>
          <p className="text-sm mt-1">Cuando recibas notificaciones, aparecerán aquí</p>
        </div>
      );
    }

    return (
      <>
        <div className="divide-y divide-gray-100">
          {notifications.map(notification => (
            <NotificationListItem
              key={notification._id}
              notification={notification}
              isSelected={selectedNotification?._id === notification._id}
              isMobile={isMobile}
              onSelect={onNotificationSelect}
              getTimeAgo={getTimeAgo}
            />
          ))}
        </div>

        {isLoading && notifications.length > 0 && (
          <div className="p-4 text-center">
            <div className="inline-block w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-gray-500 mt-1">Cargando más...</p>
          </div>
        )}

        {!hasMore && notifications.length > 0 && (
          <div className="p-4 text-center">
            <p className="text-xs text-gray-400">No hay más notificaciones</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-0" onScroll={onScroll}>
      {renderContent()}
    </div>
  );
};

export default NotificationList;
