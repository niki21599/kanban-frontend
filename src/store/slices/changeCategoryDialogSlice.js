import { createSlice } from "@reduxjs/toolkit";

let changeCategoryDialogSlice = createSlice({
  initialState: { open: false },
  name: "changeCategoryDialog",
  reducers: {
    setOpenChangeCategoryDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default changeCategoryDialogSlice.reducer;

export let { setOpenChangeCategoryDialog } = changeCategoryDialogSlice.actions;
