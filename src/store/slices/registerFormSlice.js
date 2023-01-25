import { createSlice } from "@reduxjs/toolkit";

let registerFormSlice = createSlice({
  initialState: {
    username: "",
    email: "",
    passwordRepeat: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordError: false,
    usernameError: false,
  },
  name: "registerForm",
  reducers: {
    setUsernameRegisterForm(state, action) {
      state.username = action.payload;
    },
    setEmailRegisterForm(state, action) {
      state.email = action.payload;
    },
    setPasswordRepeatRegisterForm(state, action) {
      state.passwordRepeat = action.payload;
    },
    setPasswordRegisterForm(state, action) {
      state.password = action.payload;
    },
    setFirstNameRegisterForm(state, action) {
      state.firstName = action.payload;
    },
    setLastNameRegisterForm(state, action) {
      state.lastName = action.payload;
    },
    setPasswordErrorRegisterForm(state, action) {
      state.passwordError = action.payload;
    },
    setUsernameErrorRegisterForm(state, action) {
      state.usernameError = action.payload;
    },
  },
});

export default registerFormSlice.reducer;

export let {
  setUsernameRegisterForm,
  setPasswordRegisterForm,
  setEmailRegisterForm,
  setFirstNameRegisterForm,
  setLastNameRegisterForm,
  setPasswordErrorRegisterForm,
  setPasswordRepeatRegisterForm,
  setUsernameErrorRegisterForm,
} = registerFormSlice.actions;
