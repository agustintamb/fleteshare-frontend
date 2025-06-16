import React from 'react';
import { Bell } from 'lucide-react';
import { INotification } from '@/interfaces/notifications';
import NotificationList from './NotificationList';
import NotificationDetail from './NotificationDetail';

interface NotificationsDesktopProps {
  notifications: INotification[];
  selectedNotification: INotification | null;
  unreadCount: number;
  allCount: number;
  isLoading: boolean;
  hasMore: boolean;
  onNotificationSelect: (notification: INotification) => void;
  onDeleteNotification: (notificationId: string) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  getTimeAgo: (date: string) => string;
}

const NotificationsDesktop = ({
  notifications,
  selectedNotification,
  unreadCount,
  allCount,
  isLoading,
  hasMore,
  onNotificationSelect,
  onDeleteNotification,
  onScroll,
  getTimeAgo,
}: NotificationsDesktopProps) => {
  const renderEmptyState = () => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center text-gray-500">
        <Bell size={64} className="mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">Selecciona una notificación</h3>
        <p className="text-sm">Elige una notificación de la lista para ver sus detalles</p>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-7rem)] bg-gray-50 p-4 sm:p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-6 flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell size={28} className="text-primary-600" />
            Notificaciones
          </h1>
          <p className="text-gray-600 mt-2">
            Tenés <span className="font-semibold text-primary-600">{unreadCount}</span>{' '}
            notificaciones sin leer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Lista de Notificaciones - Columna Izquierda */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col min-h-0">
            <div className="p-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="font-semibold text-gray-900">Todas las notificaciones ({allCount})</h2>
            </div>
            <NotificationList
              notifications={notifications}
              selectedNotification={selectedNotification}
              isLoading={isLoading}
              hasMore={hasMore}
              onNotificationSelect={onNotificationSelect}
              onScroll={onScroll}
              getTimeAgo={getTimeAgo}
            />
          </div>

          {/* Detalle de Notificación - Columna Derecha */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 min-h-0">
            {selectedNotification ? (
              <NotificationDetail
                notification={selectedNotification}
                isMobile={false}
                onDelete={onDeleteNotification}
                getTimeAgo={getTimeAgo}
              />
            ) : (
              renderEmptyState()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDesktop;
