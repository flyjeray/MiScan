import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { LocalStorage } from '../../storage/storage';
import { LocalStorageStoredEntry } from '../../storage/models';

interface SavedCoinsSlice {
  coins: LocalStorageStoredEntry[];
}

const initialState: SavedCoinsSlice = {
  coins: [],
};

export const getSavedCoins = createAsyncThunk('savedCoins/get', async () => {
  const savedCoins = (await LocalStorage.get('savedCoins')) || [];

  const verified = savedCoins.filter(coin => coin);

  await LocalStorage.save('savedCoins', verified);

  return verified;
});

export const savedCoinsSlice = createSlice({
  name: 'savedCoins',
  initialState,
  reducers: {
    saveCoin: (state, action: PayloadAction<LocalStorageStoredEntry>) => {
      if (!state.coins.find(coin => coin.value === action.payload.value)) {
        const newSaved: LocalStorageStoredEntry[] = [
          ...state.coins,
          action.payload,
        ];

        LocalStorage.save('savedCoins', newSaved);
        state.coins = newSaved;
      }
    },
    removeCoinFromSaved: (state, action: PayloadAction<string>) => {
      const index = state.coins.findIndex(
        coin => coin.value === action.payload,
      );
      if (index !== -1) {
        const newSaved = [...state.coins];
        newSaved.splice(index, 1);

        LocalStorage.save('savedCoins', newSaved);
        state.coins = newSaved;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getSavedCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
    });
  },
});

export const { saveCoin, removeCoinFromSaved } = savedCoinsSlice.actions;

export const selectSavedCoins = (state: RootState) => state.savedCoins.coins;
