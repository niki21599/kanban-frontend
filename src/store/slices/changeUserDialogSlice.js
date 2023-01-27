import { createSlice } from "@reduxjs/toolkit";

let changeUserDialogSlice = createSlice({
  initialState: { open: false },
  name: "changeUserDialog",
  reducers: {
    setOpenChangeUserDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default changeUserDialogSlice.reducer;
export let { setOpenChangeUserDialog } = changeUserDialogSlice.actions;
