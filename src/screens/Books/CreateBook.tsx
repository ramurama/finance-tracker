import { useNavigation, useRoute } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC } from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { Checkbox, Header, InputField } from '../../components/molecules'
import { BookEntity } from '../../db/entities/Book.entity'
import { useDb } from '../../db/useDb'
import { i18n } from '../../locales'
import { setBooks as setBooksAction } from '../../redux/actions'
import { Book } from '../../types'
import { CurrencyPicker } from './components/CurrencyPicker'

type ValuesType = {
  bookName: string
  currencyCode: string
  currencySymbol: string
  isDefault: boolean
}

export type CreateBookProps = {
  books: BookEntity[]
  setBooks: (books: BookEntity[]) => void
}

const CreateBook: FC<CreateBookProps> = ({ books, setBooks }) => {
  const { goBack } = useNavigation()
  const { params } = useRoute()

  const initialValues: ValuesType = {
    bookName: '',
    currencyCode: 'USD',
    currencySymbol: '$',
    isDefault: false,
  }

  const isEditMode = params && params.book && params.book.id

  if (isEditMode) {
    const { name, currencyCode, currencySymbol, isDefault } = params.book as Book

    initialValues.bookName = name
    initialValues.currencyCode = currencyCode
    initialValues.currencySymbol = currencySymbol
    initialValues.isDefault = isDefault
  }

  const bookValidationSchema = yup.object().shape({
    bookName: yup.string().required(i18n.t('books.errorBookName')),
    currencyCode: yup.string().required(),
    currencySymbol: yup.string().required(),
    isDefault: yup.boolean().default(false),
  })

  const { bookService } = useDb()

  const submitHandler = async ({
    bookName,
    currencyCode,
    currencySymbol,
    isDefault,
  }: ValuesType) => {
    let booksList: BookEntity[] | undefined

    const name = bookName.trim()

    if (isEditMode) {
      booksList = await bookService.updateBook({
        id: params.book.id,
        name,
        currencyCode,
        currencySymbol,
        isDefault,
      })
    } else {
      booksList = await bookService.createBook({
        name,
        currencyCode,
        currencySymbol,
        isDefault: books.length === 0 ? true : isDefault,
      })
    }

    if (booksList) {
      setBooks(booksList)
    }

    goBack()
  }

  const BookForm = () => (
    <Formik
      validationSchema={bookValidationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, isValid }) => (
        <>
          <InputField
            label={i18n.t('books.bookName')}
            error={errors.bookName}
            placeholder={i18n.t('books.bookName')}
            value={values.bookName}
            onChangeText={handleChange('bookName')}
            onBlur={handleBlur('bookName')}
            keyboardType="default"
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
