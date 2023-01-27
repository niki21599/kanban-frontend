import { createSlice } from "@reduxjs/toolkit";

let addButtonDialogSlice = createSlice({
  initialState: { open: false },
  name: "addButtonDialog",
  reducers: {
    setOpenAddButtonDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default addButtonDialogSlice.reducer;
export let { setOpenAddButtonDialog } = addButtonDialogSlice.actions;
