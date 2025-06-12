import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginParams, IRegisterParams, IRecoverPasswordParams } from '@/interfaces/auth';
import { isAxiosError } from '@/utils/isAxiosError';
import Auth from '@/service/auth';

export const login = createAsyncThunk(
  'login/post',
  async (params: ILoginParams, { rejectWithValue }) => {
    try {
      const { data } = await Auth.login(params);
      const token = data?.result?.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk(
  'register/post',
  async (params: IRegisterParams, { rejectWithValue }) => {
    try {
      const { data } = await Auth.register(params);
      const token = data?.result?.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const recoverPassword = createAsyncThunk(
  'recoverPassword/post',
  async (params: IRecoverPasswordParams, { rejectWithValue }) => {
    try {
      const { data } = await Auth.recoverPassword(params);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const validateToken = createAsyncThunk(
  'validateToken/get',
  async (params: { token: string }, { rejectWithValue }) => {
    try {
      const { data } = await Auth.validateToken(params);

      return data;
    } catch (error) {
      // Limpiar token inválido
      localStorage.removeItem('token');
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);
