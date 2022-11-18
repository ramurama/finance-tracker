import { useNavigation, useRoute } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC } from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { Header, InputField } from '../../components/fragments'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { useDb } from '../../db/useDb'
import { i18n } from '../../locales'
import { setCategories as setCategoriesAction } from '../../redux/actions'
import { TransactionType } from '../../types'
import { TransactionTypeRadioButton } from '../shared/components/TransactionTypeRadioButton'

type ValuesType = {
  categoryName: string
  type: TransactionType
}

export type CategoriesListProps = {
  setCategories: (categories: CategoryEntity[]) => void
}

const CreateCategories: FC<CategoriesListProps> = ({ setCategories }) => {
  const { goBack } = useNavigation()
  const { params } = useRoute()
  const { categoryService } = useDb()

  const initialValues: ValuesType = {
    categoryName: '',
    type: 1,
  }

  const categoriesValidationSchema = yup.object().shape({
    categoryName: yup.string().required(i18n.t('categories.errorCategoryName')),
    type: yup.number().default(2).required(),
  })

  const isEditMode = params && params.category && params.category.id

  const submitHandler = async ({ categoryName, type }: ValuesType) => {
    let categoriesList: CategoryEntity[] | undefined

    const name = categoryName.trim()

    if (isEditMode) {
      categoriesList = await categoryService.updateCategory({
        id: params.category.id,
        name,
        type,
      })
    } else {
      categoriesList = await categoryService.createCategory({
        name,
        type,
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
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, isValid }) => (
        <>
          <InputField
            label={i18n.t('categories.categoryName')}
            error={errors.categoryName}
            placeholder={i18n.t('categories.categoryName')}
            value={values.categoryName}
            onChangeText={handleChange('categoryName')}
            onBlur={handleBlur('categoryName')}
            keyboardType="default"
          />

          <TransactionTypeRadioButton
            label="Type"
            selected={values.type}
            onSelected={(value) => {
              setFieldValue('type', value)
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
