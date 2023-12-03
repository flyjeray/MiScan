import axios from 'axios';
import { CoinAPI } from './coins';
import { AddressAPI } from './addresses';
import Toast from 'react-native-toast-message';

export type APIResponse<T> = {
  data: T;
};

export const Axios = axios.create({
  baseURL: 'https://explorer-api.minter.network',
});

Axios.interceptors.response.use(
  response => response,
  error => {
    const msg = error?.response?.data?.error?.message;

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: msg || 'Some unknown error occured, please try again later',
    });
  },
);

export const API = {
  coins: CoinAPI,
  addresses: AddressAPI,
};
