import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { FC } from 'react'

import { EmptyList } from '../../../components/atoms'
import { i18n } from '../../../locales'
import { routes } from '../../../navigation/routes'
import { useTheme } from '../../../theme'
import { TransactionType } from '../../../types'

export type EmptyCategoriesProps = {
  activeType: TransactionType
}

export const EmptyCategories: FC<EmptyCategoriesProps> = ({ activeType }) => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  return (
    <EmptyList
      icon={<MaterialIcons name="category" size={50} color={colors.grey} />}
      caption={i18n.t('categories.emptyCategories')}
      suggestion={i18n.t('categories.createCategoryMessage')}
      onPress={() => {
        navigate(routes.CREATE_CATEGORY, {
          activeType,
        })
      }}
    />
  )
}
