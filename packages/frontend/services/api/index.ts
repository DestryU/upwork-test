import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors consistently
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        error.response.data?.message || 'Something went wrong'
      );
    }
    throw new ApiError(500, error.message);
  }
);

export async function apiClient<T>(
  endpoint: string,
  options: { method: string; data?: any; params?: any } = { method: 'GET' }
): Promise<T> {
  const response = await axiosInstance({
    url: endpoint,
    method: options.method,
    data: options.data,
    params: options.params,
  });
  
  return response.data;
} 