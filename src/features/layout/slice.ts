import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { IBaseSlice } from '@/interfaces/redux';

interface initialStateProps extends IBaseSlice {
  isSessionExpired: boolean;
}

const initialState: initialStateProps = {
  isSessionExpired: false,
  error: null,
  isLoading: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {},
});

//export const {} = layoutSlice.actions;

export const selectorLayout = (state: RootState) => state.layout;

export const reducer = layoutSlice.reducer;
