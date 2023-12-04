import { MinterExplorerAddress } from '../../../../models/addresses';
import { BalanceCoinInformation } from './BalanceCoinInfo';

type Props = {
  address: MinterExplorerAddress;
};

export const AddressBalanceSection = ({ address }: Props): JSX.Element => {
  return (
    <>
      {address.balances
        .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
        .map(balance => (
          <BalanceCoinInformation
            key={`${address.address}-${balance.coin.id}`}
            name={balance.coin.symbol}
            amount={balance.amount}
          />
        ))}
    </>
  );
};
