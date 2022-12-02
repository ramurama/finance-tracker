import { useNavigation } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC, PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as yup from 'yup'

import { Container } from '../../components'
import { DatePickerHeader, Selector } from '../../components/fragments'
import { BookEntity } from '../../db/entities/Book.entity'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { AmountInput, Keyboard, NoBooks, TypeSelector } from './components'
import { NotesInput } from './components/NotesInput'
import { useCreateTransaction } from './useCreateTransaction'

export type CreateTransactionProps = {
  booksList: BookEntity[]
  categoriesList: CategoryEntity[]
}

const CreateTransaction: FC<CreateTransactionProps> = ({ booksList, categoriesList }) => {
  const { addListener } = useNavigation()

  const transactionValidationSchema = yup.object().shape({})

  const { initialValues, getBookById, submitHandler } = useCreateTransaction({ booksList })

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

                      // ! type is reset, therefore set the category to default one of the selected type
                      const filteredCategories = categoriesList
                        .filter((category) => category.type === value)
                        .sort((a, b) => a.id - b.id)

                      setFieldValue('categoryId', filteredCategories[0]!.id)
                    }}
                  />

                  <NotesInput
                    value={values.remarks}
                    onChange={(value) => {
                      setFieldValue('remarks', value)
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
                disabled={values.amount.length > 8}
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
