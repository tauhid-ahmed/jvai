import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { UserProfile } from "../../types";

type AuthState = {
  authData: UserProfile | null;
  user: UserProfile | null;
};

const getInitialAuthData = (): UserProfile | null => {
  const stored = localStorage.getItem("authData");
  try {
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to parse authData from localStorage", error);
    return null;
  }
};

const initialState: AuthState = {
  authData: getInitialAuthData(),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserProfile>) => {
      state.authData = action.payload;
      state.user = action.payload;
      localStorage.setItem("authData", JSON.stringify(action.payload));
    },

    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.authData = null;
      state.user = null;
      localStorage.removeItem("authData");
    },
  },
});

export const { setCredentials, setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.authData;
export const selectVerifiedUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) =>
  state.auth?.authData?.accessToken || null;
