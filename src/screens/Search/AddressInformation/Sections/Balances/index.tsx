import {
  AddressDataWithLockedBalance,
  MinterExplorerAddress,
} from '../../../../../models/addresses';
import { translate } from '../../../../../utils/translations/i18n';
import { BalanceCoinInformation } from './BalanceCoinInfo';

type Props = {
  address: AddressDataWithLockedBalance;
};

export const AddressBalanceSection = ({ address }: Props): JSX.Element => {
  return (
    <>
      {address.locked
        .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
        .map(balance => (
          <BalanceCoinInformation
            key={`${address.address}-${balance.coin.id}-LOCKED`}
            name={`${balance.coin.symbol} - ${translate(
              'screens.address_information.locked',
            )}`}
            amount={balance.value}
            type="locked"
            startBlock={balance.start_block}
            endBlock={balance.due_block}
          />
        ))}
      {address.balances
        .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
        .map(balance => (
          <BalanceCoinInformation
            key={`${address.address}-${balance.coin.id}`}
            name={balance.coin.symbol}
            amount={balance.amount}
            type="free"
          />
        ))}
    </>
  );
};
