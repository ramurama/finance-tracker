import { Container } from '../../components'
import { Header } from '../../components/fragments'
import { i18n } from '../../locales'

export const CreateBook = () => {
  return (
    <>
      <Container>
        <Header title={i18n.t('books.createBook')} backButton />
      </Container>
    </>
  )
}
