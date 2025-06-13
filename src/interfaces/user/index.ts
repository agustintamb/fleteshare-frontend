export type UserRole = 'customer' | 'transporter';

export interface IUserSession {
  id: string;
  username: string;
  role: UserRole;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: UserRole;
  phone: string;
  license?: File | null;
}

export interface IGetCurrentUserResponse {
  message: string;
  result: IUser;
}
