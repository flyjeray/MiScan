import styled from 'styled-components/native';
import { MinterExplorerAddress } from '../../../../../../models/addresses';
import { MinterExplorerTransaction } from '../../../../../../models/transactions';
import { translate } from '../../../../../../utils/translations/i18n';
import { Colors } from '../../../../../../utils/theme/colors';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../utils/redux/hooks';
import { addAddressChainLink } from '../../../../../../utils/redux/slices/chainSlice';
import { selectSavedAddresses } from '../../../../../../utils/redux/slices/savedAddressesSlice';

type TransactionType = 'send' | 'receive' | 'neutral';

type TransactionDisplayData = {
  title: string;
  details: string;
  timestamp: Date;
  type: TransactionType;
  secondEnd?: string[];
  multisigData?: { address: string; weight: number }[];
  lockData?: {
    block: number;
  };
};

type Props = {
  address: MinterExplorerAddress;
  trx: MinterExplorerTransaction;
};

type LinkButtonProps = TouchableOpacityProps & { address: string };

export const TransactionInfo = ({ address, trx }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const savedAddresses = useAppSelector(selectSavedAddresses);

  const LinkButton = (props: LinkButtonProps): JSX.Element => {
    return (
      <TouchableOpacity
        style={{ flexWrap: 'wrap', flexDirection: 'row' }}
        onPress={() => {
          dispatch(addAddressChainLink(props.address));
          setExpanded(false);
        }}
        {...props}>
        {props.children}
      </TouchableOpacity>
    );
  };

  const convertTransactionToShortDescription = (
    trx: MinterExplorerTransaction,
  ): TransactionDisplayData | null => {
    // Multisig edit
    if ('weights' in trx.data) {
      const editor = trx.from;
      const data = trx.data;

      const weights = data.addresses.map((address, i) => ({
        address,
        weight: data.weights[i],
      }));

      return {
        title: translate(
          'screens.address_information.transactions.multisig_edit',
        ),
        details: `${data.addresses.length} ${translate(
          'screens.address_information.transactions.addresses_plural_lowercase',
        )}`,
        type: 'neutral',
        timestamp: trx.timestamp,
        multisigData: weights,
      };
    }

    // Lock
    if ('due_block' in trx.data) {
      return {
        title: translate('screens.address_information.transactions.lock'),
        details: `${trx.data.coin.symbol} ${parseFloat(trx.data.value)}`,
        type: 'neutral',
        timestamp: trx.timestamp,
        lockData: {
          block: trx.data.due_block,
        },
      };
    }

    // Multisend
    if ('list' in trx.data) {
      const sender = trx.from;

      const isReceiving = address.address !== sender;

      if (isReceiving) {
        const myTransaction = trx.data.list.find(
          trxEntry => trxEntry.to === address.address,
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
            secondEnd: [sender],
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
          secondEnd: trx.data.list.map(entry => entry.to),
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
        secondEnd: [],
      };
    }
    // Send
    else {
      const amount = parseFloat(trx.data.value);
      const coin = trx.data.coin.symbol;

      const isReceiving = address.address === trx.data.to;

      if (isReceiving) {
        return {
          title: translate('screens.address_information.transactions.receive'),
          details: `${amount} ${coin}`,
          timestamp: trx.timestamp,
          type: 'receive',
          secondEnd: [trx.from],
        };
      } else {
        return {
          title: translate('screens.address_information.transactions.send'),
          details: `${amount} ${coin}`,
          timestamp: trx.timestamp,
          type: 'send',
          secondEnd: [trx.data.to],
        };
      }
    }
  };

  const data = convertTransactionToShortDescription(trx);

  const findNameInSaved = (address: string): string =>
    savedAddresses.find(svd => svd.address === address)?.name || address;

  return data ? (
    <Block type={data.type} onPress={() => setExpanded(!expanded)}>
      <Title>{data.title}</Title>
      <Details>{data.details}</Details>
      <Details>{new Date(data.timestamp).toLocaleString()}</Details>
      {expanded &&
        data.secondEnd?.map((secondEndAddress, i) => (
          <LinkButton
            key={`${trx.hash}-secondend-${i}`}
            address={secondEndAddress}>
            <AddressLinkText>
              {findNameInSaved(secondEndAddress)}
            </AddressLinkText>
          </LinkButton>
        ))}
      {expanded &&
        data.multisigData?.map((address, i) => (
          <LinkButton
            address={address.address}
            key={`${trx.hash}-multisig-${i}`}>
            <Details>{address.weight} - </Details>
            <AddressLinkText>
              {findNameInSaved(address.address)}
            </AddressLinkText>
          </LinkButton>
        ))}
      {expanded && data.lockData && (
        <Details key={`${trx.hash}-lock`}>
          {translate('screens.address_information.transactions.until_block')}{' '}
          {data.lockData.block}
        </Details>
      )}
    </Block>
  ) : (
    <Block type="neutral">
      <Text>
        {translate('screens.address_information.transactions.cannot_read')}
      </Text>
    </Block>
  );
};

const Title = styled.Text`
  color: ${Colors.textColorLight};
  font-size: 16px;
  font-weight: bold;
`;

const DetailsStyle = `
  color: ${Colors.textColorLight};
  font-size: 14px;
  font-weight: regular;
`;

const Details = styled.Text`
  ${DetailsStyle}
`;

const AddressLinkText = styled.Text`
  ${DetailsStyle}
  border-color: ${Colors.textColorLight};
  border-bottom-width: 1px;
  padding-bottom: 2px;
`;

const Block = styled.TouchableOpacity<{ type: TransactionType }>`
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
