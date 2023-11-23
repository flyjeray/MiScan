import { Axios, APIResponse } from '..';
import { MinterExplorerCoin } from '../../models/coins';

const getAllCoins = () =>
  Axios.get<APIResponse<MinterExplorerCoin[]>>(`/api/v2/coins`);

export const CoinAPI = {
  getAllCoins,
};
