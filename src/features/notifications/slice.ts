import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBaseSlice } from '@/interfaces/redux';
import { getNotifications, readNotification, deleteNotification } from './asyncActions';
import {
  IGetNotificationsResponse,
  INotification,
  INotificationsCount,
  INotificationsPagination,
} from '@/interfaces/notifications';

interface initialStateProps extends IBaseSlice {
  notifications: INotification[];
  count: INotificationsCount;
  pagination: INotificationsPagination;
}

const initialState: initialStateProps = {
  error: null,
  isLoading: false,
  notifications: [],
  count: {
    unread: 0,
    all: 0,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    offset: 0,
  },
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: state => {
      state.notifications = [];
      state.count = { unread: 0, all: 0 };
      state.pagination = initialState.pagination;
    },
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch Notifications
    builder
      .addCase(getNotifications.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getNotifications.fulfilled,
        (state, action: PayloadAction<IGetNotificationsResponse>) => {
          state.isLoading = false;
          state.error = null;

          // Si es la primera página, reemplazar; si no, agregar al final (scroll infinito)
          if (action.payload.pagination.currentPage === 1) {
            state.notifications = action.payload.notifications;
          } else {
            state.notifications = [...state.notifications, ...action.payload.notifications];
          }

          state.count = action.payload.count;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Read Notification
    builder
      .addCase(readNotification.pending, state => {
        // Opcional: mostrar loading específico para marcar como leída
        state.isLoading = true;
        state.error = null;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        // Buscar la notificación y marcarla como leída
        const notificationIndex = state.notifications.findIndex(
          notification => notification._id === action.meta.arg
        );

        if (notificationIndex !== -1) {
          const wasUnread = !state.notifications[notificationIndex].readed;
          state.notifications[notificationIndex].readed = true;

          // Decrementar contador si era no leída
          if (wasUnread) {
            state.count.unread = Math.max(0, state.count.unread - 1);
          }
        }

        state.isLoading = false;
      })
      .addCase(readNotification.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    // Delete Notification
    builder
      .addCase(deleteNotification.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const notificationId = action.meta.arg;
        const notificationIndex = state.notifications.findIndex(
          notification => notification._id === notificationId
        );

        if (notificationIndex !== -1) {
          const notification = state.notifications[notificationIndex];
          const wasUnread = !notification.readed;

          // Remover la notificación
          state.notifications.splice(notificationIndex, 1);

          // Actualizar contadores
          state.count.all = Math.max(0, state.count.all - 1);
          if (wasUnread) {
            state.count.unread = Math.max(0, state.count.unread - 1);
          }

          // Actualizar paginación
          state.pagination.totalItems = Math.max(0, state.pagination.totalItems - 1);
        }
        state.isLoading = false;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { clearNotifications, resetError } = notificationsSlice.actions;

// Selectors
export const selectorNotifications = (state: RootState) => state.notifications;

export const reducer = notificationsSlice.reducer;
