import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { getNotifications } from '@/features/notifications/asyncActions';
import User from '@/service/user';

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await User.getCurrentUser();
      // auto-fetch notifications for the current user
      dispatch(
        getNotifications({
          userId: data.result._id,
          limit: 10,
          offset: 0,
        })
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
