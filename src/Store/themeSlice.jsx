import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { setTheme: false },
  reducers: {
    changeTheme(state) {
      state.setTheme = !state.setTheme;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
