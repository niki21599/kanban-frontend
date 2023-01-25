import { createSlice } from "@reduxjs/toolkit";

let addBoardFormSlice = createSlice({
  initialState: { name: "" },
  name: "addBoardForm",
  reducers: {
    setNameAddBoardForm: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default addBoardFormSlice.reducer;
export let { setNameAddBoardForm } = addBoardFormSlice.actions;
