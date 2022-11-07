import { DataApi } from './dataApi';

interface IDataListApi<T> {
  data: T;
  count: number;
}
// export type DataList<T> = DataApi<IDataListApi<T>>;
export class DataList<T> {
  success: boolean;
  message?: string;
  data: { data: T; count: number };
  constructor(data: T, count: number, success = true, message?: string) {
    if (success) {
      this.data = { data: null, count: 1 };
      this.data.data = data;
      this.data.count = count;
      this.success = success;
    } else {
      this.data = null;
      this.message = message;
      this.success = success;
    }
  }
}
