import { createSlice } from "@reduxjs/toolkit";

let initialValue = { token: null, loggedIn: false };
const token = localStorage.getItem("tokenKanban");

if (token) {
  let tokenString = "Token " + token;
  initialValue = { token: tokenString, loggedIn: true };
}

let loggedInSlice = createSlice({
  initialState: initialValue,
  name: "loggedIn",
  reducers: {
    login: (state, action) => {
      let tokenString = "Token " + action.payload;

      state.token = tokenString;
      state.loggedIn = true;
    },

    logout: (state, action) => {
      state.token = action.payload.token;
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export let { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;
