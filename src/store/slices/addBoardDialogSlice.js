import { createSlice } from "@reduxjs/toolkit";

let addBoardDialogSlice = createSlice({
  initialState: { open: false },
  name: "addBoardDialog",
  reducers: {
    setOpenAddBoardDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default addBoardDialogSlice.reducer;
export let { setOpenAddBoardDialog } = addBoardDialogSlice.actions;
