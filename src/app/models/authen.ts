export interface Response_Data<T> {
    data: T;
    message: string
    status_code: number
}
export interface AuthenRequest {
  access_token: string,
  refresh_token: string
}
