import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formIsShown: false,
  expenseList: {},
};

// itemDescription,
//     itemAmount,
//     itemCategory,
//     itemId
let newItem;
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
    addExpenseItem(state, action) {
      const obj = {
        [action.payload.id]: {
          itemDescription: action.payload.description,
          itemAmount: action.payload.amount,
          itemCategory: action.payload.category,
          itemId: action.payload.id,
        },
      };
      state.expenseList = {
        ...state.expenseList,
        ...obj,
      };
      console.log(state.expenseList);
      console.log("reducer executed");
    },
  },
});

export const expenseItemSliceActions = expenseItemSlice.actions;
export default expenseItemSlice;
