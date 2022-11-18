import { useNavigation } from '@react-navigation/core'
import { FC, useCallback, useEffect } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { HeaderAddButton } from '../../components/atoms'
import { Header } from '../../components/fragments'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { useDb } from '../../db/useDb'
import { i18n } from '../../locales'
import { routes } from '../../navigation/routes'
import { setCategories as setCategoriesAction } from '../../redux/actions'
import { EmptyCategories } from './components/EmptyCategories'

export type CategoriesListProps = {
  categories: CategoryEntity[]
  setCategories: (categories: CategoryEntity[]) => void
}

const CategoriesList: FC<CategoriesListProps> = ({ categories, setCategories }) => {
  const { navigate } = useNavigation()
  const { categoryService } = useDb()

  const loadCategories = useCallback(async () => {
    setCategories(await categoryService.getCategories())
  }, [categoryService, setCategories])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const Categories = () => (
    <FlatList
      data={categories}
      extraData={categories}
      ListEmptyComponent={<EmptyCategories />}
      renderItem={({ item }) => {
        console.log(item)

        return <></>
      }}
    />
  )

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
      <Categories />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  categories: state.categories.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
  setCategories: (categories: CategoryEntity[]) => dispatch(setCategoriesAction(categories)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList)
