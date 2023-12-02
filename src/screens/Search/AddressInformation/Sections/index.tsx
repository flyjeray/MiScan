import { useEffect, useState } from 'react';
import * as _ from '..';
import { MinterExplorerAddress } from '../../../../models/addresses';
import { AddressBalanceSection } from './AddressBalancesSection';
import { MinterExplorerTransaction } from '../../../../models/transactions';
import { API } from '../../../../api';
import { AddressTransactionsSection } from './AddressTransactionsSection';

type Props = {
  address: MinterExplorerAddress;
  type: _.AddressSection;
};

export const AddressSection = ({ address, type }: Props) => {
  const [transactions, setTransactions] = useState<MinterExplorerTransaction[]>(
    [],
  );
  
  const [page, setPage] = useState(1);

  const fetchTransactions = async (page: number, newAddress: boolean) => {
    const response = await API.addresses.getAddressTransactions(
      address.address,
      page
    );
    
    if (response.status !== 200) {
      setTransactions([]);
      return;
    }
    
    if (newAddress) {
      setTransactions(response.data.data);
      return;
    }
    
    const copy = [...transactions];
    const combined = copy.concat(response.data.data);
    setTransactions(combined);
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
          loadNextPage={() => {
            fetchTransactions(page + 1, false);
            setPage(page + 1);
          }}
        />
      );
  }
};
