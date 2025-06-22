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

  //validateJoinFreight = (
  //  freightId: string,
  //  data: {
  //    pickupAddress: IAddress;
  //    deliveryAddress: IAddress;
  //    packageDimensions: Omit<IPackageDimensions, 'volumeM3'>;
  //  }
  //): Promise<AxiosResponse<IApiResponse>> =>
  //  this.client.post(`freights/${freightId}/validate-join`, data);

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

  updateFreightStatus = (
    freightId: string,
    data: {
      status: string;
      cancellationReason?: string;
    }
  ): Promise<AxiosResponse<FreightDetailResponse>> => {
    return this.client.patch(`freights/${freightId}/status`, data);
  };

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
}

export default new FreightsService();
