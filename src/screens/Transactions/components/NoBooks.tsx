import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text } from 'react-native'

import { EmptyList } from '../../../components/atoms'
import { i18n } from '../../../locales'
import { routes } from '../../../navigation/routes'

export const NoBooks = () => {
  const { navigate } = useNavigation()

  return (
    <EmptyList
      icon={<Text style={styles.emoji}>📚</Text>}
      caption={i18n.t('books.emptyBooks')}
      suggestion={i18n.t('books.createBookMessage')}
      onPress={() => {
        navigate(routes.CREATE_BOOK)
      }}
    />
  )
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: 60,
  },
})
