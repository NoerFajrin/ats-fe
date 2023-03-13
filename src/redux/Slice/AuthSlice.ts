import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ROLE } from "../../res/role/role.enum";

export interface AuthState {
  accessToken: string | null;
  user: {
    id: number;
    fullname: string;
    username: string;
    email: string;
    role: ROLE;
  } | null;
  isLoggedIn: boolean;
}
const initialState: AuthState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    resetAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice;
