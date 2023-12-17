import { useEffect, useState } from 'react';
import { Button, Input, PageContainer } from '../../components';
import { translate } from '../../utils/translations/i18n';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { API } from '../../api';
import { MinterExplorerCoin } from '../../models/coins';
import { Text } from 'react-native';
import { CoinInformation } from './CoinInformation';
import { useAppDispatch, useAppSelector } from '../../utils/redux/hooks';
import {
  getSavedCoins,
  selectSavedCoins,
} from '../../utils/redux/slices/savedCoinsSlice';

export const CoinsScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const savedCoins = useAppSelector(selectSavedCoins);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [isLoading, setIsLoading] = useState(false);
  const [coin, setCoin] = useState<MinterExplorerCoin | null>(null);

  const fetchCoin = async (symbol: string) => {
    if (!symbol) {
      setCoin(null);
      return;
    }

    setIsLoading(true);

    const response = await API.coins.getCoinBySymbol(symbol.toUpperCase());

    setIsLoading(false);

    if (response.status === 200) {
      setCoin(response.data.data);
    } else {
      setCoin(null);
    }
  };

  useEffect(() => {
    fetchCoin(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <PageContainer>
      <Input
        style={{ backgroundColor: 'white' }}
        value={query}
        onChangeText={setQuery}
        placeholder={translate('input.search')}
      />
      {isLoading && <Text>Loading..</Text>}
      {!isLoading && coin && (
        <CoinInformation
          coin={coin}
          goBack={() => {
            dispatch(getSavedCoins());
            setCoin(null);
          }}
        />
      )}
      {!isLoading &&
        !coin &&
        savedCoins.map(coin => (
          <Button
            type="default"
            onPress={() => {
              setQuery('');
              fetchCoin(coin.value);
            }}
            title={`${coin.label} (${coin.value})`}
          />
        ))}
    </PageContainer>
  );
};
