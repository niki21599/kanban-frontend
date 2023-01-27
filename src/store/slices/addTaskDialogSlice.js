import { createSlice } from "@reduxjs/toolkit";

let addTaskDialogSlice = createSlice({
  initialState: { open: false },
  name: "addTaskDialog",
  reducers: {
    setOpenAddTaskDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default addTaskDialogSlice.reducer;
export let { setOpenAddTaskDialog } = addTaskDialogSlice.actions;
