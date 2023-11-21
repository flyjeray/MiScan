import { Axios, APIResponse } from '..';
import { MinterExplorerCoin } from './models';

const getAllCoins = () =>
  Axios.get<any, APIResponse<MinterExplorerCoin[]>>(`/api/v2/coins`);

export const CoinAPI = {
  getAllCoins,
};
