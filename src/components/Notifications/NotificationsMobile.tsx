import React from 'react';
import { Bell } from 'lucide-react';
import { INotification } from '@/interfaces/notifications';
import NotificationList from './NotificationList';
import NotificationDetail from './NotificationDetail';

interface NotificationsMobileProps {
  notifications: INotification[];
  selectedNotification: INotification | null;
  showDetailOnMobile: boolean;
  unreadCount: number;
  allCount: number;
  isLoading: boolean;
  hasMore: boolean;
  onNotificationSelect: (notification: INotification) => void;
  onBackToList: () => void;
  onDeleteNotification: (notificationId: string) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  getTimeAgo: (date: string) => string;
}

const NotificationsMobile = ({
  notifications,
  selectedNotification,
  showDetailOnMobile,
  unreadCount,
  allCount,
  isLoading,
  hasMore,
  onNotificationSelect,
  onBackToList,
  onDeleteNotification,
  onScroll,
  getTimeAgo,
}: NotificationsMobileProps) => {
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
    <div className="h-[calc(100vh-7rem)] bg-gray-50 overflow-hidden flex flex-col">
      {!showDetailOnMobile ? (
        // Vista de lista en mobile
        <>
          {/* Header */}
          <div className="p-4 flex-shrink-0 bg-white border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <Bell size={24} className="text-primary-600" />
              Notificaciones
            </h1>
            {unreadCount > 0 && (
              <p className="text-gray-600 mt-1 text-sm">
                <span className="font-semibold text-primary-600">{unreadCount}</span> sin leer
              </p>
            )}
          </div>

          {/* Lista */}
          <div className="flex-1 bg-white min-h-0 flex flex-col">
            <div className="p-3 border-b border-gray-100 flex-shrink-0">
              <h2 className="font-medium text-gray-900 text-sm">
                Todas las notificaciones ({allCount})
              </h2>
            </div>
            <div className="flex-1 min-h-0 overflow-auto mb-8">
              <NotificationList
                isMobile
                notifications={notifications}
                selectedNotification={selectedNotification}
                isLoading={isLoading}
                hasMore={hasMore}
                onNotificationSelect={onNotificationSelect}
                onScroll={onScroll}
                getTimeAgo={getTimeAgo}
              />
            </div>
          </div>
        </>
      ) : (
        // Vista de detalle en mobile
        <div className="flex-1 bg-white min-h-0">
          {selectedNotification ? (
            <NotificationDetail
              notification={selectedNotification}
              isMobile={true}
              onBack={onBackToList}
              onDelete={onDeleteNotification}
              getTimeAgo={getTimeAgo}
            />
          ) : (
            renderEmptyState()
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsMobile;
