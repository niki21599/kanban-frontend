import { createSlice } from "@reduxjs/toolkit";

let activeBoardSlice = createSlice({
  initialState: { board: { model: "", pk: -1, fields: { name: "hds" } } },
  name: "activeBoard",
  reducers: {
    setActiveBoard: (state, action) => {
      state.board = action.payload;
    },
  },
});

export default activeBoardSlice.reducer;

export let { setActiveBoard } = activeBoardSlice.actions;
