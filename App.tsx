import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { API } from './src/api';
import { MinterExplorerCoin } from './src/api/coins/models';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [coins, setCoins] = useState<MinterExplorerCoin[]>([]);

  const fetchCoins = async () => {
    const result = await API.coins.getAllCoins();

    console.log(result.data.data);

    if (result.data) {
      setCoins(result.data.data.slice(0, 5));
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>App</Text>
      <View style={{ display: 'flex', gap: 8 }}>
        {coins.map(coin => (
          <Text key={coin.id}>
            {coin.name} ({coin.id}) - {parseInt(coin.volume)}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default App;
