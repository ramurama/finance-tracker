import { useNavigation } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { Checkbox, Header, InputField } from '../../components/fragments'
import { BookEntity } from '../../db/entities/Book.entity'
import { useDb } from '../../db/useDb'
import { i18n } from '../../locales'
import { setBooks as setBooksAction } from '../../redux/actions'
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
  const navigation = useNavigation()

  const initialValues: ValuesType = {
    bookName: '',
    currencyCode: 'USD',
    currencySymbol: '$',
    isDefault: false,
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
    await bookService.createBook({
      name: bookName.trim(),
      currencyCode,
      currencySymbol,
      isDefault: books.length === 0 ? true : isDefault,
    })

    setBooks(await bookService.getBooks())

    navigation.goBack()
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
          />

          <Button
            label={i18n.t('books.create')}
            onPress={handleSubmit}
            disabled={!isValid}
            style={styles.createButton}
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

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    bottom: 0,
    width: '95%',
  },
})
