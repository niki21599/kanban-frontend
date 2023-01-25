import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "./slices/loginFormSlice";
import {
  setPassword,
  setUsername,
  setWrongData,
} from "./slices/loginFormSlice";

let store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
  },
});

export { store, setUsername, setPassword, setWrongData };
