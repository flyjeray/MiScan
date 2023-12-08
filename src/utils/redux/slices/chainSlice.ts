import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ChainState {
  addressChain: string[];
}

const initialState: ChainState = {
  addressChain: [],
};

export const chainSlice = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    addAddressChainLink: (state, action: PayloadAction<string>) => {
      state.addressChain = [...state.addressChain, action.payload];
    },
    popAddressChainLink: state => {
      state.addressChain = state.addressChain.slice(0, -1);
    },
    overrideChainLink: (state, action: PayloadAction<string[]>) => {
      state.addressChain = action.payload;
    },
  },
});

export const { addAddressChainLink, popAddressChainLink, overrideChainLink } =
  chainSlice.actions;

export const selectChain = (state: RootState) => state.chain.addressChain;
