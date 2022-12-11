import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home/Home'
import { BooksNavigator } from './BooksNavigator'
import { routes } from './routes'

const HomeStackNavigator = createNativeStackNavigator()

export const HomeNavigator = () => (
  <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <HomeStackNavigator.Screen name={routes.HOME} component={Home} />
    <HomeStackNavigator.Screen name={routes.BOOKS_NAV} component={BooksNavigator} />
  </HomeStackNavigator.Navigator>
)
