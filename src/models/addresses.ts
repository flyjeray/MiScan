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

export type MinterExplorerLockedBalance = {
  coin: { id: number; symbol: string };
  due_block: number;
  start_block: number;
  value: string;
};

export type AddressDataWithLockedBalance = MinterExplorerAddress & {
  locked: MinterExplorerLockedBalance[];
};
