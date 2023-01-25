import { createSlice } from "@reduxjs/toolkit";

let loginFormSlice = createSlice({
  initialState: { username: "", password: "" },
  name: "loginForm",
  reducers: {
    changeUsername(state, action) {
      state.username = action.payload;
    },
    changePassword(state, action) {
      state.password = action.payload;
    },
  },
});

export default loginFormSlice.reducer;

export let { changeUsername, changePassword } = loginFormSlice.actions;
