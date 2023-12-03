import { Text } from 'react-native';
import { MinterExplorerTransaction } from '../../../../models/transactions';
import { MinterExplorerAddress } from '../../../../models/addresses';
import styled from 'styled-components/native';
import { Colors } from '../../../../utils/theme/colors';
import { Button } from '../../../../components';
import { translate } from '../../../../utils/translations/i18n';

type Props = {
  transactions: MinterExplorerTransaction[];
  currentAddress: MinterExplorerAddress;
  isLoading: boolean;
  loadNextPage: () => void;
};

type TransactionType = 'send' | 'receive' | 'neutral';

type TransactionDisplayData = {
  title: string;
  details: string;
  timestamp: Date;
  type: TransactionType;
};

export const AddressTransactionsSection = ({
  transactions,
  currentAddress,
  isLoading,
  loadNextPage,
}: Props): JSX.Element => {
  const convertTransactionToShortDescription = (
    trx: MinterExplorerTransaction,
  ): TransactionDisplayData | null => {
    // Multisend
    if ('list' in trx.data) {
      const sender = trx.from;

      const isReceiving = currentAddress.address !== sender;

      if (isReceiving) {
        const myTransaction = trx.data.list.find(
          trxEntry => trxEntry.to === currentAddress.address,
        );

        if (myTransaction) {
          return {
            title: translate(
              'screens.address_information.transactions.receive_multisend',
            ),
            details: `${parseFloat(myTransaction.value)} ${
              myTransaction.coin.symbol
            }`,
            type: 'receive',
            timestamp: trx.timestamp,
          };
        } else {
          return null;
        }
      } else {
        const coinMap: Record<string, number> = {};

        trx.data.list.forEach(trxEntry => {
          coinMap[trxEntry.coin.symbol] =
            (coinMap[trxEntry.coin.symbol] || 0) + parseFloat(trxEntry.value);
        });

        let details = '';

        Object.entries(coinMap).forEach((entry, i, arr) => {
          details += `${entry[0]} ${entry[1]}`;

          if (i + 1 < arr.length) {
            details += ', ';
          }
        });

        return {
          title: translate(
            'screens.address_information.transactions.multisend',
          ),
          details,
          timestamp: trx.timestamp,
          type: 'send',
        };
      }
    }
    // Exchange
    else if ('coin_to_sell' in trx.data) {
      const sellCoin = trx.data.coin_to_sell.symbol;
      const sellAmount = parseFloat(trx.data.value_to_sell);
      const buyCoin = trx.data.coin_to_buy.symbol;
      const buyAmount = parseFloat(trx.data.value_to_buy);

      return {
        title: translate('screens.address_information.transactions.exchange'),
        details: `${sellAmount} ${sellCoin} ${translate(
          'unions.exchange_to',
        )} ${buyAmount} ${buyCoin}`,
        timestamp: trx.timestamp,
        type: 'neutral',
      };
    }
    // Send
    else {
      const amount = parseFloat(trx.data.value);
      const coin = trx.data.coin.symbol;

      const receiver = trx.data.to;

      const isReceiving = currentAddress.address === receiver;

      if (isReceiving) {
        return {
          title: translate('screens.address_information.transactions.receive'),
          details: `${amount} ${coin}`,
          timestamp: trx.timestamp,
          type: 'receive',
        };
      } else {
        return {
          title: translate('screens.address_information.transactions.send'),
          details: `${amount} ${coin}`,
          timestamp: trx.timestamp,
          type: 'send',
        };
      }
    }
  };

  return (
    <>
      {transactions.map(trx => {
        const data = convertTransactionToShortDescription(trx);

        return data ? (
          <Block type={data.type}>
            <Title>{data.title}</Title>
            <Details>{data.details}</Details>
            <Details>{new Date(data.timestamp).toLocaleString()}</Details>
          </Block>
        ) : (
          <Block type="neutral">
            <Text>
              {translate(
                'screens.address_information.transactions.cannot_read',
              )}
            </Text>
          </Block>
        );
      })}
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

const Title = styled.Text`
  color: ${Colors.textColorLight};
  font-size: 16px;
  font-weight: bold;
`;

const Details = styled.Text`
  color: ${Colors.textColorLight};
  font-size: 12px;
  font-weight: regular;
`;

const Block = styled.View<{ type: TransactionType }>`
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'receive':
        return Colors.success;
      case 'send':
        return Colors.fail;
      case 'neutral':
        return Colors.coinInfoBackground;
    }
  }};
  gap: 8px;
`;
