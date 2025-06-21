/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiResponse {
  message: string;
  result?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}
