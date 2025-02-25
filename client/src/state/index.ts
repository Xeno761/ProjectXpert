import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./api";
import { AuthUser } from "aws-amplify/auth";

type currentUser = {
  user: AuthUser;
  userSub: string | undefined;
  userDetails: User;
} | null;

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  currentUser: currentUser;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  currentUser: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<currentUser>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setCurrentUser } =
  globalSlice.actions;
export default globalSlice.reducer;
