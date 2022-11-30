import { useNavigation, useRoute } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC } from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { TransactionTypeRadioButton } from '../../components/fragments/TransactionTypeRadioButton'
import { Header, InputField } from '../../components/molecules'
import { EmojiPicker } from '../../components/molecules'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { useDB } from '../../db/useDB'
import { i18n } from '../../locales'
import { setCategories as setCategoriesAction } from '../../redux/actions'
import { Category, TransactionType } from '../../types'
import { capitalizeFirstLetter } from '../../utils'

type ValuesType = {
  categoryName: string
  type: TransactionType
  emoji: string
}

export type CategoriesListProps = {
  setCategories: (categories: CategoryEntity[]) => void
}

const CreateCategories: FC<CategoriesListProps> = ({ setCategories }) => {
  const { goBack } = useNavigation()
  const { params } = useRoute()
  const { categoryService } = useDB()

  const initialValues: ValuesType = {
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

  const submitHandler = async ({ categoryName, type, emoji }: ValuesType) => {
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

  const CategoryForm = () => (
    <Formik
      validationSchema={categoriesValidationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors, isValid }) => (
        <>
          <InputField
            label={i18n.t('categories.categoryName')}
            error={errors.categoryName}
            placeholder={i18n.t('categories.categoryName')}
            value={values.categoryName}
            onChangeText={handleChange('categoryName')}
            // onBlur={handleBlur('categoryName')}
            keyboardType="default"
            autoCapitalize="words"
          />

          <TransactionTypeRadioButton
            label={i18n.t('categories.type')}
            selected={values.type}
            onSelected={(value) => {
              setFieldValue('type', value)
            }}
          />

          <EmojiPicker
            label="Pick an emoji"
            value={values.emoji}
            error={errors.emoji}
            onSelection={(emoji) => {
              setFieldValue('emoji', emoji)
            }}
          />

          <Button
            label={isEditMode ? i18n.t('common.update') : i18n.t('common.create')}
            onPress={handleSubmit}
            disabled={!isValid}
            bottom
            fullWidth
          />
        </>
      )}
    </Formik>
  )

  return (
    <Container>
      <Header title={i18n.t('categories.createCategory')} backButton />
      <CategoryForm />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  categories: state.categories.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
  setCategories: (categories: CategoryEntity[]) => dispatch(setCategoriesAction(categories)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategories)
