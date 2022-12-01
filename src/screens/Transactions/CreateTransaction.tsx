import { useNavigation } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC, PropsWithChildren, useCallback, useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { DatePickerHeader } from '../../components/fragments/DatePickerHeader'
import { BookEntity } from '../../db/entities/Book.entity'
import { getDatePickerFormattedDate } from '../../utils'
import { AmountInput, BookSelector, Keyboard, NoBooks } from './components'

type ValuesType = {
  date: string
  datePickerVisible: boolean
  bookId: number
  currency: string
  amount: string
}

export type CreateTransactionProps = {
  booksList: BookEntity[]
}

const CreateTransaction: FC<CreateTransactionProps> = ({ booksList }) => {
  const { addListener, navigate } = useNavigation()

  const transactionValidationSchema = yup.object().shape({})

  const getDefaultBook = useCallback(() => {
    if (booksList.length > 0) {
      return booksList.filter((bookElement) => bookElement.isDefault)[0]
    }

    return
  }, [booksList])

  const getBookById = useCallback(
    (id: number) => booksList.filter((item) => item.id === id)[0],
    [booksList],
  )

  const initialValues: ValuesType = useMemo(
    () => ({
      date: getDatePickerFormattedDate(new Date()),
      datePickerVisible: false,
      bookId: 0, // ! bookId should not be 0 after loading
      currency: '',
      amount: '0',
    }),
    [],
  )

  // ! update bookId on load
  useEffect(() => {
    const defaultBook = getDefaultBook()
    initialValues.bookId = defaultBook?.id || 0
    initialValues.currency = defaultBook?.currencySymbol || ''
  }, [booksList, getDefaultBook, initialValues, navigate])

  const submitHandler = ({ date }: ValuesType) => {
    console.log(date)

    // TODO: validate and submit data
  }

  const InnerContainer = (props: PropsWithChildren) => (
    <View style={styles.innerContainer}>{props.children}</View>
  )

  const ContentContainer = (props: PropsWithChildren) => (
    <View style={styles.contentContainer}>{props.children}</View>
  )

  const CreateTransactionForm = () => (
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
              datePickerVisible={values.datePickerVisible}
              setDatePickerVisible={(value) => {
                setFieldValue('datePickerVisible', value)
              }}
            />

            <InnerContainer>
              <ContentContainer>
                <BookSelector
                  booksList={booksList}
                  value={values.bookId}
                  onChange={(id) => {
                    setFieldValue('bookId', id)

                    const selectedBook = getBookById(id)!
                    setFieldValue('currency', selectedBook.currencySymbol)
                  }}
                />

                <AmountInput
                  value={values.amount}
                  currency={values.currency}
                  onBackspace={() => {
                    const value = values.amount
                    let newValue = value.substring(0, value.length - 1)

                    if (newValue === '') {
                      newValue = '0'
                    }

                    setFieldValue('amount', newValue)
                  }}
                />
              </ContentContainer>

              <Keyboard
                value={values.amount}
                onChange={(value) => {
                  let valueToUpdate = value

                  // ! if more than 2 digits present after the decimal place, trim digits
                  if (value.indexOf('.') !== -1) {
                    const split = value.split('.')
                    const afterDecimal = split[1]!

                    if (afterDecimal.length > 2) {
                      valueToUpdate = split[0] + '.' + afterDecimal.substring(0, 2)
                    }
                  }

                  setFieldValue('amount', valueToUpdate)
                }}
              />
            </InnerContainer>
          </>
        )
      }}
    </Formik>
  )

  return (
    <Container>
      {booksList.length > 0 && <CreateTransactionForm />}
      {booksList.length === 0 && <NoBooks />}
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  booksList: state.books.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 2,
    flexDirection: 'column',
  },
})
