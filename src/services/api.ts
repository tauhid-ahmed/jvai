import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";
import type {
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
      const publicEndpoints = ["login", "signup"];

      if (publicEndpoints.includes(endpoint || "")) {
        console.log(
          `[prepareHeaders] Public endpoint: "${endpoint}". Skipping token.`
        );
        return headers;
      }

      const token = (getState() as RootState).auth?.authData?.idToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    // "signin" endpoint
    login: builder.mutation<UserProfile, LoginRequest>({
      query: (credentials) => ({
        url: "authentication_app/signin/",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["User"],
    }),

    // "signup" endpoint
    signup: builder.mutation<UserProfile, LoginRequest>({
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
