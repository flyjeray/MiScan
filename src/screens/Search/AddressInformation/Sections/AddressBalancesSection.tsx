import { ShortCoinInfo } from '../../../../components';
import { MinterExplorerAddress } from '../../../../models/addresses';

type Props = {
  address: MinterExplorerAddress;
};

export const AddressBalanceSection = ({ address }: Props): JSX.Element => {
  return (
    <>
      {address.balances
        .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
        .map(balance => (
          <ShortCoinInfo
            key={`${address.address}-${balance.coin.id}`}
            name={balance.coin.symbol}
            amount={balance.amount}
          />
        ))}
    </>
  );
};
