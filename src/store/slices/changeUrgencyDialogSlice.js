import { createSlice } from "@reduxjs/toolkit";

let changeUrgencyDialogSlice = createSlice({
  initialState: { open: false },
  name: "changeUrgencyDialog",
  reducers: {
    setOpenChangeUrgencyDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default changeUrgencyDialogSlice.reducer;

export let { setOpenChangeUrgencyDialog } = changeUrgencyDialogSlice.actions;
