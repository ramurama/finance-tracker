import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

import { i18n } from '../../../locales'
import { routes } from '../../../navigation/routes'
import { useTheme } from '../../../theme'

export const EmptyBooks = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigate(routes.CREATE_BOOK)
      }}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="book-plus" size={50} color={colors.greyText} />
        <Text style={{ ...styles.emptyMessageText, color: colors.text }}>
          {i18n.t('books.emptyBooks')}
        </Text>
        <Text style={{ ...styles.createBookText, color: colors.greyText }}>
          {i18n.t('books.createBookMessage')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height - 150,
  },
  emptyMessageText: {
    fontSize: 18,
    fontWeight: '900',
  },
  createBookText: {
    fontSize: 15,
    fontWeight: '600',
  },
})
