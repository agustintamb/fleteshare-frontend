import { UserRole } from '@/interfaces/user';

// LOGIN
export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  result: {
    id: string;
    username: string;
    role: UserRole;
    token: string;
  };
}

// REGISTER
export interface IRegisterParams {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone: string;
  license?: File | null;
}

export interface IRegisterResponse {
  message: string;
  result: {
    id: string;
    username: string;
    role: UserRole;
    token: string;
  };
}

// RECOVER PASSWORD
export interface IRecoverPasswordParams {
  username: string;
}

export interface IRecoverPasswordResponse {
  message: string;
}
