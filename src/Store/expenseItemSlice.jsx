import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  formIsShown: false,
  expenseList: {},
  totalSpending: 0,
  editItemId: "", //blank obj return true
};

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
          description: action.payload.description,
          amount: action.payload.amount,
          category: action.payload.category,
          date: action.payload.date,
          id: action.payload.id,
        },
      };
      state.expenseList = {
        ...state.expenseList,
        ...obj,
      };
    },
    deleteExpenseItem(state, action) {
      delete state.expenseList[action.payload];
    },
    idToBeEdited(state, action) {
      state.editItemId = action.payload;
    },
    editItemData(state, action) {
      state.expenseList[action.payload.id] = action.payload;
    },
    setEditItemId(state) {
      state.editItemId = false;
    },
    totalSpending(state, action) {
      state.totalSpending = action.payload;
    },
    getDataOnReload(state, action) {
      state.expenseList = action.payload.expense;
    },
  },
});

export const expenseItemSliceActions = expenseItemSlice.actions;
export default expenseItemSlice;

//while adding put req add premium status of user
//while getting data make sure to get whole expenseList, premiumStatus, login status
