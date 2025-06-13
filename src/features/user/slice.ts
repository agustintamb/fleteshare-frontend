import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { IBaseSlice } from '@/interfaces/redux';
import { errorMessage } from '@/utils/errorMessage';
import { getCurrentUser } from './asyncActions';
import { IUser } from '@/interfaces/user';

interface initialStateProps extends IBaseSlice {
  user: IUser | null;
}

const initialState: initialStateProps = {
  user: null,
  error: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.result;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = errorMessage(action.payload);
      });
  },
});

//export const { } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user;

export const reducer = userSlice.reducer;
