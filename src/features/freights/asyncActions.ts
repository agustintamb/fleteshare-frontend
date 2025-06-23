import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { errorMessage } from '@/utils/errorMessage';
import freightsService from '@/service/freights';
import { toast } from 'react-toastify';
import {
  CreateFreightRequest,
  JoinFreightParams,
  CalculatePriceRequest,
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
      toast.error(`Error: ${errorMessage(error)}`);
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
      toast.error(`Error: ${errorMessage(error)}`, {
        autoClose: 6000,
      });
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

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
      if (data) toast.success('Listo! Te asignaste el flete');
      return data;
    } catch (error) {
      toast.error('Ups! Algo salió mal al asignarte el flete');
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const startFreight = createAsyncThunk(
  'freights/start',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.startFreight(freightId);
      if (data) toast.success('Muy bien! El flete ha comenzado');
      return data;
    } catch (error) {
      toast.error(`Error: ${errorMessage(error)}`);
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const leaveFreight = createAsyncThunk(
  'freights/leave',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.leaveFreight(freightId);
      if (data) toast.success('Has salido del flete correctamente');
      return data;
    } catch (error) {
      toast.error(`Error: ${errorMessage(error)}`);
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const cancelFreight = createAsyncThunk(
  'freights/cancel',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.cancelFreight(freightId);
      if (data) toast.success('Flete cancelado correctamente');
      return data;
    } catch (error) {
      toast.error(`Error: ${errorMessage(error)}`);
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const finishFreight = createAsyncThunk(
  'freights/finish',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.finishFreight(freightId);
      if (data) toast.success('Flete finalizado correctamente');
      return data;
    } catch (error) {
      toast.error(`Error: ${errorMessage(error)}`);
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const updateFreightStatus = createAsyncThunk(
  'freights/updateStatus',
  async ({ freightId, status }: { freightId: string; status: string }, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.updateFreightStatus(freightId, { status });
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const getFreightRoute = createAsyncThunk(
  'freights/getRoute',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.getFreightRoute(freightId);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const getFreightProgress = createAsyncThunk(
  'freights/getProgress',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.getFreightProgress(freightId);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const markStopAsVisited = createAsyncThunk(
  'freights/markStopAsVisited',
  async (
    {
      freightId,
      participantIndex,
      stopType,
    }: {
      freightId: string;
      participantIndex: number;
      stopType: 'pickup' | 'delivery';
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await freightsService.markStopAsVisited(freightId, {
        participantIndex,
        stopType,
      });
      if (data) toast.success('Listo! El fletero continuará su viaje');
      return data;
    } catch (error) {
      toast.error(`Error: ${errorMessage(error)}`);
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);

export const checkStopPermissions = createAsyncThunk(
  'freights/checkStopPermissions',
  async (freightId: string, { rejectWithValue }) => {
    try {
      const { data } = await freightsService.checkStopPermissions(freightId);
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error);
      return rejectWithValue(error);
    }
  }
);
