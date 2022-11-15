import { Formik } from 'formik'
import * as yup from 'yup'

import { Container } from '../../components'
import { Button, InputField } from '../../components/atoms'
import { Header } from '../../components/fragments'
import { i18n } from '../../locales'

export const CreateBook = () => {
  const bookValidationSchema = yup.object().shape({
    bookName: yup.string().required(i18n.t('books.errorBookName')),
  })

  return (
    <>
      <Container>
        <Header title={i18n.t('books.createBook')} backButton />

        <Formik
          validationSchema={bookValidationSchema}
          initialValues={{ bookName: '' }}
          onSubmit={(values) => console.log(values)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
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
              <Button label={i18n.t('books.create')} onPress={handleSubmit} disabled={!isValid} />
            </>
          )}
        </Formik>
      </Container>
    </>
  )
}
