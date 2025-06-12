/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { IBaseSlice } from '@/interfaces/redux';
import { errorMessage } from '@/utils/errorMessage';
import { login, recoverPassword, register } from './asyncActions';

interface initialStateProps extends IBaseSlice {
  registerData: any | null;
  recoverSent: boolean;
}

const initialState: initialStateProps = {
  registerData: null,
  recoverSent: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearAuth: state => {
      state.registerData = null;
      state.recoverSent = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = errorMessage(action.payload);
      })
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.error = null;
        state.registerData = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = errorMessage(action.payload);
      })
      .addCase(recoverPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(recoverPassword.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
        state.recoverSent = true;
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = errorMessage(action.payload);
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;

export const selectorAuth = (state: RootState) => state.auth;

export const reducer = authSlice.reducer;
