import React from 'react';
import { View } from 'react-native';

import { NavigationRoot } from './src/navigation/NavigationRoot';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from './src/utils/theme/colors';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NavigationRoot />
    </NavigationContainer>
  );
}

export default App;
