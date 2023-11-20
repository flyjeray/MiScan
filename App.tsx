import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>App</Text>
    </SafeAreaView>
  );
}

export default App;
