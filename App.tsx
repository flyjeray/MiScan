import React from 'react';

import { NavigationRoot } from './src/navigation/NavigationRoot';
import { NavigationContainer } from '@react-navigation/native';
import Toast, { ErrorToast, ToastConfig } from 'react-native-toast-message';
import { Provider } from 'react-redux';

import './src/utils/translations/i18n';
import { store } from './src/utils/redux/store';

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
      <Provider store={store}>
        <NavigationContainer>
          <NavigationRoot />
        </NavigationContainer>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
