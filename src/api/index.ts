import axios from 'axios';
import { CoinAPI } from './coins';

export type APIResponse<T> = {
  data: {
    data: T;
  };
};

export const Axios = axios.create({
  baseURL: 'https://explorer-api.minter.network',
});

export const API = {
  coins: CoinAPI,
};
