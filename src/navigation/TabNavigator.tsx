/* eslint-disable react/no-unstable-nested-components */
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Reports } from '../screens/Reports'
import { Settings } from '../screens/Settings'
import { CreateTransactions } from '../screens/Transactions'
import { useTheme } from '../theme'
import { BooksNavigator } from './BooksNavigator'
import { CategoriesNavigator } from './CategoriesNavigator'
import { AddIcon } from './components/AddIcon'
import { routes } from './routes'

const Tab = createBottomTabNavigator()

const iconSize = 30

export const TabNavigator = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? colors.tabIconActiveColor : colors.tabIconInactiveColor

            return {
              [routes.BOOKS_NAV]: <MaterialIcons name="book" size={iconSize} color={iconColor} />,
              [routes.REPORTS]: (
                <MaterialIcons name="insert-chart" size={iconSize} color={iconColor} />
              ),
              [routes.CATEGORIES_NAV]: (
                <MaterialIcons name="category" size={iconSize} color={iconColor} />
              ),
              [routes.SETTINGS]: (
                <MaterialIcons name="settings" size={iconSize} color={iconColor} />
              ),
            }[route.name]
          },
          tabBarBackground: () => (
            <View style={{ ...styles.background, backgroundColor: colors.background }} />
          ),
          tabBarButton: (props) => {
            if (route.name === routes.CREATE_TRANSACTION) {
              return <AddIcon size={iconSize} {...props} />
            }

            return <TouchableOpacity {...props} />
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: { borderTopWidth: 0 },
        }
      }}>
      <Tab.Screen name={routes.BOOKS_NAV} component={BooksNavigator} />
      <Tab.Screen name={routes.REPORTS} component={Reports} />
      <Tab.Screen name={routes.CREATE_TRANSACTION} component={CreateTransactions} />
      <Tab.Screen name={routes.CATEGORIES_NAV} component={CategoriesNavigator} />
      <Tab.Screen name={routes.SETTINGS} component={Settings} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
})
