import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notifySlice from "./notification-slice";
import expenseItemSlice from "./expenseItemSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notify: notifySlice.reducer,
    expenseItem: expenseItemSlice.reducer,
  },
});

export default store;
