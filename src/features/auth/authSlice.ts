import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { UserProfile } from "../../types";

interface AuthState {
  userData: UserProfile | null;
}

const initialState: AuthState = {
  userData: (() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ userData: UserProfile }>
    ) => {
      const { userData } = action.payload;
      state.userData = userData;
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    logOut: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.userData;
export const selectCurrentToken = (state: RootState) =>
  state.auth.userData?.accessToken;
