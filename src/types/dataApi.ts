interface IDataApi<T> {
  success: boolean;
  message?: string;
  data: T;
}

export class DataApi<T> implements IDataApi<T> {
  success: boolean;
  message?: string;
  data: T;
  constructor(data: T, success = true, message?: string) {
    if (success) {
      this.data = data;
      this.success = success;
    } else {
      this.data = null;
      this.message = message;
      this.success = success;
    }
  }
}
