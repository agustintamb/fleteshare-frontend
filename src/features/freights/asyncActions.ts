import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import freightsService from '@/service/freights';
import { toast } from 'react-toastify';
import {
  CreateFreightRequest,
  JoinFreightParams,
  CalculatePriceRequest,
  //ValidateJoinFreightParams,
  GetUserFreightsQuery,
  GetFreightsQuery,
} from '@/interfaces/freight';

export const calculatePrice = createAsyncThunk(
  'freights/calculatePrice',
  async (data: CalculatePriceRequest, { rejectWithValue }) => {
    try {
      const { data: response } = await freightsService.calculatePrice(data);
      return response;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const createFreight = createAsyncThunk(
  'freights/create',
  async (freightData: CreateFreightRequest, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.createFreight(freightData);
      if (data) toast.success('Listo! Se ha generado tu solicitud');
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const joinFreight = createAsyncThunk(
  'freights/join',
  async ({ freightId, joinData }: JoinFreightParams, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.joinFreight(freightId, joinData);
      if (data) toast.success('Listo! Te uniste al flete');
      return data;
    } catch (error) {
      toast.error(`Error al unirte al flete: ${error}`);
      console.log('Error al unirte al flete:', error);
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

//export const validateJoinFreight = createAsyncThunk(
//  'freights/validateJoin',
//  async ({ freightId, validationData }: ValidateJoinFreightParams, { rejectWithValue }) => {
//    try {
//      const { data } = await freightsService.validateJoinFreight(freightId, validationData);
//      return data;
//    } catch (error) {
//      if (isAxiosError(error)) return rejectWithValue(error);
//      return rejectWithValue(error);
//    }
//  }
//);

export const getUserFreights = createAsyncThunk(
  'freights/getUserFreights',
  async (query: GetUserFreightsQuery | undefined, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.getUserFreights(query);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const getFreightById = createAsyncThunk(
  'freights/getById',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.getFreightById(freightId);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const updateFreightStatus = createAsyncThunk(
  'freights/updateStatus',
  async (
    {
      freightId,
      statusData,
    }: {
      freightId: string;
      statusData: {
        status: string;
        cancellationReason?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await freightsService.updateFreightStatus(freightId, statusData);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const getFreights = createAsyncThunk(
  'freights/get',
  async (query: GetFreightsQuery | undefined, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.getFreights(query);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const takeFreight = createAsyncThunk(
  'freights/take',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.takeFreight(freightId);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);
