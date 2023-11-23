import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { API } from '../../api';
import { MinterExplorerCoin } from '../../models/coins';

export const HomeScreen = (): JSX.Element => {
  const [coins, setCoins] = useState<MinterExplorerCoin[]>([]);

  const fetchCoins = async () => {
    console.log('Fetch coins start');

    const result = await API.coins.getAllCoins();

    console.log('Fetch coins end:', result.data.data);

    if (result.data) {
      setCoins(result.data.data.slice(0, 5));
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <View style={{ display: 'flex', gap: 8 }}>
      <Text style={{ fontSize: 24 }}>Home Screen</Text>
      {coins.map(coin => (
        <Text key={coin.id}>
          {coin.name} ({coin.id}) - {parseInt(coin.volume)}
        </Text>
      ))}
    </View>
  );
};
