import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation } from '@react-navigation/core'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { CategoryEntity } from '../../db/entities/Category.entity'
import { useDB } from '../../db/useDB'
import { i18n } from '../../locales'
import { routes } from '../../navigation/routes'
import { TransactionType } from '../../types'
import { CategoriesListProps } from './CategoriesList'

export const useCategoriesList = ({
  setCategories,
}: Pick<CategoriesListProps, 'setCategories'>) => {
  const { navigate } = useNavigation()
  const { categoryService } = useDB()
  const { showActionSheetWithOptions } = useActionSheet()

  const [activeType, setActiveType] = useState<TransactionType>(1)

  const loadCategories = useCallback(async () => {
    setCategories(await categoryService.getCategories())
  }, [categoryService, setCategories])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const goToEditMode = (category: CategoryEntity) => {
    navigate(routes.CREATE_CATEGORY, {
      category: {
        id: category.id,
        name: category.name,
        emoji: category.emoji,
        type: category.type,
      },
    })
  }

  const deleteCategory = (categoryId: number) => {
    Alert.alert(i18n.t('common.caution'), i18n.t('categories.deleteCategoryConfirmation'), [
      {
        text: i18n.t('common.yes'),
        onPress: async () => {
          await categoryService.deleteCategory(categoryId)
          await loadCategories()
        },
      },
      {
        text: i18n.t('common.no'),
      },
    ])
  }

  const longPressHandler = (category: CategoryEntity) => {
    const options = [i18n.t('common.delete'), i18n.t('common.edit'), i18n.t('common.cancel')]
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      async (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 1:
            goToEditMode(category)
            break

          case destructiveButtonIndex:
            await deleteCategory(category.id)
            break

          default:
            break
        }
      },
    )
  }

  const goToCreateCategory = () => {
    navigate(routes.CREATE_CATEGORY, {
      activeType,
    })
  }

  const onSwipeLeft = () => {
    setActiveType(2)
  }

  const onSwipeRight = () => {
    setActiveType(1)
  }

  return {
    activeType,
    setActiveType,
    longPressHandler,
    goToCreateCategory,
    onSwipeLeft,
    onSwipeRight,
  }
}
