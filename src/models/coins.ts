export type MinterExplorerCoin = {
  id: number;
  crr: number;
  volume: string;
  reserve_balance: string;
  max_supply: string;
  name: string;
  symbol: string;
  owner_address: string;
  burnable: boolean;
  mintable: boolean;
  type: string;
  price_usd: string;
};
