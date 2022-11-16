import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

import { EmptyList } from '../../../components/atoms/EmptyList'
import { i18n } from '../../../locales'
import { routes } from '../../../navigation/routes'
import { useTheme } from '../../../theme'

export const EmptyCategories = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  return (
    <EmptyList
      icon={<MaterialIcons name="category" size={50} color={colors.greyText} />}
      caption={i18n.t('categories.emptyCategories')}
      suggestion={i18n.t('categories.createCategoryMessage')}
      onPress={() => {
        navigate(routes.CREATE_CATEGORIES)
      }}
    />
  )
}
