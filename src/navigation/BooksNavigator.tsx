import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { BookList } from '../screens/Books'
import { routes } from './routes'

const BooksStackNavigator = createNativeStackNavigator()

export const BooksNavigator = () => (
  <BooksStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <BooksStackNavigator.Screen name={routes.BOOKS_LIST} component={BookList} />
  </BooksStackNavigator.Navigator>
)
