import axios from 'axios';
import { CoinAPI } from './coins';
import { AddressAPI } from './addresses';

export type APIResponse<T> = {
  data: T;
};

export const Axios = axios.create({
  baseURL: 'https://explorer-api.minter.network',
});

export const API = {
  coins: CoinAPI,
  addresses: AddressAPI,
};
