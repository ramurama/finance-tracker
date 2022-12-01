import { useNavigation } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC, PropsWithChildren, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { DatePickerHeader, Selector } from '../../components/fragments'
import { BookEntity } from '../../db/entities/Book.entity'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { TransactionType } from '../../types'
import { getDatePickerFormattedDate } from '../../utils'
import { AmountInput, Keyboard, NoBooks, TypeSelector } from './components'

type ValuesType = {
  date: string
  datePickerVisible: boolean
  bookId: number
  categoryId: number
  currency: string
  amount: string
  type: TransactionType
}

// TODO: one default category for expense should be added during app init (id 1)
// TODO: one default category for income should be added during app init (id 2)

const initialValues: ValuesType = {
  date: getDatePickerFormattedDate(new Date()),
  datePickerVisible: false,
  bookId: 0, // ! bookId should not be 0 after loading
  categoryId: 1, // ! category id 1 is default expense
  currency: '',
  amount: '0',
  type: 1,
}

export type CreateTransactionProps = {
  booksList: BookEntity[]
  categoriesList: CategoryEntity[]
}

const CreateTransaction: FC<CreateTransactionProps> = ({ booksList, categoriesList }) => {
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

  // ! update bookId on load
  useEffect(() => {
    const defaultBook = getDefaultBook()
    initialValues.bookId = defaultBook?.id || 0
    initialValues.currency = defaultBook?.currencySymbol || ''
  }, [booksList, getDefaultBook, navigate])

  useEffect(() => {}, [])

  const submitHandler = ({ date, amount, bookId, type, categoryId }: ValuesType) => {
    console.log(date, amount, bookId, type)
    console.log(categoryId)

    // TODO: validate and submit data
  }

  const InnerContainer = (props: PropsWithChildren) => (
    <View style={styles.innerContainer}>{props.children}</View>
  )

  const ContentContainer = (props: PropsWithChildren) => (
    <View style={styles.contentContainer}>{props.children}</View>
  )

  const InputContainer = (props: PropsWithChildren) => (
    <View style={styles.inputContainer}>{props.children}</View>
  )

  const CreateTransactionForm = () => (
    <Formik
      validationSchema={transactionValidationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}>
      {({ setFieldValue, values, resetForm, handleSubmit }) => {
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
                <Selector
                  list={booksList}
                  value={values.bookId}
                  onChange={(id) => {
                    setFieldValue('bookId', id)

                    const selectedBook = getBookById(id)!
                    setFieldValue('currency', selectedBook.currencySymbol)
                  }}
                />

                <InputContainer>
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

                  <TypeSelector
                    value={values.type}
                    onChange={(value) => {
                      setFieldValue('type', value)

                      // type is reset, therefore set the category to default one of the selected type
                      if (value === 2) {
                        // ! category id 2 is default income
                        const filteredCategories = categoriesList.filter(
                          (category) => category.type === value,
                        )
                        setFieldValue('categoryId', filteredCategories[0]!.id)
                      }
                    }}
                  />
                </InputContainer>

                <Selector
                  list={categoriesList.filter((item) => item.type === values.type)}
                  value={values.categoryId}
                  onChange={(id) => {
                    setFieldValue('categoryId', id)
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
                onDone={handleSubmit}
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
  categoriesList: state.categories.list,
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
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
