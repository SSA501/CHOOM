import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const mainReducer = createSlice({
  name: "main",
  initialState: {
    isLogin: false,
    accessToken: "",
  },
  reducers: {
    updateLoginStatus: (state) => {
      state.isLogin = true;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { updateLoginStatus, updateAccessToken } = mainReducer.actions;
export default mainReducer;
