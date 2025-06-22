import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { IBaseSlice } from '@/interfaces/redux';
import { errorMessage } from '@/utils/errorMessage';
import { IFreight, IFreightsWithPagination, PriceCalculation } from '@/interfaces/freight';
import {
  calculatePrice,
  createFreight,
  joinFreight,
  //validateJoinFreight,
  getUserFreights,
  getFreightById,
  //updateFreightStatus,
  takeFreight,
  getFreights,
} from './asyncActions';

interface initialStateProps extends IBaseSlice {
  isLoadingUserFreights: boolean;
  isLoadingPriceCalculation: boolean;
  isLoadingJoin: boolean;
  priceCalculation: PriceCalculation | null;
  allFreights: IFreightsWithPagination | null;
  userFreights: IFreightsWithPagination | null;
  currentFreight: IFreight | null;
}

const initialState: initialStateProps = {
  error: null,
  isLoading: false,
  isLoadingUserFreights: false,
  isLoadingPriceCalculation: false,
  isLoadingJoin: false,
  priceCalculation: null,
  allFreights: null,
  userFreights: null,
  currentFreight: null,
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

    //// validateJoinFreight
    //builder.addCase(validateJoinFreight.pending, state => {
    //  state.isLoading = true;
    //  state.error = null;
    //});
    //builder.addCase(validateJoinFreight.fulfilled, (state, action) => {
    //  state.isLoading = false;
    //  // Add validation result to state if needed
    //});
    //builder.addCase(validateJoinFreight.rejected, (state, action) => {
    //  state.isLoading = false;
    //  state.error = errorMessage(action.payload);
    //});

    //// updateFreightStatus
    //builder.addCase(updateFreightStatus.pending, state => {
    //  state.isLoading = true;
    //  state.error = null;
    //});
    //builder.addCase(updateFreightStatus.fulfilled, (state, action) => {
    //  state.isLoading = false;
    //  // Update freight in relevant arrays
    //  if (state.userFreights) {
    //    const index = state.userFreights.findIndex(f => f.id === action.payload.id);
    //    if (index !== -1) {
    //      state.userFreights[index] = action.payload;
    //    }
    //  }
    //  if (state.currentFreight?.id === action.payload.id) {
    //    state.currentFreight = action.payload;
    //  }
    //});
    //builder.addCase(updateFreightStatus.rejected, (state, action) => {
    //  state.isLoading = false;
    //  state.error = errorMessage(action.payload);
    //});

    // takeFreight
    builder.addCase(takeFreight.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(takeFreight.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.userFreights) {
        state.userFreights.freights.push(action.payload.result);
      }
    });
    builder.addCase(takeFreight.rejected, (state, action) => {
      state.isLoading = false;
      state.error = errorMessage(action.payload);
    });
  },
});

export const { cleanPriceCalculation } = freightsSlice.actions;

export const selectorFreigths = (state: RootState) => state.freights;

export const reducer = freightsSlice.reducer;
