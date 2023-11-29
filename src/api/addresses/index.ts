import { Axios } from '..';
import {
  MinterAPIGetAddressResponse,
  MinterAPIGetTransactionsResponse,
} from './models';

const BASE = '/api/v2/addresses';

const getAddress = (address: string) =>
  Axios.get<MinterAPIGetAddressResponse>(`${BASE}/${address}`);

const getAddressTransactions = (address: string) =>
  Axios.get<MinterAPIGetTransactionsResponse>(
    `${BASE}/${address}/transactions`,
  );

export const AddressAPI = {
  getAddress,
  getAddressTransactions,
};
