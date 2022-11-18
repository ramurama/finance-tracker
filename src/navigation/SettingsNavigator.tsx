import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Settings from '../screens/Settings/Settings'
import { routes } from './routes'

const SettingsStackNavigator = createNativeStackNavigator()

export const SettingsNavigator = () => (
  <SettingsStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStackNavigator.Screen name={routes.SETTINGS} component={Settings} />
  </SettingsStackNavigator.Navigator>
)
