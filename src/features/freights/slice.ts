/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { IBaseSlice } from '@/interfaces/redux';
import { errorMessage } from '@/utils/errorMessage';
import { IFreight, IFreightsWithPagination, PriceCalculation } from '@/interfaces/freight';
import {
  calculatePrice,
  createFreight,
  joinFreight,
  getUserFreights,
  getFreightById,
  takeFreight,
  leaveFreight,
  cancelFreight,
  updateFreightStatus,
  markStopAsVisited,
  getFreights,
  finishFreight,
  getFreightRoute,
  getFreightProgress,
  checkStopPermissions,
  startFreight,
} from './asyncActions';

interface initialStateProps extends IBaseSlice {
  isLoadingUserFreights: boolean;
  isLoadingPriceCalculation: boolean;
  isLoadingJoin: boolean;
  isActionLoading: boolean;
  priceCalculation: PriceCalculation | null;
  allFreights: IFreightsWithPagination | null;
  userFreights: IFreightsWithPagination | null;
  currentFreight: IFreight | null;
  freightRoute: any;
  freightProgress: any;
  stopPermissions: any;
}

const initialState: initialStateProps = {
  error: null,
  isLoading: false,
  isLoadingUserFreights: false,
  isLoadingPriceCalculation: false,
  isLoadingJoin: false,
  isActionLoading: false,
  priceCalculation: null,
  allFreights: null,
  userFreights: null,
  currentFreight: null,
  freightRoute: null,
  freightProgress: null,
  stopPermissions: null,
};

export const freightsSlice = createSlice({
  name: 'freights',
  initialState,
  reducers: {
    cleanPriceCalculation: state => {
      state.priceCalculation = null;
    },
  },
  extraReducers: builder => {
    // calculatePrice
    builder.addCase(calculatePrice.pending, state => {
      state.isLoadingPriceCalculation = true;
      state.error = null;
    });
    builder.addCase(calculatePrice.fulfilled, (state, action) => {
      state.isLoadingPriceCalculation = false;
      state.priceCalculation = action.payload.result;
    });
    builder.addCase(calculatePrice.rejected, (state, action) => {
      state.isLoadingPriceCalculation = false;
      state.error = errorMessage(action.payload);
    });

    // createFreight
    builder.addCase(createFreight.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createFreight.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentFreight = action.payload.result;
      state.priceCalculation = null; // Clear price calculation after creating freight
      state.error = null; // Clear any previous error
    });
    builder.addCase(createFreight.rejected, (state, action) => {
      state.isLoading = false;
      state.error = errorMessage(action.payload);
    });

    // getFreights
    builder.addCase(getFreights.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFreights.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allFreights = action.payload.result;
    });
    builder.addCase(getFreights.rejected, (state, action) => {
      state.isLoading = false;
      state.error = errorMessage(action.payload);
    });

    // getUserFreights
    builder.addCase(getUserFreights.pending, state => {
      state.isLoadingUserFreights = true;
      state.error = null;
    });
    builder.addCase(getUserFreights.fulfilled, (state, action) => {
      state.isLoadingUserFreights = false;
      state.userFreights = action.payload.result;
    });
    builder.addCase(getUserFreights.rejected, (state, action) => {
      state.isLoadingUserFreights = false;
      state.error = errorMessage(action.payload);
    });

    // getFreightById
    builder.addCase(getFreightById.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFreightById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentFreight = action.payload.result;
    });
    builder.addCase(getFreightById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = errorMessage(action.payload);
    });

    // joinFreight
    builder.addCase(joinFreight.pending, state => {
      state.isLoadingJoin = true;
      state.error = null;
    });
    builder.addCase(joinFreight.fulfilled, state => {
      state.isLoadingJoin = false;
    });
    builder.addCase(joinFreight.rejected, (state, action) => {
      state.isLoadingJoin = false;
      state.error = errorMessage(action.payload);
    });

    // takeFreight
    builder.addCase(takeFreight.pending, state => {
      state.isActionLoading = true;
      state.error = null;
    });
    builder.addCase(takeFreight.fulfilled, state => {
      state.isActionLoading = false;
    });
    builder.addCase(takeFreight.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = errorMessage(action.payload);
    });

    // startFreight
    builder.addCase(startFreight.pending, state => {
      state.isActionLoading = true;
      state.error = null;
    });
    builder.addCase(startFreight.fulfilled, state => {
      state.isActionLoading = false;
    });
    builder.addCase(startFreight.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = errorMessage(action.payload);
    });

    // leaveFreight
    builder.addCase(leaveFreight.pending, state => {
      state.isActionLoading = true;
      state.error = null;
    });
    builder.addCase(leaveFreight.fulfilled, state => {
      state.isActionLoading = false;
    });
    builder.addCase(leaveFreight.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = errorMessage(action.payload);
    });

    // cancelFreight
    builder.addCase(cancelFreight.pending, state => {
      state.isActionLoading = true;
      state.error = null;
    });
    builder.addCase(cancelFreight.fulfilled, state => {
      state.isActionLoading = false;
    });
    builder.addCase(cancelFreight.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = errorMessage(action.payload);
    });

    // finishFreight
    builder.addCase(finishFreight.pending, state => {
      state.isActionLoading = true;
      state.error = null;
    });
    builder.addCase(finishFreight.fulfilled, (state, action) => {
      state.isActionLoading = false;
      state.currentFreight = action.payload.result;
    });
    builder.addCase(finishFreight.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = errorMessage(action.payload);
    });

    // updateFreightStatus
    builder.addCase(updateFreightStatus.pending, state => {
      state.isActionLoading = true;
      state.error = null;
    });
    builder.addCase(updateFreightStatus.fulfilled, (state, action) => {
      state.isActionLoading = false;
      state.currentFreight = action.payload.result;
    });
    builder.addCase(updateFreightStatus.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = errorMessage(action.payload);
    });

    // getFreightRoute
    builder.addCase(getFreightRoute.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFreightRoute.fulfilled, (state, action) => {
      state.isLoading = false;
      state.freightRoute = action.payload.result;
    });
    builder.addCase(getFreightRoute.rejected, (state, action) => {
      state.isLoading = false;
      state.error = errorMessage(action.payload);
    });

    // getFreightProgress
    builder.addCase(getFreightProgress.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFreightProgress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.freightProgress = action.payload.result;
    });
    builder.addCase(getFreightProgress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = errorMessage(action.payload);
    });

    // markStopAsVisited
    builder.addCase(markStopAsVisited.pending, state => {
      state.isActionLoading = true;
      state.error = null;
    });
    builder.addCase(markStopAsVisited.fulfilled, (state, action) => {
      state.isActionLoading = false;
      state.currentFreight = action.payload.result;
    });
    builder.addCase(markStopAsVisited.rejected, (state, action) => {
      state.isActionLoading = false;
      state.error = errorMessage(action.payload);
    });

    // checkStopPermissions
    builder.addCase(checkStopPermissions.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkStopPermissions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stopPermissions = action.payload.result;
    });
    builder.addCase(checkStopPermissions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = errorMessage(action.payload);
    });
  },
});

export const { cleanPriceCalculation } = freightsSlice.actions;

export const selectorFreigths = (state: RootState) => state.freights;

export const reducer = freightsSlice.reducer;
