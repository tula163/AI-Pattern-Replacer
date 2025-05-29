// types/api.ts
export interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
  }
  