import { createSlice } from "@reduxjs/toolkit";

let changeUserFormSlice = createSlice({
  initialState: { user: {} },
  name: "changeUserForm",
  reducers: {
    setUserChangeUserForm: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default changeUserFormSlice.reducer;
export let { setUserChangeUserForm } = changeUserFormSlice.actions;
