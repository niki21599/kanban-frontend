import { createSlice } from "@reduxjs/toolkit";

let dummyTask = {
  fields: {
    user: 1,
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
  },
});

export default selectedTaskSlice.reducer;

export let { setSelectedTask } = selectedTaskSlice.actions;
