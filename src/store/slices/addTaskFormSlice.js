import { createSlice } from "@reduxjs/toolkit";

let addTaskFormSlice = createSlice({
  initialState: {
    user: "",
    title: "",
    urgency: "",
    color: "white",
    category: "",
    description: "",
  },
  name: "addTaskForm",
  reducers: {
    setUserAddTaskForm: (state, action) => {
      state.user = action.payload;
    },
    setTitleAddTaskForm: (state, action) => {
      state.title = action.payload;
    },
    setUrgencyAddTaskForm: (state, action) => {
      state.urgency = action.payload;
    },
    setColorAddTaskForm: (state, action) => {
      state.color = action.payload;
    },
    setCategoryAddTaskForm: (state, action) => {
      state.category = action.payload;
    },
    setDescriptionAddTaskForm: (state, action) => {
      state.description = action.payload;
    },
    resetAddTaskForm: (state) => {
      return (state = {
        user: "",
        title: "",
        urgency: "",
        color: "white",
        category: "",
        description: "",
      });
    },
  },
});

export default addTaskFormSlice.reducer;

export let {
  setCategoryAddTaskForm,
  setTitleAddTaskForm,
  setUserAddTaskForm,
  setUrgencyAddTaskForm,
  setColorAddTaskForm,
  setDescriptionAddTaskForm,
  resetAddTaskForm,
} = addTaskFormSlice.actions;
