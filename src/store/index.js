import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "./slices/loginFormSlice";
import { changePassword, changeUsername } from "./slices/loginFormSlice";

let store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
  },
});

export { store, changeUsername, changePassword };
