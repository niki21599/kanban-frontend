import { createSlice } from "@reduxjs/toolkit";

let draggedTaskSlice = createSlice({
  initialState: { currentDraggedElement: 0 },
  name: "draggedTask",
  reducers: {
    setCurrentDraggedElement: (state, action) => {
      state.currentDraggedElement = action.payload;
    },
  },
});

export default draggedTaskSlice.reducer;
export let { setCurrentDraggedElement } = draggedTaskSlice.actions;
