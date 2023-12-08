import { configureStore } from '@reduxjs/toolkit';
import { chainSlice } from './slices/chainSlice';

export const store = configureStore({
  reducer: {
    chain: chainSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
