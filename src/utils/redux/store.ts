import { configureStore } from '@reduxjs/toolkit';
import { chainSlice } from './slices/chainSlice';
import { savedAddressesSlice } from './slices/savedAddressesSlice';
import { savedCoinsSlice } from './slices/savedCoinsSlice';

export const store = configureStore({
  reducer: {
    chain: chainSlice.reducer,
    savedAddresses: savedAddressesSlice.reducer,
    savedCoins: savedCoinsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
