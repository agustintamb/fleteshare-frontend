import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { IGetNotificationsQuery } from '@/interfaces/notifications';
import notificationService from '@/service/notifications';

export const getNotifications = createAsyncThunk(
  'notifications/get',
  async (query: IGetNotificationsQuery, { rejectWithValue }) => {
    try {
      const { data } = await notificationService.getNotifications(query);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const readNotification = createAsyncThunk(
  'notification/read',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await notificationService.readNotification(id);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notification/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await notificationService.deleteNotification(id);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);
