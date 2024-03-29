import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Reports } from '../screens/Reports'
import CreateTransactions from '../screens/Transactions/CreateTransaction'
import { useTheme } from '../theme'
import { CategoriesNavigator } from './CategoriesNavigator'
import { AddLogTabButton } from './components/AddLogTabButton'
import { HomeNavigator } from './HomeNavigator'
import { routes } from './routes'
import { SettingsNavigator } from './SettingsNavigator'

const Tab = createBottomTabNavigator()

const iconSize = 30

const tabBarShownRoutes = [
  routes.HOME_NAV,
  routes.REPORTS,
  routes.CATEGORIES_NAV,
  routes.SETTINGS_NAV,
]

export const TabNavigator = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? colors.tabIconActiveColor : colors.tabIconInactiveColor

            // TODO: replace books nav by home nav
            // TODO: replace settings nav by budget nav
            return {
              [routes.HOME_NAV]: <Ionicons name="home" size={iconSize - 4} color={iconColor} />,
              [routes.REPORTS]: (
                <MaterialIcons name="insert-chart" size={iconSize} color={iconColor} />
              ),
              [routes.CREATE_TRANSACTION]: (
                <MaterialIcons name="add" size={iconSize} color={colors.background} />
              ),
              [routes.CATEGORIES_NAV]: (
                <MaterialIcons name="category" size={iconSize} color={iconColor} />
              ),
              [routes.SETTINGS_NAV]: (
                <MaterialIcons name="settings" size={iconSize} color={iconColor} />
              ),
            }[route.name]
          },
          tabBarBackground: () => (
            <View style={{ ...styles.background, backgroundColor: colors.background }} />
          ),
          tabBarButton: (props) => {
            if (route.name === routes.CREATE_TRANSACTION) {
              return <AddLogTabButton {...props} />
            }

            return <TouchableOpacity {...props} />
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            display: tabBarShownRoutes.includes(route.name) ? 'flex' : 'none',
          },
        }
      }}>
      <Tab.Screen name={routes.HOME_NAV} component={HomeNavigator} />
      <Tab.Screen name={routes.REPORTS} component={Reports} />
      <Tab.Screen name={routes.CREATE_TRANSACTION} component={CreateTransactions} />
      <Tab.Screen name={routes.CATEGORIES_NAV} component={CategoriesNavigator} />
      <Tab.Screen name={routes.SETTINGS_NAV} component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
})
