import { Axios } from '..';
import { MinterExplorerLockedBalance } from '../../models/addresses';
import {
  MinterAPIGetAddressResponse,
  MinterAPIGetTransactionsResponse,
} from './models';

const BASE = '/api/v2/addresses';

const getAddress = (address: string) =>
  Axios.get<MinterAPIGetAddressResponse>(`${BASE}/${address}`);

const getAddressTransactions = (address: string, page: number) =>
  Axios.get<MinterAPIGetTransactionsResponse>(
    `${BASE}/${address}/transactions`,
    { params: { page } },
  );

const getLockedBalances = (address: string) =>
  Axios.get<MinterExplorerLockedBalance[]>(`${BASE}/${address}/locks`);

export const AddressAPI = {
  getAddress,
  getAddressTransactions,
  getLockedBalances,
};
