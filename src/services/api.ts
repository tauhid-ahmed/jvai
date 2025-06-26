import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";
import type {
  ChatListItem,
  ChatMessage,
  ChatThread,
  LoginRequest,
  ResendOtpRequest,
  ResendOtpResponse,
  SupportRequest,
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

      const token = (getState() as RootState).auth?.authData?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "ChatList", "ChatThread"],

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
      invalidatesTags: ["User"],
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
    sendSupportRequest: builder.mutation<void, SupportRequest>({
      query: (body) => ({
        url: "terms_and_support/support/",
        method: "POST",
        body,
      }),
    }),

    // new chat
    createChat: builder.mutation<ChatThread, { message: string }>({
      query: ({ message }) => ({
        url: "chat/create_chat/",
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: message,
      }),
      invalidatesTags: [{ type: "ChatList", id: "LIST" }],
    }),

    // add chat message
    addMessageToChat: builder.mutation<
      ChatMessage,
      { chatId: number; message: string }
    >({
      query: ({ chatId, message }) => ({
        url: "chat/add_message_to_chat/",
        method: "POST",
        body: message,
        headers: { "Content-Type": "text/plain" },
        params: { chat_id: chatId },
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: "ChatThread", id: chatId },
      ],
    }),

    // get chat list
    getChatList: builder.query<ChatListItem[], void>({
      query: () => "chat/get_users_chat_list/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ChatList" as const, id })),
              { type: "ChatList", id: "LIST" },
            ]
          : [{ type: "ChatList", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserProfileQuery,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useSendSupportRequestMutation,
  useCreateChatMutation,
  useAddMessageToChatMutation,
  useLogoutMutation,
} = api;
