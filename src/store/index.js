import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "./slices/loginFormSlice";
import registerFormReducer from "./slices/registerFormSlice";
import {
  setPasswordLoginForm,
  setUsernameLoginForm,
  setWrongDataLoginForm,
} from "./slices/loginFormSlice";

import {
  setEmailRegisterForm,
  setFirstNameRegisterForm,
  setLastNameRegisterForm,
  setPasswordErrorRegisterForm,
  setPasswordRegisterForm,
  setPasswordRepeatRegisterForm,
  setUsernameErrorRegisterForm,
  setUsernameRegisterForm,
} from "./slices/registerFormSlice";

let store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
  },
});

export {
  store,
  setUsernameLoginForm,
  setPasswordLoginForm,
  setWrongDataLoginForm,
  setEmailRegisterForm,
  setFirstNameRegisterForm,
  setLastNameRegisterForm,
  setPasswordErrorRegisterForm,
  setPasswordRegisterForm,
  setPasswordRepeatRegisterForm,
  setUsernameErrorRegisterForm,
  setUsernameRegisterForm,
};
