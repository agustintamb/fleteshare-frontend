import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useAuth } from '@/hooks/useAuth';
import {
  getNotifications,
  readNotification,
  deleteNotification,
} from '@/features/notifications/asyncActions';
import {
  clearNotifications,
  resetError,
  selectorNotifications,
} from '@/features/notifications/slice';

export const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useAuth();

  const { notifications, count, isLoading, error, pagination } = useSelector(selectorNotifications);

  const unreadCount = count.unread;
  const hasMore = pagination.currentPage < pagination.totalPages;

  // Load notifications
  const loadNotifications = useCallback(
    (page: number = 1, limit: number = 10) => {
      if (currentUser?._id) {
        console.log('Loading notifications', { page, limit });
        dispatch(
          getNotifications({
            userId: currentUser._id,
            limit,
            offset: (page - 1) * limit,
          })
        );
      }
    },
    [dispatch, currentUser?._id]
  );

  // Load more notifications (for infinite scroll)
  const loadMoreNotifications = useCallback(() => {
    if (!isLoading && hasMore && currentUser?._id) {
      const nextPage = pagination.currentPage + 1;
      loadNotifications(nextPage, pagination.itemsPerPage);
    }
  }, [isLoading, hasMore, currentUser?._id, pagination, loadNotifications]);

  // Mark notification as read
  const markAsRead = useCallback(
    (notificationId: string) => {
      dispatch(readNotification(notificationId));
    },
    [dispatch]
  );

  // Delete notification
  const removeNotification = useCallback(
    (notificationId: string) => {
      dispatch(deleteNotification(notificationId));
    },
    [dispatch]
  );

  // Refresh notifications (reload from first page)
  const refreshNotifications = useCallback(() => {
    if (currentUser?._id) {
      loadNotifications(1, pagination.itemsPerPage);
    }
  }, [loadNotifications, currentUser?._id, pagination.itemsPerPage]);

  // Clear all notifications from state
  const clearAllNotifications = useCallback(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  // Clear error
  const clearError = useCallback(() => {
    dispatch(resetError());
  }, [dispatch]);

  // Utility functions for UI
  const getNotificationIcon = useCallback((type: string) => {
    // Esta función la moveríamos aquí para reutilización
    return type;
  }, []);

  const getTimeAgo = useCallback((dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Hace unos segundos';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Hace ${minutes}m`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Hace ${hours}h`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `Hace ${days}d`;
    } else {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
      });
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    pagination,
    hasMore,
    loadNotifications,
    loadMoreNotifications,
    markAsRead,
    removeNotification,
    refreshNotifications,
    clearAllNotifications,
    clearError,
    getNotificationIcon,
    getTimeAgo,
  };
};
