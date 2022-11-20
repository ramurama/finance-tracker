import { Formik } from 'formik'
import * as yup from 'yup'

import { Container } from '../../components'
import { DatePickerHeader } from '../../components/fragments/DatePickerHeader'
import { getDatePickerFormattedDate } from '../../utils'

type ValuesType = {
  date: string
}

export const CreateTransactions = () => {
  const transactionValidationSchema = yup.object().shape({})

  const initialValues: ValuesType = {
    date: getDatePickerFormattedDate(new Date()),
  }

  const submitHandler = ({ date }: ValuesType) => {
    console.log(date)
  }

  return (
    <Container>
      <Formik
        validationSchema={transactionValidationSchema}
        initialValues={initialValues}
        onSubmit={submitHandler}>
        {({ setFieldValue, values }) => (
          <>
            <DatePickerHeader
              value={values.date}
              onChange={(dateString) => setFieldValue('date', dateString)}
            />
          </>
        )}
      </Formik>
    </Container>
  )
}
