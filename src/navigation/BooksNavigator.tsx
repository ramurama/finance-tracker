import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BookList from '../screens/Books/BookList'
import CreateBook from '../screens/Books/CreateBook'
import { routes } from './routes'

const BooksStackNavigator = createNativeStackNavigator()

export const BooksNavigator = () => (
  <BooksStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <BooksStackNavigator.Screen name={routes.BOOKS_LIST} component={BookList} />
    <BooksStackNavigator.Screen name={routes.CREATE_BOOK} component={CreateBook} />
  </BooksStackNavigator.Navigator>
)
