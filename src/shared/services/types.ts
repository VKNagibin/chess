export enum ErrorMessageType {
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IBaseResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  messages: [
    {
      type: ErrorMessageType;
      text: string;
    },
  ];
}
