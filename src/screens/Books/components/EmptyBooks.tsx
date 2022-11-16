import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

import { EmptyList } from '../../../components/atoms/EmptyList'
import { i18n } from '../../../locales'
import { routes } from '../../../navigation/routes'
import { useTheme } from '../../../theme'

export const EmptyBooks = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  return (
    <EmptyList
      icon={<MaterialCommunityIcons name="book-plus" size={50} color={colors.greyText} />}
      caption={i18n.t('books.emptyBooks')}
      suggestion={i18n.t('books.createBookMessage')}
      onPress={() => {
        navigate(routes.CREATE_BOOK)
      }}
    />
  )
}
