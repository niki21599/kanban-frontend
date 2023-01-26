import { createSlice } from "@reduxjs/toolkit";

let addUserDialogSlice = createSlice({
  initialState: { open: false },
  name: "dialogSlice",
  reducers: {
    setOpenAddUserDialog: (state, action) => {
      state.open = action.payload;
    },
  },
});

export default addUserDialogSlice.reducer;
export let { setOpenAddUserDialog } = addUserDialogSlice.actions;
