export type ServiceResponseErrorType = 'UNAUTHORIZED' | 'NOT_FOUND' | 'INVALID_DATA';
export type ServiceResponseSucessType = 'OK';
export type StatusCode = 200 | 400 | 404 | 401 | 403 | 500;

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  message: string,
  statusCode: StatusCode,
};

export type ServiceResponseSucess = {
  status: ServiceResponseSucessType,
  message: unknown,
  statusCode: StatusCode,
};