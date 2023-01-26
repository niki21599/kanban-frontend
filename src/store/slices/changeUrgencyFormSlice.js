import { createSlice } from "@reduxjs/toolkit";

let changeUrgencyFormSlice = createSlice({
  initialState: { urgency: "" },
  name: "changeUrgencyForm",
  reducers: {
    setUrgencyChangeUrgencyForm: (state, action) => {
      state.urgency = action.payload;
    },
  },
});

export default changeUrgencyFormSlice.reducer;
export let { setUrgencyChangeUrgencyForm } = changeUrgencyFormSlice.actions;
