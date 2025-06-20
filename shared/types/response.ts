export interface IResponse<T> {
  success: boolean;
  data: T | null;
  timestamp: string;
  error?: string;
  message?: string;
}
