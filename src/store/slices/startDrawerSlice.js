import { createSlice } from "@reduxjs/toolkit";

let startDrawerSlice = createSlice({
  initialState: { openDrawer: false },
  name: "startDrawer",
  reducers: {
    toggleOpenStartDrawer: (state) => {
      state.openDrawer = !state.openDrawer;
    },
  },
});

export default startDrawerSlice.reducer;

export let { toggleOpenStartDrawer } = startDrawerSlice.actions;
