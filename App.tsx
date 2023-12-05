import React from 'react';

import { NavigationRoot } from './src/navigation/NavigationRoot';
import { NavigationContainer } from '@react-navigation/native';
import Toast, { ErrorToast, ToastConfig } from 'react-native-toast-message';

import './src/utils/translations/i18n';

const toastConfig: ToastConfig = {
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <NavigationRoot />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
