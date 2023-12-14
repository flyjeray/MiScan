import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CoinsScreen } from '../screens/Coins/CoinsScreen';
import { AddressScreen } from '../screens/Addresses/AddressScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export const NavigationRoot = (): JSX.Element => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Coins" component={CoinsScreen} />
      <Tab.Screen name="Addresses" component={AddressScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>
  );
};
