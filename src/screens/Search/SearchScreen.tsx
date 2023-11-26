import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { API } from '../../api';
import { MinterExplorerAddress } from '../../models/addresses';
import { LocalStorage } from '../../utils/storage/storage';
import { LocalStorageSavedAddress } from '../../utils/storage/models';
import {
  Button,
  EditableTitle,
  Input,
  PageContainer,
  ShortCoinInfo,
} from '../../components';

export const SearchScreen = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [fetched, setAddress] = useState<MinterExplorerAddress | null>(null);
  const [saved, setSaved] = useState<LocalStorageSavedAddress[]>([]);
  const [name, setName] = useState('');

  const fetchAddress = async (query: string) => {
    const address = await API.addresses.getAddress(query);

    setAddress(address.data.data);

    const savedIndex = saved.findIndex(
      svd => svd.address === address.data.data.address,
    );

    if (savedIndex !== -1) {
      setName(saved[savedIndex].name);
    } else {
      setName(address.data.data.address);
    }
  };

  const verifyAddresses = async (): Promise<LocalStorageSavedAddress[]> => {
    const savedAddresses = (await LocalStorage.get('savedAddresses')) || [];

    const filtered = savedAddresses.filter(address => {
      return address.name && address.address;
    });

    await LocalStorage.save('savedAddresses', filtered);

    return filtered;
  };

  const getSavedAddresses = async () => {
    const addresses = await verifyAddresses();

    if (addresses && addresses.length > 0) {
      setSaved(addresses);
    }
  };

  const handleAddToSaved = (address: string) => {
    if (!saved.find(svd => svd.address === address)) {
      const newSaved: LocalStorageSavedAddress[] = [
        ...saved,
        { name: address, address },
      ];

      LocalStorage.save('savedAddresses', newSaved);
      setSaved(newSaved);
    }
  };

  const handleRemoveFromSaved = (address: string) => {
    const index = saved.findIndex(svd => svd.address === address);
    if (index !== -1) {
      const newSaved = [...saved];
      newSaved.splice(index, 1);

      LocalStorage.save('savedAddresses', newSaved);
      setSaved(newSaved);
    }
  };

  const handleEditSaved = (address: string, title: string) => {
    const index = saved.findIndex(svd => svd.address === address);
    let titleToSaveWith = title;

    if (!titleToSaveWith) {
      setName(address);
      titleToSaveWith = address;
    }

    if (index !== -1) {
      const copy = [...saved];
      const edited = {
        name: titleToSaveWith,
        address,
      };

      copy[index] = edited;

      LocalStorage.save('savedAddresses', copy).then(() => setName(title));
    }
  };

  const isAddressSaved = (address: string) =>
    !!saved.find(svd => svd.address === address);

  useEffect(() => {
    if (debouncedQuery) {
      fetchAddress(debouncedQuery);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    console.log(name);
  }, [name]);

  useEffect(() => {
    getSavedAddresses();
  }, []);

  return (
    <PageContainer>
      <Input
        style={{ backgroundColor: 'white' }}
        value={query}
        onChangeText={setQuery}
        placeholder="Search"
      />
      {fetched ? (
        <>
          <Button.Component
            onPress={() => {
              setAddress(null);
              setQuery('');
              getSavedAddresses();
            }}
            alternative>
            <Button.InnerText>Go Back</Button.InnerText>
          </Button.Component>
          <EditableTitle
            maxAmountSymbols={30}
            editable={isAddressSaved(fetched.address)}
            onChangeText={val => setName(val)}
            onBlur={() => handleEditSaved(fetched.address, name)}
            value={name || fetched.address}
          />
          {name && <Text selectable>{fetched.address}</Text>}
          {saved.find(svd => svd.address === fetched.address) ? (
            <Button.Component
              onPress={() => handleRemoveFromSaved(fetched.address)}>
              <Button.InnerText>Remove from favorites</Button.InnerText>
            </Button.Component>
          ) : (
            <Button.Component onPress={() => handleAddToSaved(fetched.address)}>
              <Button.InnerText>Add to favorites</Button.InnerText>
            </Button.Component>
          )}
          {fetched.balances
            .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
            .map(balance => (
              <ShortCoinInfo
                name={balance.coin.symbol}
                amount={balance.amount}
              />
            ))}
        </>
      ) : (
        <>
          {saved.map(svd => (
            <Button.Component
              key={`saved-${svd}`}
              onPress={() => fetchAddress(svd.address)}>
              <Button.InnerText>{svd.name}</Button.InnerText>
            </Button.Component>
          ))}
        </>
      )}
    </PageContainer>
  );
};
