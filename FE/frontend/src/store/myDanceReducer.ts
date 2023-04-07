import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const myDanceRuducer = createSlice({
  name: "myDance",
  initialState: {
    myDanceId: "",
  },
  reducers: {
    updateMyDanceId: (state, action: PayloadAction<string>) => {
      state.myDanceId = action.payload;
    },
  },
});

export const { updateMyDanceId } = myDanceRuducer.actions;
export default myDanceRuducer;
