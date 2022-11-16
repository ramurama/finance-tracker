import { Container } from '../../components'
import { Header } from '../../components/fragments'
import { i18n } from '../../locales'

const CreateCategories = () => {
  return (
    <Container>
      <Header title={i18n.t('categories.createCategory')} backButton />
    </Container>
  )
}

export default CreateCategories
