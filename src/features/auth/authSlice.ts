import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { AuthResponse, UserProfile } from "../../types";

type AuthState = AuthResponse;

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
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.authData = action.payload.authData;
      state.user = action.payload.user;
      localStorage.setItem("authData", JSON.stringify(action.payload));
    },

    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },

    logOut: (state) => {
      state.authData = null;
      state.user = null;
      localStorage.removeItem("authData");
    },
  },
});

export const { setCredentials, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) =>
  state.auth?.authData?.idToken || null;
