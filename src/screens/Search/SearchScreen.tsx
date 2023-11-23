import { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { API } from '../../api';
import { MinterExplorerAddress } from '../../models/addresses';

export const SearchScreen = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [address, setAddress] = useState<MinterExplorerAddress | null>(null);

  const fetchProfile = async () => {
    if (debouncedQuery) {
      console.log(debouncedQuery);

      const address = await API.addresses.getAddress(debouncedQuery);

      console.log(address);

      setAddress(address.data.data);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [debouncedQuery]);

  return (
    <View>
      <TextInput
        style={{ backgroundColor: 'white' }}
        value={query}
        onChangeText={setQuery}
      />
      {address && (
        <View>
          <Text>{address.address}</Text>
          <Text>
            {address.balances[0].coin.symbol} - {address.balances[0].amount}
          </Text>
        </View>
      )}
    </View>
  );
};
