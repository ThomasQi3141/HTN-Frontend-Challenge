import { configureStore } from "@reduxjs/toolkit";
import { hackTheNorthApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

// Create Redux store
export const store = configureStore({
  reducer: {
    [hackTheNorthApi.reducerPath]: hackTheNorthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hackTheNorthApi.middleware),
});

// Setup RTK Query listeners
setupListeners(store.dispatch);
