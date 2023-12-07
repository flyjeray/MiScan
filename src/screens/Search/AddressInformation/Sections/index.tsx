import { useEffect, useState } from 'react';
import * as _ from '..';
import { MinterExplorerAddress } from '../../../../models/addresses';
import { AddressBalanceSection } from './Balances';
import { MinterExplorerTransaction } from '../../../../models/transactions';
import { API } from '../../../../api';
import { AddressTransactionsSection } from './Transactions';

type Props = {
  address: MinterExplorerAddress;
  type: _.AddressSection;
};

export const AddressSection = ({ address, type }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [transactions, setTransactions] = useState<MinterExplorerTransaction[]>(
    [],
  );

  const [page, setPage] = useState(1);

  const fetchTransactions = async (page: number, newAddress: boolean) => {
    setIsLoading(true);

    API.addresses
      .getAddressTransactions(address.address, page)
      .then(res => {
        if (newAddress) {
          setTransactions(res.data.data);
          return;
        }

        const copy = [...transactions];
        const combined = copy.concat(res.data.data);
        setTransactions(combined);
      })
      .catch(() => {
        setTransactions([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions(1, true);
    setPage(1);
  }, [address.address]);

  switch (type) {
    case 'balances':
      return <AddressBalanceSection address={address} />;
    case 'transactions':
      return (
        <AddressTransactionsSection
          transactions={transactions}
          currentAddress={address}
          isLoading={isLoading}
          loadNextPage={() => {
            fetchTransactions(page + 1, false);
            setPage(page + 1);
          }}
        />
      );
  }
};
