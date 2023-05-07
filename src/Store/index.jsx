import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notifySlice from "./notification-slice";
import expenseItemSlice from "./expenseItemSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notify: notifySlice.reducer,
    expenseItem: expenseItemSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
