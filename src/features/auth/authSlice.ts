import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { AuthResponse, UserProfile } from "../../types";

type AuthState = AuthResponse;

const getInitialAuthData = (): AuthState | null => {
  const stored = localStorage.getItem("authData");
  try {
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to parse authData from localStorage", error);
    return null;
  }
};

const initialState: AuthState = getInitialAuthData();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state = action.payload;
      localStorage.setItem("authData", JSON.stringify(action.payload));
    },

    logOut: (state) => {
      state = null;
      localStorage.removeItem("authData");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
export const selectCurrentToken = (state: RootState) =>
  state.auth?.idToken || null;
