import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";
import type {
  AuthResponse,
  LoginRequest,
  ResendOtpRequest,
  ResendOtpResponse,
  UserProfile,
  VerifyOtpRequest,
} from "../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://alibackend.duckdns.org/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const userData = (getState() as RootState).auth.userData;
      const token = userData ? userData.idToken : undefined;

      const publicEndpoints = ["login", "signup", "verify_otp", "resend_otp"]; //api endpoints

      console.log({ publicEndpoints, endpoint });
      if (publicEndpoints.includes(endpoint)) {
        return headers;
      }

      headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // "signin" endpoint
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "authentication_app/signin/",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["User"],
    }),

    // "signup" endpoint
    signup: builder.mutation<AuthResponse, LoginRequest>({
      query: (userInfo) => ({
        url: "authentication_app/signup/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    // "user_profile" GET endpoint
    getUserProfile: builder.query<UserProfile, void>({
      query: () => "authentication_app/user_profile/",
      providesTags: ["User"],
    }),

    // "logout" endpoint
    logout: builder.mutation<Record<string, never>, void>({
      query: () => ({
        url: "authentication_app/logout/",
        method: "POST",
      }),
    }),
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: (emailData) => ({
        url: "authentication_app/resend_otp/",
        method: "POST",
        body: emailData,
      }),
      invalidatesTags: ["User"],
    }),
    verifyOtp: builder.mutation<ResendOtpResponse, VerifyOtpRequest>({
      query: (data) => ({
        url: "authentication_app/verify_otp/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserProfileQuery,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
} = api;
