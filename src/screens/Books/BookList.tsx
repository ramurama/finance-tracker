import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Container } from '../../components'
import { Header } from '../../components/fragments'
import { i18n } from '../../locales'
import { routes } from '../../navigation/routes'
import { useTheme } from '../../theme'
import { BookItem } from './components/BookItem'

export const BookList = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const AddBook = () => (
    <TouchableOpacity
      style={styles.iconTouchable}
      onPress={() => {
        navigation.navigate(routes.CREATE_BOOK)
      }}>
      <MaterialIcons name="add" size={24} color={colors.text} />
    </TouchableOpacity>
  )

  return (
    <Container>
      <Header title={i18n.t('books.books')} iconRight={<AddBook />} />
      <BookItem title="Germany" currency="EUR" onPress={() => {}} isDefault />
      <BookItem title="India" currency="INR" onPress={() => {}} />
    </Container>
  )
}

const styles = StyleSheet.create({
  iconTouchable: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
