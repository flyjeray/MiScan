import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { API } from '../../api';
import { MinterExplorerAddress } from '../../models/addresses';
import { LocalStorage } from '../../utils/storage/storage';
import { LocalStorageSavedAddress } from '../../utils/storage/models';
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

export const SearchScreen = (): JSX.Element => {
  const { i18n } = useTranslation();
  const addressChain = useAppSelector(selectChain);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [isLoading, setIsLoading] = useState(false);

  const [currentAddress, setCurrentAddress] =
    useState<MinterExplorerAddress | null>(null);
  const [addressList, setAddressList] = useState<LocalStorageSavedAddress[]>(
    [],
  );
  const [name, setName] = useState('');

  const fetchSingleAddressData = async (query: string) => {
    setIsLoading(true);

    API.addresses
      .getAddress(query)
      .then(res => {
        setCurrentAddress(res.data.data);

        const savedIndex = addressList.findIndex(
          svd => svd.address === res.data.data.address,
        );

        if (savedIndex !== -1) {
          setName(addressList[savedIndex].name);
        } else {
          setName(res.data.data.address);
        }
      })
      .catch(() => {
        setCurrentAddress(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const verifyAddressObjects = async (): Promise<
    LocalStorageSavedAddress[]
  > => {
    const savedAddresses = (await LocalStorage.get('savedAddresses')) || [];

    const filtered = savedAddresses.filter(address => {
      return address.name && address.address;
    });

    await LocalStorage.save('savedAddresses', filtered);

    return filtered;
  };

  const getAddressesFromLocalStorage = async () => {
    const addresses = await verifyAddressObjects();

    if (addresses && addresses.length > 0) {
      setAddressList(addresses);
    }
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
    getAddressesFromLocalStorage();
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
          name={{ value: name, update: setName }}
          list={{ value: addressList, update: setAddressList }}
          goBack={() => {
            if (addressChain.length === 1) {
              getAddressesFromLocalStorage();
            }
            dispatch(popAddressChainLink());
          }}
        />
      ) : (
        addressList.map(svd => (
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
