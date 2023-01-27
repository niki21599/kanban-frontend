import { createSlice } from "@reduxjs/toolkit";

let taskDetailDialogSlice = createSlice({
  initialState: { open: false },
  name: "taskDetailDialog",
  reducers: {
    setOpenTaskDetailDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default taskDetailDialogSlice.reducer;
export let { setOpenTaskDetailDialog } = taskDetailDialogSlice.actions;
