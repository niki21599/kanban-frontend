import { createSlice } from "@reduxjs/toolkit";

let deleteTaskDialogSlice = createSlice({
  initialState: { open: false },
  name: "deletetaskDialog",
  reducers: {
    setOpenDeleteTaskDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default deleteTaskDialogSlice.reducer;

export let { setOpenDeleteTaskDialog } = deleteTaskDialogSlice.actions;
