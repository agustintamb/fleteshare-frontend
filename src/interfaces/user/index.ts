import { IAddress } from '@/interfaces/address';

export type UserRole = 'customer' | 'transporter';
export type UserDocumentationsStatus = 'pending' | 'approved' | 'rejected';

export interface IUserSession {
  id: string;
  username: string;
  role: UserRole;
}

export interface IUser {
  _id: string;
  avatar?: string | null;
  firstName: string;
  lastName: string;
  username: string;
  role: UserRole;
  phone: string;
  address?: IAddress | null;
  license?: File | null;
  licenseUrl?: string | null;
  licenseStatus?: UserDocumentationsStatus;
  vehicle?: ITransporterVehicle;
  isProfileCompleted: boolean;
}

export interface IGetCurrentUserResponse {
  message: string;
  result: IUser;
}

export interface ITransporterVehicle {
  plate?: string;
  dimensions: ITransporterVehicleDimensions;
}

export interface ITransporterVehicleDimensions {
  width: number;
  length: number;
  height: number;
}

export interface IUpdateUserProfileParams {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  vehicle?: ITransporterVehicle;
  license?: File | null;
  address?: IAddress | null;
}

export interface IUpdateUserProfileResponse {
  message: string;
  result: IUser;
}
