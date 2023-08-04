export interface ResponseData<T> {
  status: number | string;
  message: string;
  data?: any;
}
