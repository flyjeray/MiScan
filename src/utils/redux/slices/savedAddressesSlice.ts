import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { LocalStorageStoredEntry } from '../../storage/models';
import { LocalStorage } from '../../storage/storage';

interface SavedAddressesSlice {
  addresses: LocalStorageStoredEntry[];
}

const initialState: SavedAddressesSlice = {
  addresses: [],
};

export const getSavedAddresses = createAsyncThunk(
  'savedAddresses/get',
  async () => {
    const savedAddresses = (await LocalStorage.get('savedAddresses')) || [];

    const verified = savedAddresses.filter(address => {
      return address.label && address.value;
    });

    await LocalStorage.save('savedAddresses', verified);

    return verified;
  },
);

export const savedAddressesSlice = createSlice({
  name: 'savedAddresses',
  initialState,
  reducers: {
    saveAddress: (state, action: PayloadAction<string>) => {
      if (!state.addresses.find(svd => svd.value === action.payload)) {
        const newSaved: LocalStorageStoredEntry[] = [
          ...state.addresses,
          { label: action.payload, value: action.payload },
        ];

        LocalStorage.save('savedAddresses', newSaved);
        state.addresses = newSaved;
      }
    },
    removeAddressFromSaved: (state, action: PayloadAction<string>) => {
      const index = state.addresses.findIndex(
        svd => svd.value === action.payload,
      );
      if (index !== -1) {
        const newSaved = [...state.addresses];
        newSaved.splice(index, 1);

        LocalStorage.save('savedAddresses', newSaved);
        state.addresses = newSaved;
      }
    },
    editSavedAddress: (
      state,
      action: PayloadAction<LocalStorageStoredEntry>,
    ) => {
      const index = state.addresses.findIndex(
        svd => svd.value === action.payload.value,
      );
      let titleToSaveWith = action.payload.label || 'Unnamed Address';

      if (index !== -1) {
        const copy = [...state.addresses];
        const edited: LocalStorageStoredEntry = {
          label: titleToSaveWith,
          value: action.payload.value,
        };

        copy[index] = edited;

        LocalStorage.save('savedAddresses', copy);
        state.addresses = copy;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getSavedAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
  },
});

export const { saveAddress, removeAddressFromSaved, editSavedAddress } =
  savedAddressesSlice.actions;

export const selectSavedAddresses = (state: RootState) =>
  state.savedAddresses.addresses;
