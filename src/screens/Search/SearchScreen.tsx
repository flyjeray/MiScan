import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { API } from '../../api';
import { MinterExplorerAddress } from '../../models/addresses';
import { LocalStorage } from '../../utils/storage/storage';
import { LocalStorageSavedAddress } from '../../utils/storage/models';
import { Button, Input, PageContainer } from '../../components';
import { AddressInformation } from './AddressInformation';

export const SearchScreen = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [currentAddress, setCurrentAddress] =
    useState<MinterExplorerAddress | null>(null);
  const [addressList, setAddressList] = useState<LocalStorageSavedAddress[]>(
    [],
  );
  const [name, setName] = useState('');

  const fetchSingleAddressData = async (query: string) => {
    const address = await API.addresses.getAddress(query);

    setCurrentAddress(address.data.data);

    const savedIndex = addressList.findIndex(
      svd => svd.address === address.data.data.address,
    );

    if (savedIndex !== -1) {
      setName(addressList[savedIndex].name);
    } else {
      setName(address.data.data.address);
    }
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
    if (debouncedQuery) {
      fetchSingleAddressData(debouncedQuery);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    getAddressesFromLocalStorage();
  }, []);

  return (
    <PageContainer>
      <Input
        style={{ backgroundColor: 'white' }}
        value={query}
        onChangeText={setQuery}
        placeholder="Search"
      />
      {currentAddress ? (
        <AddressInformation
          address={currentAddress}
          name={{ value: name, update: setName }}
          list={{ value: addressList, update: setAddressList }}
          goBack={() => {
            setCurrentAddress(null);
            getAddressesFromLocalStorage();
          }}
        />
      ) : (
        addressList.map(svd => (
          <Button
            key={`saved-${svd}`}
            onPress={() => fetchSingleAddressData(svd.address)}
            title={svd.name}
          />
        ))
      )}
    </PageContainer>
  );
};
