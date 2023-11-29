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

  const fetchTransactions = async () => {
    const response = await API.addresses.getAddressTransactions(
      address.address,
    );

    setTransactions(response.data.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, [address.address]);

  switch (type) {
    case 'balances':
      return <AddressBalanceSection address={address} />;
    case 'transactions':
      return (
        <AddressTransactionsSection
          transactions={transactions}
          currentAddress={address}
        />
      );
  }
};
