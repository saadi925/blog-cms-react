import { createSlice } from "@reduxjs/toolkit";
// 1. Define the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem('token')
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export default authSlice;
export const actions = authSlice.actions;
