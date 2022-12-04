import { Formik } from 'formik'
import { FC } from 'react'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { TransactionTypeRadioButton } from '../../components/fragments'
import { Header, InputField } from '../../components/molecules'
import { EmojiPicker } from '../../components/molecules'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { i18n } from '../../locales'
import { setCategories as setCategoriesAction } from '../../redux/actions'
import { useCreateCategory } from './useCreateCategory'

export type CreateCategoryProps = {
  setCategories: (categories: CategoryEntity[]) => void
}

const CreateCategories: FC<CreateCategoryProps> = ({ setCategories }) => {
  const { initialValues, isEditMode, categoriesValidationSchema, submitHandler } =
    useCreateCategory({
      setCategories,
    })

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
            maxLength={20}
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
