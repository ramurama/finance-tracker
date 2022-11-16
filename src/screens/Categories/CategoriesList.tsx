import { useNavigation } from '@react-navigation/core'

import { Container } from '../../components'
import { HeaderAddButton } from '../../components/atoms/HeaderAddButton'
import { Header } from '../../components/fragments'
import { i18n } from '../../locales'
import { routes } from '../../navigation/routes'

const CategoriesList = () => {
  const { navigate } = useNavigation()

  const AddCategories = () => (
    <HeaderAddButton
      onPress={() => {
        navigate(routes.CREATE_CATEGORIES)
      }}
    />
  )

  return (
    <Container>
      <Header title={i18n.t('categories.categories')} iconRight={<AddCategories />} />
    </Container>
  )
}

export default CategoriesList
