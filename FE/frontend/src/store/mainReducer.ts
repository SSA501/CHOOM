import { createSlice } from "@reduxjs/toolkit";

const mainReducer = createSlice({
  name: "main",
  initialState: {
    isLogin: false,
    accessToken: "",
  },
  reducers: {},
});

export default mainReducer;
