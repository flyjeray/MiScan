import { Text } from 'react-native';
import { MinterExplorerTransaction } from '../../../../../models/transactions';
import { MinterExplorerAddress } from '../../../../../models/addresses';
import styled from 'styled-components/native';
import { Colors } from '../../../../../utils/theme/colors';
import { Button } from '../../../../../components';
import { translate } from '../../../../../utils/translations/i18n';
import { TransactionInfo } from './TransactionInfo';

type Props = {
  transactions: MinterExplorerTransaction[];
  currentAddress: MinterExplorerAddress;
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
        <TransactionInfo address={currentAddress} trx={trx} />
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
