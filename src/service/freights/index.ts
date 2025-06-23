import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import { IApiResponse } from '@/interfaces/api';
import { ICoordinates } from '@/interfaces/address';
import {
  CreateFreightRequest,
  JoinFreightRequest,
  FreightDetailResponse,
  FreightListResponse,
  CreateFreightResponse,
  IPackageDimensions,
  GetUserFreightsQuery,
  GetFreightsQuery,
} from '@/interfaces/freight';

class FreightsService extends ServiceBase {
  calculatePrice = (data: {
    packageDimensions: Omit<IPackageDimensions, 'volumeM3'>;
    pickupAddress: ICoordinates;
    deliveryAddress: ICoordinates;
  }): Promise<AxiosResponse<IApiResponse>> => this.client.post('freights/calculate-price', data);

  createFreight = (
    freightData: CreateFreightRequest
  ): Promise<AxiosResponse<CreateFreightResponse>> => this.client.post('freights', freightData);

  joinFreight = (
    freightId: string,
    joinData: Omit<JoinFreightRequest, 'freightId'>
  ): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.post(`freights/${freightId}/join`, joinData);

  getUserFreights = (query?: GetUserFreightsQuery): Promise<AxiosResponse<FreightListResponse>> => {
    const params = new URLSearchParams();
    if (query)
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, value.toString());
      });
    const getQuery = params.toString() ? `?${params.toString()}` : '';
    return this.client.get(`freights/my-freights${getQuery}`);
  };

  getFreightById = (freightId: string): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.get(`freights/${freightId}`);

  getFreights = (query?: GetFreightsQuery): Promise<AxiosResponse<FreightListResponse>> => {
    const params = new URLSearchParams();
    if (query)
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, value.toString());
      });
    const getQuery = params.toString() ? `?${params.toString()}` : '';
    return this.client.get(`freights/${getQuery}`);
  };

  takeFreight = (freightId: string): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.post(`freights/${freightId}/take`, {});

  startFreight = (freightId: string): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.post(`freights/${freightId}/start`, {});

  leaveFreight = (freightId: string): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.post(`freights/${freightId}/leave`, {});

  cancelFreight = (freightId: string): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.post(`freights/${freightId}/cancel`, {});

  finishFreight = (freightId: string): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.post(`freights/${freightId}/finish`, {});

  updateFreightStatus = (
    freightId: string,
    statusData: { status: string }
  ): Promise<AxiosResponse<FreightDetailResponse>> =>
    this.client.patch(`freights/${freightId}/status`, statusData);

  getFreightRoute = (freightId: string): Promise<AxiosResponse<IApiResponse>> =>
    this.client.get(`freights/${freightId}/route`);

  getFreightProgress = (freightId: string): Promise<AxiosResponse<IApiResponse>> =>
    this.client.get(`freights/${freightId}/progress`);

  markStopAsVisited = (
    freightId: string,
    data: { participantIndex: number; stopType: 'pickup' | 'delivery' }
  ): Promise<AxiosResponse<IApiResponse>> =>
    this.client.post(`/freights/${freightId}/mark-visited`, data);

  checkStopPermissions = (freightId: string): Promise<AxiosResponse<IApiResponse>> =>
    this.client.get(`freights/${freightId}/check-permissions`);
}

export default new FreightsService();
