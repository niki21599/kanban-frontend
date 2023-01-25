import { createSlice } from "@reduxjs/toolkit";

let loginFormSlice = createSlice({
  initialState: { username: "", password: "", wrongData: false },
  name: "loginForm",
  reducers: {
    setUsernameLoginForm(state, action) {
      state.username = action.payload;
    },
    setPasswordLoginForm(state, action) {
      state.password = action.payload;
    },
    setWrongDataLoginForm(state, action) {
      state.wrongData = action.payload;
    },
  },
});

export default loginFormSlice.reducer;

export let {
  setUsernameLoginForm,
  setPasswordLoginForm,
  setWrongDataLoginForm,
} = loginFormSlice.actions;
