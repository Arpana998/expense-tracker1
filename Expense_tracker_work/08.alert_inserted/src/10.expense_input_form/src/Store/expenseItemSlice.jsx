import { createSlice } from "@reduxjs/toolkit";

const initialState = { formIsShown: false };

const expenseItemSlice = createSlice({
  name: "expenseInput",
  initialState: initialState,
  reducers: {
    displayForm(state) {
      state.formIsShown = true;
    },
    hideForm(state) {
      state.formIsShown = false;
    },
  },
});

export const expenseItemSliceActions = expenseItemSlice.actions;
export default expenseItemSlice;
