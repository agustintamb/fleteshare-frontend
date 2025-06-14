export type UserRole = 'customer' | 'transporter';

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
  license?: File | null;
  isProfileCompleted: boolean;
  isValidated: boolean;
}

export interface IGetCurrentUserResponse {
  message: string;
  result: IUser;
}
