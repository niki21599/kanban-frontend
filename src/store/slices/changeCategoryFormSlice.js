import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";

let changeCategoryFormSlice = createSlice({
  initialState: { category: "" },
  name: "changeCategoryForm",
  reducers: {
    setCategoryChangeCategoryForm: (state, action) => {
      state.category = action.payload;
    },
  },
});

export default changeCategoryFormSlice.reducer;
export let { setCategoryChangeCategoryForm } = changeCategoryFormSlice.actions;
