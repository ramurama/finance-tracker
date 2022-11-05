import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CategoriesList } from '../screens/Categories'
import { routes } from './routes'

const CategoriesStackNavigator = createNativeStackNavigator()

export const CategoriesNavigator = () => (
  <CategoriesStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <CategoriesStackNavigator.Screen name={routes.CATEGORIES_LIST} component={CategoriesList} />
  </CategoriesStackNavigator.Navigator>
)
