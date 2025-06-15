import { useState, useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { INotification } from '@/interfaces/notifications';
import Modal from '@/components/ui/Modal';
import NotificationsMobile from '@/components/Notifications/NotificationsMobile';
import NotificationsDesktop from '@/components/Notifications/NotificationsDesktop';

const Notifications = () => {
  const {
    notifications,
    allCount,
    unreadCount,
    isLoading,
    hasMore,
    loadNotifications,
    loadMoreNotifications,
    markAsRead,
    removeNotification,
    getTimeAgo,
  } = useNotifications();

  const [selectedNotification, setSelectedNotification] = useState<INotification | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);
  const [showDetailOnMobile, setShowDetailOnMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    loadNotifications(1, 10);
  }, [loadNotifications]);

  // Seleccionar la primera notificación cuando se cargan (solo desktop)
  useEffect(() => {
    if (notifications.length > 0 && !selectedNotification && !isMobile) {
      setSelectedNotification(notifications[0]);
    }
  }, [notifications, selectedNotification, isMobile]);

  // Manejar selección de notificación
  const handleNotificationSelect = (notification: INotification) => {
    setSelectedNotification(notification);
    if (!notification.readed) {
      markAsRead(notification._id);
      // Actualizar el estado local inmediatamente para feedback visual
      setSelectedNotification(prev => (prev ? { ...prev, readed: true } : null));
    }

    // En mobile, mostrar el detalle
    if (isMobile) {
      setShowDetailOnMobile(true);
    }
  };

  // Volver a la lista en mobile
  const handleBackToList = () => {
    setShowDetailOnMobile(false);
  };

  // Manejar eliminación de notificación
  const handleDeleteNotification = (notificationId: string) => {
    setNotificationToDelete(notificationId);
    setShowDeleteModal(true);
  };

  // Confirmar eliminación
  const confirmDeleteNotification = () => {
    if (notificationToDelete) {
      removeNotification(notificationToDelete);
      if (selectedNotification?._id === notificationToDelete) {
        const remainingNotifications = notifications.filter(n => n._id !== notificationToDelete);
        setSelectedNotification(
          remainingNotifications.length > 0 ? remainingNotifications[0] : null
        );

        // En mobile, volver a la lista si se elimina la notificación actual
        if (isMobile) {
          setShowDetailOnMobile(false);
        }
      }
    }
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  // Cancelar eliminación
  const cancelDeleteNotification = () => {
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  // Manejar scroll infinito
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !isLoading) {
      loadMoreNotifications();
    }
  };

  // Props comunes para ambos componentes
  const commonProps = {
    notifications,
    selectedNotification,
    unreadCount,
    allCount,
    isLoading,
    hasMore,
    onNotificationSelect: handleNotificationSelect,
    onDeleteNotification: handleDeleteNotification,
    onScroll: handleScroll,
    getTimeAgo,
  };

  return (
    <>
      {isMobile ? (
        <NotificationsMobile
          {...commonProps}
          showDetailOnMobile={showDetailOnMobile}
          onBackToList={handleBackToList}
        />
      ) : (
        <NotificationsDesktop {...commonProps} />
      )}

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
              className={`${
                isMobile ? 'flex-1' : ''
              } px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium`}
            >
              Cancelar
            </button>
            <button
              onClick={confirmDeleteNotification}
              className={`${
                isMobile ? 'flex-1' : ''
              } px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium`}
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
    </>
  );
};

export default Notifications;
