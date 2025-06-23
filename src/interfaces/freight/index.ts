import { IAddress, ICoordinates } from '@/interfaces/address';

export type FreightStatus = 'requested' | 'taken' | 'started' | 'finished' | 'canceled';

export interface FreightFilters {
  search: string;
  status: FreightStatus | 'all';
  dateFrom: string;
  dateTo: string;
}

export interface IPackageDimensions {
  length: number; // cm
  width: number; // cm
  height: number; // cm
  volumeM3?: number; // calculado automáticamente por el backend
}

export interface IParticipant {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  avatar?: string;
}

export interface ITransporterData {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  vehicle: {
    plate: string;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  };
}

export interface IFreightParticipant {
  user: IParticipant;
  pickupAddress: IAddress;
  deliveryAddress: IAddress;
  packageDimensions: IPackageDimensions;
  price: number;
  distance: number;
  joinedAt: Date;
}

export interface IVehicleDimensions {
  length: number;
  width: number;
  height: number;
  totalVolumeM3: number;
}

export interface IAssignedVehicle {
  plate: string;
  dimensions: IVehicleDimensions;
}

export interface IRoutePoint {
  participantIndex: number;
  address: IAddress;
  visited: boolean;
  estimatedTime?: Date;
  _id?: string;
}

export interface RouteStop {
  participantIndex: number;
  type: 'pickup' | 'delivery';
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    formattedAddress: string;
    neighborhood: string;
  };
  visited: boolean;
  estimatedArrivalTime?: Date;
  distanceFromPrevious?: number;
  _id?: string;
}
export interface ISuggestedRoute {
  pickupSequence: IRoutePoint[];
  deliverySequence: IRoutePoint[];
  optimizedRoute?: RouteStop[];
  totalDistance: number;
  totalStops?: number;
  estimatedDuration?: number; // En minutos
}

export interface IRouteProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface IFreight {
  _id: string;
  createdBy: string;
  participants: IFreightParticipant[];
  transporterId?: ITransporterData;
  status: FreightStatus;
  assignedVehicle?: IAssignedVehicle;
  totalPrice: number;
  usedVolumeM3: number;
  availableVolumeM3: number;
  scheduledDate: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  suggestedRoute: ISuggestedRoute;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceCalculation {
  volumePrice: number;
  distancePrice: number;
  totalPrice: number;
  volumeM3: number;
  distanceKm: number;
  packageDimensions: IPackageDimensions;
  distance: number;
}

export interface FreightValidation {
  canJoin: boolean;
  reasons: string[];
  availableVolumeM3?: number;
  packageVolumeM3: number;
}

export interface FreightFormData {
  pickup: IAddress;
  delivery: IAddress;
  packageDetails: {
    width: number;
    height: number;
    length: number;
    description: string;
  };
  scheduledDate: string;
}

export interface CalculatePriceRequest {
  packageDimensions: Omit<IPackageDimensions, 'volumeM3'>;
  pickupAddress: ICoordinates;
  deliveryAddress: ICoordinates;
}

export interface CreateFreightRequest {
  pickupAddress: IAddress;
  deliveryAddress: IAddress;
  packageDimensions: Omit<IPackageDimensions, 'volumeM3'>; // volumeM3 se calcula automáticamente
  scheduledDate: string; // ISO string
}

export interface JoinFreightRequest {
  freightId: string;
  pickupAddress: IAddress;
  deliveryAddress: IAddress;
  packageDimensions: Omit<IPackageDimensions, 'volumeM3'>;
}

export interface JoinFreightParams {
  freightId: string;
  joinData: Omit<JoinFreightRequest, 'freightId'>;
}

export interface CreateFreightResponse {
  message: string;
  result: IFreight;
}

export interface IFreightsWithPagination {
  freights: IFreight[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FreightListResponse {
  message: string;
  result: IFreightsWithPagination;
}

export interface FreightDetailResponse {
  message: string;
  result: IFreight;
}

export interface ValidateJoinFreightParams {
  freightId: string;
  validationData: {
    pickupAddress: IAddress;
    deliveryAddress: IAddress;
    packageDimensions: Omit<IPackageDimensions, 'volumeM3'>;
  };
}

export interface GetUserFreightsQuery {
  page?: number;
  limit?: number;
  status?: string;
  scheduledDateFrom?: string;
  scheduledDateTo?: string;
}

export interface GetFreightsQuery {
  page?: number;
  limit?: number;
  status?: FreightStatus | 'all';
  scheduledDateFrom?: string;
  scheduledDateTo?: string;
  maxDistance?: number;
  userLat?: number;
  userLng?: number;
}
