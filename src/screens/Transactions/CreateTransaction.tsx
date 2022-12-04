import { useNavigation } from '@react-navigation/core'
import { Formik } from 'formik'
import { FC, PropsWithChildren } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { DatePickerHeader, Selector } from '../../components/fragments'
import { BookEntity } from '../../db/entities/Book.entity'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { NoBooks, TransactionMainInputs } from './components'
import { FeedbackAnimated } from './components/FeedbackAnimated'
import { useCreateTransaction } from './useCreateTransaction'

export type CreateTransactionProps = {
  booksList: BookEntity[]
  categoriesList: CategoryEntity[]
}

const CreateTransaction: FC<CreateTransactionProps> = ({ booksList, categoriesList }) => {
  const { addListener } = useNavigation()

  const {
    initialValues,
    transactionValidationSchema,
    getBookById,
    submitHandler,
    showDone,
    goBack,
    resetDoneFeedback,
  } = useCreateTransaction({ booksList })

  const InnerContainer = (props: PropsWithChildren) => (
    <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
      {props.children}
    </KeyboardAvoidingView>
  )

  const ContentContainer = (props: PropsWithChildren) => (
    <View style={styles.contentContainer}>{props.children}</View>
  )

  const trimAmount = (value: string, cb: (amount: string) => void) => {
    // ! this logic is to ensure that there is only one decimal point at any time
    if (value.indexOf('.') !== -1) {
      const split = value.split('.')

      if (split.length <= 2) {
        cb(value)
      }
    } else if (value.indexOf(',') !== -1) {
      const split = value.split(',')

      if (split.length <= 2) {
        cb(value)
      }
    } else {
      cb(value)
    }
  }

  const CreateTransactionForm = () => (
    <Formik
      validationSchema={transactionValidationSchema}
      initialValues={initialValues}
      onSubmit={submitHandler}>
      {({ setFieldValue, values, resetForm, handleSubmit, isValid }) => {
        // reset form on user navigating to other screen
        addListener('focus', () => {
          resetForm()
          resetDoneFeedback()
        })

        const isAmountExists = values.amount === '0' || values.amount === ''

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

                <TransactionMainInputs
                  currency={values.currency}
                  amount={values.amount}
                  onChangeAmount={(value) => {
                    trimAmount(value, (amount) => {
                      setFieldValue('amount', amount)
                    })
                  }}
                  notes={values.remarks}
                  onChangeNotes={(value: string) => {
                    setFieldValue('remarks', value)
                  }}
                  type={values.type}
                  onChangeType={(value) => {
                    setFieldValue('type', value)

                    // ! type is reset, therefore set the category to default one of the selected type
                    const filteredCategories = categoriesList
                      .filter((category) => category.type === value)
                      .sort((a, b) => a.id - b.id)

                    setFieldValue('categoryId', filteredCategories[0]!.id)
                  }}
                />

                <Selector
                  list={categoriesList.filter((item) => item.type === values.type)}
                  value={values.categoryId}
                  onChange={(id) => {
                    setFieldValue('categoryId', id)
                  }}
                />

                <Button
                  label="Done"
                  onPress={handleSubmit}
                  disabled={isAmountExists || !isValid}
                  fullWidth
                  doneButton
                />
              </ContentContainer>
            </InnerContainer>
          </>
        )
      }}
    </Formik>
  )

  return (
    <Container noDismissKeyboard>
      {showDone ? (
        <FeedbackAnimated onFeedbackEnd={goBack} />
      ) : (
        booksList.length > 0 && <CreateTransactionForm />
      )}
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
})
