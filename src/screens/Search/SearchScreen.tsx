import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { API } from '../../api';
import { MinterExplorerAddress } from '../../models/addresses';
import { LocalStorage } from '../../utils/storage/storage';

export const SearchScreen = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [address, setAddress] = useState<MinterExplorerAddress | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  const fetchAddress = async (query: string) => {
    const address = await API.addresses.getAddress(query);

    setAddress(address.data.data);
  };

  const getSavedAddresses = async () => {
    const localSavedAddresses = await LocalStorage.get('savedAddresses');

    if (localSavedAddresses && localSavedAddresses.length > 0) {
      setSaved(localSavedAddresses);
    }
  };

  const handleAddToSaved = (address: string) => {
    if (!saved.includes(address)) {
      const newSaved = [...saved, address];

      LocalStorage.save('savedAddresses', newSaved);
      setSaved(newSaved);
    }
  };

  const handleRemoveFromSaved = (address: string) => {
    const index = saved.findIndex(adr => adr === address);
    if (index !== -1) {
      const newSaved = [...saved];
      newSaved.splice(index, 1);

      LocalStorage.save('savedAddresses', newSaved);
      setSaved(newSaved);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      fetchAddress(debouncedQuery);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    getSavedAddresses();
  }, []);

  return (
    <View>
      <TextInput
        style={{ backgroundColor: 'white' }}
        value={query}
        onChangeText={setQuery}
      />
      {address ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              setAddress(null);
              setQuery('');
            }}>
            <Text>Go Back</Text>
          </TouchableOpacity>
          <Text>{address.address}</Text>
          {saved.includes(address.address) ? (
            <TouchableOpacity
              onPress={() => handleRemoveFromSaved(address.address)}>
              <Text>Remove from favorites</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleAddToSaved(address.address)}>
              <Text>Add to favorites</Text>
            </TouchableOpacity>
          )}
          <Text>
            {address.balances[0].coin.symbol} - {address.balances[0].amount}
          </Text>
        </View>
      ) : (
        <View>
          {saved.map(savedAddress => (
            <TouchableOpacity onPress={() => fetchAddress(savedAddress)}>
              <Text>{savedAddress}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
