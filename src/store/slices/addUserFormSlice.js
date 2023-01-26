import { createSlice } from "@reduxjs/toolkit";

let addUserFormSlice = createSlice({
  initialState: { checked: [] },
  name: "addUserForm",
  reducers: {
    setCheckedAddUserForm: (state, action) => {
      state.checked = action.payload;
    },
  },
});

export default addUserFormSlice.reducer;
export let { setCheckedAddUserForm } = addUserFormSlice.actions;
