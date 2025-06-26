export interface UserProfile {
  accessToken: string;
  email: string;
  idToken: string;
  localId: string;
  message: string;
  refresh_token: string;
  is_verified?: boolean;
}

export type AuthResponse = {
  authData: UserProfile | null;
  user: UserProfile | null;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpResponse {
  detail: string;
}
