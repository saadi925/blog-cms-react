import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./authApi";
import authSlice from "./auth";
const { actions: authActions, reducer: authReducer } = authSlice;
import { categoryApi } from "./categoryApi";
import dataSlice from "./slices/dataSlice";
import { postsApi } from "./postsApi";
const store = configureStore({
  reducer: {
    data: dataSlice,
    auth: authReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryApi.middleware)
      .concat(postsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export { authActions };
