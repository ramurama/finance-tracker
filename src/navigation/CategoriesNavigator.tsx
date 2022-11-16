import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CategoriesList from '../screens/Categories/CategoriesList'
import CreateCategories from '../screens/Categories/CreateCategories'
import { routes } from './routes'

const CategoriesStackNavigator = createNativeStackNavigator()

export const CategoriesNavigator = () => (
  <CategoriesStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <CategoriesStackNavigator.Screen name={routes.CATEGORIES_LIST} component={CategoriesList} />
    <CategoriesStackNavigator.Screen name={routes.CREATE_CATEGORIES} component={CreateCategories} />
  </CategoriesStackNavigator.Navigator>
)
