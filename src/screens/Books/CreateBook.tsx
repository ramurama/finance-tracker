import { useState } from 'react'

import { Container } from '../../components'
import { InputField } from '../../components/atoms'
import { Header } from '../../components/fragments'
import { i18n } from '../../locales'

export const CreateBook = () => {
  const [bookName, setBookName] = useState<string>('Germany')

  return (
    <>
      <Container>
        <Header title={i18n.t('books.createBook')} backButton />
        <InputField
          label="Name"
          error="Enter a valid book name."
          isErrorVisible={true}
          placeholder="Book Name"
          value={bookName}
          onChange={(value) => {
            setBookName(value)
          }}
          keyboardType="default"
        />
      </Container>
    </>
  )
}
