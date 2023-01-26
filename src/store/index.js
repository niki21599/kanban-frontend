import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer, {
  setPasswordLoginForm,
  setUsernameLoginForm,
  setWrongDataLoginForm,
} from "./slices/loginFormSlice";
import registerFormReducer, {
  setEmailRegisterForm,
  setFirstNameRegisterForm,
  setLastNameRegisterForm,
  setPasswordErrorRegisterForm,
  setPasswordRegisterForm,
  setPasswordRepeatRegisterForm,
  setUsernameErrorRegisterForm,
  setUsernameRegisterForm,
} from "./slices/registerFormSlice";
import addBoardFormReducer, {
  setNameAddBoardForm,
} from "./slices/addBoardFormSlice";
import addTaskFormReducer, {
  setCategoryAddTaskForm,
  setColorAddTaskForm,
  setDescriptionAddTaskForm,
  setTitleAddTaskForm,
  setUrgencyAddTaskForm,
  setUserAddTaskForm,
  resetAddTaskForm,
} from "./slices/addTaskFormSlice";
import changeCategoryFormReducer, {
  setCategoryChangeCategoryForm,
} from "./slices/changeCategoryFormSlice";

import changeUrgencyFormReducer, {
  setUrgencyChangeUrgencyForm,
} from "./slices/changeUrgencyFormSlice";

import changeUserFormReducer, {
  setUserChangeUserForm,
} from "./slices/changeUserFormSlice";

import addUserDialogReducer, {
  setOpenAddUserDialog,
} from "./slices/addUserDialogSlice";

import addUserFormReducer, {
  setCheckedAddUserForm,
} from "./slices/addUserFormSlice";

let store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
    registerForm: registerFormReducer,
    addBoardForm: addBoardFormReducer,
    addTaskForm: addTaskFormReducer,
    changeCategoryForm: changeCategoryFormReducer,
    changeUrgencyForm: changeUrgencyFormReducer,
    changeUserForm: changeUserFormReducer,
    addUserDialog: addUserDialogReducer,
    addUserForm: addUserFormReducer,
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
  setNameAddBoardForm,
  setCategoryAddTaskForm,
  setColorAddTaskForm,
  setDescriptionAddTaskForm,
  setTitleAddTaskForm,
  setUrgencyAddTaskForm,
  setUserAddTaskForm,
  resetAddTaskForm,
  setCategoryChangeCategoryForm,
  setUrgencyChangeUrgencyForm,
  setUserChangeUserForm,
  setOpenAddUserDialog,
  setCheckedAddUserForm,
};
