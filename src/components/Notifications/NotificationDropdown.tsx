import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationIcon from './NotificationIcon';
import Modal from '@/components/ui/Modal';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);

  const {
    notifications,
    unreadCount,
    isLoading,
    hasMore,
    loadMoreNotifications,
    markAsRead,
    removeNotification,
    getTimeAgo,
  } = useNotifications();

  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  // Manejar scroll infinito
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - scrollTop === clientHeight && hasMore && !isLoading) {
      loadMoreNotifications();
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Manejar eliminación de notificación
  const handleDeleteNotification = (notificationId: string) => {
    setNotificationToDelete(notificationId);
    setShowDeleteModal(true);
  };

  // Confirmar eliminación
  const confirmDeleteNotification = () => {
    if (notificationToDelete) {
      removeNotification(notificationToDelete);
    }
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  // Cancelar eliminación
  const cancelDeleteNotification = () => {
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={toggleDropdown}
        className="relative text-gray-500 hover:text-primary-600 transition p-1"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {unreadCount} nuevas
                  </span>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <Bell size={48} className="mx-auto mb-2 text-gray-300" />
                  <p>No tenés notificaciones</p>
                </div>
              ) : (
                <div className="">
                  {notifications.map(notification => (
                    <div
                      key={notification._id}
                      className={`p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/20 transition-all duration-200 ${
                        !notification.readed
                          ? 'bg-gradient-to-r from-blue-50/40 to-purple-50/20 border-l-4 border-blue-400'
                          : 'bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon with colored background */}
                        <div
                          className={`mt-0.5 p-2 rounded-full ${
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
                          <NotificationIcon type={notification.type} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              className={`text-sm ${
                                !notification.readed
                                  ? 'font-semibold text-gray-900'
                                  : 'font-medium text-gray-700'
                              } line-clamp-1`}
                            >
                              {notification.subject}
                            </h4>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleDeleteNotification(notification._id);
                              }}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-full transition-all duration-200 flex-shrink-0"
                              title="Eliminar notificación"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {notification.body}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-400">
                              {getTimeAgo(notification.createdAt)}
                            </span>

                            {!notification.readed && (
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  markAsRead(notification._id);
                                }}
                                className="text-xs text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 px-3 py-1 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                Marcar leída
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="p-4 text-center">
                      <div className="inline-block w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100">
                <Link
                  className="block text-center text-sm text-primary-600"
                  onClick={() => setIsOpen(false)}
                  to={ROUTES.NOTIFICATIONS}
                >
                  Ver todas las notificaciones
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmación */}
      <Modal
        open={showDeleteModal}
        onClose={cancelDeleteNotification}
        title="Eliminar notificación"
        size="sm"
        actions={
          <div className="flex gap-3">
            <button
              onClick={cancelDeleteNotification}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDeleteNotification}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Eliminar
            </button>
          </div>
        }
      >
        <div className="text-gray-700">
          <p>¿Estás seguro?</p>
          <p className="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationDropdown;
