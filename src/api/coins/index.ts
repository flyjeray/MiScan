import { Axios, APIResponse } from '..';
import { MinterExplorerCoin } from '../../models/coins';

const getAllCoins = () =>
  Axios.get<APIResponse<MinterExplorerCoin[]>>(`/api/v2/coins`);

const getCoinBySymbol = (symbol: string) =>
  Axios.get<APIResponse<MinterExplorerCoin>>(`/api/v2/coins/symbol/${symbol}`);

export const CoinAPI = {
  getAllCoins,
  getCoinBySymbol,
};
