import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { isAxiosError } from '@/utils/isAxiosError';
import { IUpdateUserProfileParams } from '@/interfaces/user';
import { getNotifications } from '@/features/notifications/asyncActions';
import User from '@/service/user';

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await User.getCurrentUser();
      dispatch(
        getNotifications({
          userId: data.result._id,
          page: 1,
          limit: 10,
        })
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (payload: IUpdateUserProfileParams, { rejectWithValue }) => {
    try {
      const { data } = await User.updateUserProfile(payload);
      if (data) toast.success('Perfil actualizado con éxito');
      return data;
    } catch (error) {
      toast.error('Error al actualizar el perfil');
      if (isAxiosError(error)) rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
