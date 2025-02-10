import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    presignedUrl: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPresignedUrl: (state, action) => {
      state.presignedUrl = action.payload;
    },
    clearPresignedUrl: (state) => {
      state.presignedUrl = null;
    },
  },
});

export const { setUser, clearUser, setLoading, setPresignedUrl, clearPresignedUrl } = authSlice.actions;
export default authSlice.reducer;
