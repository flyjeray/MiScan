export type MinterExplorerAddress = {
  address: string;
  balances: {
    coin: {
      id: number;
      symbol: string;
      type: string;
    };
    amount: string;
  }[];
};
