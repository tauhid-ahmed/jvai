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

export interface SupportRequest {
  email: string;
  query: string;
}

export interface ChatListItem {
  id: number;
  title: string;
  last_message_preview: string;
  updated_at: string;
}

export interface ChatMessage {
  id: number;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: number;
  title: string;
  history: ChatMessage[];
}
