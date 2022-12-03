import { useNavigation, useRoute } from '@react-navigation/core'
import * as yup from 'yup'

import { CategoryEntity } from '../../db/entities/Category.entity'
import { useDB } from '../../db/useDB'
import { i18n } from '../../locales'
import { Category, TransactionType } from '../../types'
import { capitalizeFirstLetter } from '../../utils'
import { CreateCategoryProps } from './CreateCategories'

export type CreateCategoryValuesType = {
  categoryName: string
  type: TransactionType
  emoji: string
}

export const useCreateCategory = ({
  setCategories,
}: Pick<CreateCategoryProps, 'setCategories'>) => {
  const { goBack } = useNavigation()
  const { params } = useRoute()
  const { categoryService } = useDB()

  const initialValues: CreateCategoryValuesType = {
    categoryName: '',
    type: params.activeType || 1,
    emoji: '',
  }

  const isEditMode = params && params.category && params.category.id

  if (isEditMode) {
    const { name, type, emoji } = params.category as Category

    initialValues.categoryName = name
    initialValues.type = type
    initialValues.emoji = emoji
  }

  const categoriesValidationSchema = yup.object().shape({
    categoryName: yup.string().required(i18n.t('categories.errorCategoryName')),
    type: yup.number().required(),
    emoji: yup.string().required(i18n.t('categories.errorEmoji')),
  })

  const submitHandler = async ({ categoryName, type, emoji }: CreateCategoryValuesType) => {
    let categoriesList: CategoryEntity[] | undefined

    const name = capitalizeFirstLetter(categoryName.trim())

    if (isEditMode) {
      categoriesList = await categoryService.updateCategory({
        id: params.category.id,
        name,
        type,
        emoji,
      })
    } else {
      categoriesList = await categoryService.createCategory({
        name,
        type,
        emoji,
      })
    }

    if (categoriesList) {
      setCategories(categoriesList)
    }

    goBack()
  }

  return {
    initialValues,
    isEditMode,
    categoriesValidationSchema,
    submitHandler,
  }
}
