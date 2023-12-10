import { Text } from 'react-native';
import { MinterExplorerTransaction } from '../../../../../models/transactions';
import { AddressDataWithLockedBalance } from '../../../../../models/addresses';
import { Button } from '../../../../../components';
import { translate } from '../../../../../utils/translations/i18n';
import { TransactionInfo } from './TransactionInfo';

type Props = {
  transactions: MinterExplorerTransaction[];
  currentAddress: AddressDataWithLockedBalance;
  isLoading: boolean;
  loadNextPage: () => void;
};

export const AddressTransactionsSection = ({
  transactions,
  currentAddress,
  isLoading,
  loadNextPage,
}: Props): JSX.Element => {
  return (
    <>
      {transactions.map(trx => (
        <TransactionInfo key={trx.hash} address={currentAddress} trx={trx} />
      ))}
      {isLoading ? (
        <Text>{translate('status.loading')}..</Text>
      ) : (
        <Button
          disabled={isLoading}
          title={translate('buttons.load_more')}
          onPress={loadNextPage}
          type="default"
        />
      )}
    </>
  );
};
