import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { API } from '../../api';
import { MinterExplorerAddress } from '../../models/addresses';
import { Button, Input, PageContainer } from '../../components';
import { AddressInformation } from './AddressInformation';
import { translate } from '../../utils/translations/i18n';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../utils/redux/hooks';
import {
  overrideChainLink,
  popAddressChainLink,
  selectChain,
} from '../../utils/redux/slices/chainSlice';
import {
  getSavedAddresses,
  selectSavedAddresses,
} from '../../utils/redux/slices/savedAddressesSlice';

export const SearchScreen = (): JSX.Element => {
  const { i18n } = useTranslation();
  const addressChain = useAppSelector(selectChain);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [isLoading, setIsLoading] = useState(false);

  const [currentAddress, setCurrentAddress] =
    useState<MinterExplorerAddress | null>(null);
  const [customAddressName, setCustomAddressName] = useState('');

  const savedAddresses = useAppSelector(selectSavedAddresses);

  const fetchSingleAddressData = async (query: string) => {
    setIsLoading(true);

    API.addresses
      .getAddress(query)
      .then(res => {
        setCurrentAddress(res.data.data);

        const savedIndex = savedAddresses.findIndex(
          svd => svd.address === res.data.data.address,
        );

        if (savedIndex !== -1) {
          setCustomAddressName(savedAddresses[savedIndex].name);
        } else {
          setCustomAddressName(res.data.data.address);
        }
      })
      .catch(() => {
        setCurrentAddress(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (addressChain.length > 0) {
      fetchSingleAddressData(addressChain[addressChain.length - 1]);
    } else {
      setCurrentAddress(null);
    }
  }, [addressChain]);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(overrideChainLink([debouncedQuery]));
    }
  }, [debouncedQuery]);

  useEffect(() => {
    dispatch(getSavedAddresses());
  }, []);

  return (
    <PageContainer key={i18n.language}>
      <Input
        style={{ backgroundColor: 'white' }}
        value={query}
        onChangeText={setQuery}
        placeholder={translate('input.search')}
      />
      {isLoading && <Text>{translate('status.loading')}..</Text>}
      {currentAddress ? (
        <AddressInformation
          address={currentAddress}
          name={{ value: customAddressName, update: setCustomAddressName }}
          goBack={() => {
            if (addressChain.length === 1) {
              dispatch(getSavedAddresses());
            }
            dispatch(popAddressChainLink());
          }}
        />
      ) : (
        !isLoading &&
        savedAddresses.map(svd => (
          <Button
            key={`saved-${svd.address}`}
            onPress={() => {
              setQuery('');
              dispatch(overrideChainLink([svd.address]));
            }}
            type="default"
            title={svd.name}
          />
        ))
      )}
    </PageContainer>
  );
};
