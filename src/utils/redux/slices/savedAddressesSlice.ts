import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { LocalStorageSavedAddress } from '../../storage/models';
import { LocalStorage } from '../../storage/storage';

interface SavedAddressesSlice {
  addresses: LocalStorageSavedAddress[];
}

const initialState: SavedAddressesSlice = {
  addresses: [],
};

export const getSavedAddresses = createAsyncThunk(
  'savedAddresses/get',
  async () => {
    const savedAddresses = (await LocalStorage.get('savedAddresses')) || [];

    const verified = savedAddresses.filter(address => {
      return address.name && address.address;
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
      if (!state.addresses.find(svd => svd.address === action.payload)) {
        const newSaved: LocalStorageSavedAddress[] = [
          ...state.addresses,
          { name: action.payload, address: action.payload },
        ];

        LocalStorage.save('savedAddresses', newSaved);
        state.addresses = newSaved;
      }
    },
    removeAddressFromSaved: (state, action: PayloadAction<string>) => {
      const index = state.addresses.findIndex(
        svd => svd.address === action.payload,
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
      action: PayloadAction<LocalStorageSavedAddress>,
    ) => {
      const index = state.addresses.findIndex(
        svd => svd.address === action.payload.address,
      );
      let titleToSaveWith = action.payload.name || 'Unnamed Address';

      if (index !== -1) {
        const copy = [...state.addresses];
        const edited = {
          name: titleToSaveWith,
          address: action.payload.address,
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
