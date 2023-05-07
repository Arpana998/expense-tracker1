import { createSlice } from "@reduxjs/toolkit";

const authToken = localStorage.getItem("idToken");
let authStatus;
if (authToken) {
  authStatus = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: authStatus,
    token: authToken,
    isPremium: false,
    isDownloadEnable: false,
  },
  reducers: {
    login(state, action) {
      console.log("authSlice", action.payload, state);
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("idToken", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
    },
    activatePremium(state) {
      state.isPremium = true;
    },
    onReloadActivatePremium(state, action) {
      state.isPremium = action.payload.isPremium;
    },
    downloadManager(state) {
      state.isDownloadEnable = true;
    },
    onDownloadEnabled(state, action) {
      state.isDownloadEnable = action.payload.isDownloaded;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
