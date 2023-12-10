export type MinterExplorerTransaction = {
  txn: number;
  hash: string;
  nonce: number;
  height: number;
  timestamp: Date;
  gas: string;
  gas_coin: Coin;
  gas_price: number;
  fee: string;
  type: number;
  payload: string;
  from: string;
  data: Data | { list: SendData[] } | MultisigEditData | LockData;
  raw_tx: string;
  commission_in_base_coin: string;
  commission_in_gas_coin: string;
  commission_price: string;
  commission_price_coin: Coin;
};

type Coin = {
  id: number;
  symbol: string;
};

type CoinWithAmount = Coin & { amount: string };

type SendData = {
  coin: Coin;
  to: string;
  value: string;
};

type MultisigEditData = {
  addresses: string[];
  weights: number[];
  threshold: number;
};

type LockData = {
  coin: Coin;
  due_block: number;
  value: string;
};

type ExchangeData = {
  coins: CoinWithAmount[];
  coin_to_buy: Coin;
  coin_to_sell: Coin;
  value_to_buy: string;
  value_to_sell: string;
  maximum_value_to_sell: string;
  limit_orders: any;
};

type Data = SendData | ExchangeData;
