export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  success: boolean
  token?: string;
  data: {}
}

export interface LoginRequest {
  email: string;
  password: string;
}