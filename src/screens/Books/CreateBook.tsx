import { Formik } from 'formik'
import { FC } from 'react'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { Checkbox, Header, InputField } from '../../components/molecules'
import { BookEntity } from '../../db/entities/Book.entity'
import { i18n } from '../../locales'
import { setBooks as setBooksAction } from '../../redux/actions'
import { BookEmojiPicker, CurrencyPicker } from './components/'
import { useCreateBook } from './useCreateBook'

export type CreateBookProps = {
  books: BookEntity[]
  setBooks: (books: BookEntity[]) => void
}

const CreateBook: FC<CreateBookProps> = ({ books, setBooks }) => {
  const { initialValues, isEditMode, bookValidationSchema, submitHandler } = useCreateBook({
    books,
    setBooks,
  })

  const BookForm = () => (
    <Formik
      validationSchema={bookValidationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}>
      {({ handleChange, handleSubmit, setFieldValue, values, errors, isValid }) => (
        <>
          <InputField
            label={i18n.t('books.bookName')}
            error={errors.bookName}
            placeholder={i18n.t('books.bookName')}
            value={values.bookName}
            onChangeText={handleChange('bookName')}
            keyboardType="default"
            autoCapitalize="words"
            maxLength={20}
          />

          <BookEmojiPicker
            value={values.emoji}
            onChange={(emoji) => {
              setFieldValue('emoji', emoji)
            }}
          />

          <CurrencyPicker
            value={values.currencyCode}
            onChange={(code, symbol) => {
              setFieldValue('currencyCode', code)
              setFieldValue('currencySymbol', symbol)
            }}
          />

          <Checkbox
            label={i18n.t('books.defaultBook')}
            value={values.isDefault}
            onValueChange={(value) => setFieldValue('isDefault', value)}
            color={values.isDefault ? 'grey' : ''}
            disabled={values.isDefault && isEditMode}
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
      <Header title={i18n.t('books.createBook')} backButton />
      <BookForm />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  books: state.books.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
  setBooks: (books: BookEntity[]) => dispatch(setBooksAction(books)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)
