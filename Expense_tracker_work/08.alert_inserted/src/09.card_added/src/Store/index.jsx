import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notifySlice from "./notification-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, notify: notifySlice.reducer },
});

export default store;
