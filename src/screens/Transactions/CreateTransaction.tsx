import { useNavigation } from '@react-navigation/core'
import { Formik } from 'formik'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { FC } from 'react'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { DatePickerHeader } from '../../components/fragments/DatePickerHeader'
import { BookEntity } from '../../db/entities/Book.entity'
import { getDatePickerFormattedDate } from '../../utils'
import { BookSelector } from './components/BookSelector'

type ValuesType = {
  date: string
  bookId: number
}

export type CreateTransactionsProps = {
  booksList: BookEntity[]
}

const CreateTransactions: FC<CreateTransactionsProps> = ({ booksList }) => {
  const { addListener } = useNavigation()
  const transactionValidationSchema = yup.object().shape({})

  const getDefaultBook = useCallback(() => {
    if (booksList.length > 0) {
      return booksList.filter((book) => book.isDefault)[0]
    }

    return
  }, [booksList])

  // TODO: if bookId is 0, means there is no book and the book list is empty
  // TODO: then prompt user to create a book
  const initialValues: ValuesType = useMemo(
    () => ({
      date: getDatePickerFormattedDate(new Date()),
      bookId: 0, // ! bookId should not be 0 after loading
    }),
    [],
  )

  // update bookId on load
  useEffect(() => {
    initialValues.bookId = getDefaultBook()?.id || 0
  }, [booksList, getDefaultBook, initialValues])

  const submitHandler = ({ date }: ValuesType) => {
    console.log(date)
  }

  return (
    <Container>
      <Formik
        validationSchema={transactionValidationSchema}
        initialValues={initialValues}
        onSubmit={submitHandler}>
        {({ setFieldValue, values, resetForm }) => {
          // reset form on user navigating to other screen
          addListener('focus', () => {
            resetForm()
          })

          return (
            <>
              <DatePickerHeader
                value={values.date}
                onChange={(dateString) => setFieldValue('date', dateString)}
              />

              <BookSelector
                booksList={booksList}
                value={values.bookId}
                onChange={(id) => {
                  setFieldValue('bookId', id)
                }}
              />
            </>
          )
        }}
      </Formik>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  booksList: state.books.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransactions)
