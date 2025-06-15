import { ArrowLeft, Trash2 } from 'lucide-react';
import { INotification } from '@/interfaces/notifications';
import NotificationIcon from './NotificationIcon';

interface NotificationDetailProps {
  notification: INotification;
  isMobile: boolean;
  onBack?: () => void;
  onDelete: (notificationId: string) => void;
  getTimeAgo: (date: string) => string;
}

const NotificationDetail = ({
  notification,
  isMobile,
  onBack,
  onDelete,
  getTimeAgo,
}: NotificationDetailProps) => {
  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Header del detalle */}
      <div className={`${isMobile ? 'p-3' : 'p-4 sm:p-6'} border-b border-gray-100 flex-shrink-0`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {isMobile && onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            )}

            <div
              className={`${isMobile ? 'p-2' : 'p-3'} rounded-full flex-shrink-0 ${
                notification.type === 'info'
                  ? 'bg-blue-100'
                  : notification.type === 'warning'
                  ? 'bg-yellow-100'
                  : notification.type === 'success'
                  ? 'bg-green-100'
                  : notification.type === 'error'
                  ? 'bg-red-100'
                  : 'bg-blue-100'
              }`}
            >
              <NotificationIcon type={notification.type} size={16} />
            </div>

            <div className="flex-1 min-w-0">
              <h1
                className={`${
                  isMobile ? 'text-base leading-tight' : 'text-xl'
                } font-semibold text-gray-900 ${isMobile ? 'mb-1' : 'mb-2'}`}
              >
                {notification.subject}
              </h1>
              <div
                className={`flex flex-wrap items-center gap-2 ${
                  isMobile ? 'text-xs' : 'text-sm'
                } text-gray-500`}
              >
                <span className="flex-shrink-0">
                  {new Date(notification.createdAt).toLocaleDateString('es-ES', {
                    ...(isMobile
                      ? {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      : {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }),
                  })}
                </span>
                <span className="flex items-center gap-1 flex-shrink-0">
                  - {notification.readed ? 'Leída' : 'Sin leer'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onDelete(notification._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 flex-shrink-0 ml-2"
            title="Eliminar notificación"
          >
            <Trash2 size={isMobile ? 18 : 20} />
          </button>
        </div>
      </div>

      {/* Contenido del detalle */}
      <div className={`flex-1 ${isMobile ? 'p-3' : 'p-4 sm:p-6'} overflow-y-auto min-h-0`}>
        <div className={`prose max-w-none ${isMobile ? 'prose-sm' : ''}`}>
          <div
            className={`text-gray-700 leading-relaxed whitespace-pre-line ${
              isMobile ? 'text-sm' : ''
            }`}
          >
            {notification.body}
          </div>
        </div>
      </div>

      {/* Footer con timestamp - solo desktop */}
      {!isMobile && (
        <div className="p-4 sm:p-6 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Recibida {getTimeAgo(notification.createdAt)}
            </span>
            <span className="text-xs text-gray-400">ID: {notification._id.slice(-8)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDetail;
