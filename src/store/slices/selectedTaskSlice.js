import { createSlice } from "@reduxjs/toolkit";

let dummyTask = {
  fields: {
    user: null,
    title: "hfjds",
    category: "hjfkd",
    urgency: "jkds",
    color: "jfsk",
  },
};

let selectedTaskSlice = createSlice({
  initialState: { task: dummyTask },
  name: "selectedTask",
  reducers: {
    setSelectedTask: (state, action) => {
      state.task = action.payload;
    },
    setTaskCategory: (state, action) => {
      state.task.fields.category = action.payload;
    },
    setTaskUrgency: (state, action) => {
      state.task.fields.urgency = action.payload;
    },
    setTaskUser: (state, action) => {
      state.task.fields.user = action.payload;
    },
  },
});

export default selectedTaskSlice.reducer;

export let { setSelectedTask, setTaskCategory, setTaskUrgency, setTaskUser } =
  selectedTaskSlice.actions;
