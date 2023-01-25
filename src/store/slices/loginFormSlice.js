import { createSlice } from "@reduxjs/toolkit";

let loginFormSlice = createSlice({
  initialState: { username: "", password: "", wrongData: false },
  name: "loginForm",
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setWrongData(state, action) {
      state.wrongData = action.payload;
    },
  },
});

export default loginFormSlice.reducer;

export let { setUsername, setPassword, setWrongData } = loginFormSlice.actions;
