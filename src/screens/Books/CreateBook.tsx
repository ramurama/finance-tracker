import { Formik } from 'formik'
import { StyleSheet } from 'react-native'
import * as yup from 'yup'

import { Container } from '../../components'
import { Button } from '../../components/atoms'
import { Checkbox, Header, InputField } from '../../components/fragments'
import { i18n } from '../../locales'
import { CurrencyPicker } from './components/CurrencyPicker'

export const CreateBook = () => {
  const initialValues = { bookName: '', currencyCode: '', currencySymbol: '', isDefault: false }

  const bookValidationSchema = yup.object().shape({
    bookName: yup.string().required(i18n.t('books.errorBookName')),
    currencyCode: yup.string().required(),
    currencySymbol: yup.string().required(),
    isDefault: yup.boolean().default(false),
  })

  return (
    <Container>
      <Header title={i18n.t('books.createBook')} backButton />

      <Formik
        validationSchema={bookValidationSchema}
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}>
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
              autoFocus
            />

            <CurrencyPicker
              value={values.currencyCode}
              onChange={(code, symbol) => {
                setFieldValue('currencyCode', code)
                setFieldValue('currencySymbol', symbol)
              }}
            />

            <Checkbox
              label="Default"
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
    </Container>
  )
}

const styles = StyleSheet.create({
  createButton: {
    position: 'absolute',
    bottom: 0,
    width: '95%',
  },
})
