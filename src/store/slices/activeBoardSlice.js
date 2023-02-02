import { createSlice } from "@reduxjs/toolkit";

let activeBoardSlice = createSlice({
  initialState: { board: { model: "", pk: null, fields: { name: "hds" } } },
  name: "activeBoard",
  reducers: {
    setActiveBoard: (state, action) => {
      state.board = action.payload;
    },
  },
});

export default activeBoardSlice.reducer;

export let { setActiveBoard } = activeBoardSlice.actions;
