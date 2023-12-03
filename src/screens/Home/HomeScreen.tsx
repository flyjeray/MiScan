import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { API } from '../../api';
import { MinterExplorerCoin } from '../../models/coins';
import { PageContainer } from '../../components';

export const HomeScreen = (): JSX.Element => {
  const [coins, setCoins] = useState<MinterExplorerCoin[]>([]);

  const fetchCoins = async () => {
    const result = await API.coins.getAllCoins();

    if (result.data) {
      setCoins(result.data.data.slice(0, 5));
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <PageContainer>
      <Text style={{ fontSize: 24 }}>Home Screen</Text>
      {coins.map(coin => (
        <Text key={coin.id}>
          {coin.name} ({coin.id}) - {parseInt(coin.volume)}
        </Text>
      ))}
    </PageContainer>
  );
};
