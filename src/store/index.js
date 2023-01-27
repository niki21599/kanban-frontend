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

import addButtonDialogReducer, {
  setOpenAddButtonDialog,
} from "./slices/addButtonDialogSlice";

import addBoardDialogReducer, {
  setOpenAddBoardDialog,
} from "./slices/addBoardDialogSlice";

import addTaskDialogReducer, {
  setOpenAddTaskDialog,
} from "./slices/addTaskDialogSlice";

import changeCategoryDialogReducer, {
  setOpenChangeCategoryDialog,
} from "./slices/changeCategoryDialogSlice";

import changeUrgencyDialogReducer, {
  setOpenChangeUrgencyDialog,
} from "./slices/changeUrgencyDialogSlice";

import changeUserDialogReducer, {
  setOpenChangeUserDialog,
} from "./slices/changeUserDialogSlice";
import deleteTaskDialogReducer, {
  setOpenDeleteTaskDialog,
} from "./slices/deleteTaskDialogSlice";

import startDrawerReducer, {
  toggleOpenStartDrawer,
} from "./slices/startDrawerSlice";

import taskDetailDialogReducer, {
  setOpenTaskDetailDialog,
} from "./slices/taskDetailDialogSlice";

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
    addButtonDialog: addButtonDialogReducer,
    addBoardDialog: addBoardDialogReducer,
    addTaskDialog: addTaskDialogReducer,
    changeCategoryDialog: changeCategoryDialogReducer,
    changeUrgencyDialog: changeUrgencyDialogReducer,
    changeUserDialog: changeUserDialogReducer,
    deleteTaskDialog: deleteTaskDialogReducer,
    startDrawer: startDrawerReducer,
    taskDetailDialog: taskDetailDialogReducer,
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
  setOpenAddButtonDialog,
  setOpenAddBoardDialog,
  setOpenAddTaskDialog,
  setOpenChangeCategoryDialog,
  setOpenChangeUrgencyDialog,
  setOpenChangeUserDialog,
  setOpenDeleteTaskDialog,
  toggleOpenStartDrawer,
  setOpenTaskDetailDialog,
};
