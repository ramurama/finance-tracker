import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation } from '@react-navigation/core'
import { FC, useCallback, useEffect } from 'react'
import { Alert, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { HeaderAddButton } from '../../components/atoms'
import { Header } from '../../components/molecules'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { useDb } from '../../db/useDb'
import { i18n } from '../../locales'
import { routes } from '../../navigation/routes'
import { setCategories as setCategoriesAction } from '../../redux/actions'
import { TransactionType } from '../../types'
import { CategoryItem } from './components/CategoryItem'
import { EmptyCategories } from './components/EmptyCategories'

export type CategoriesListProps = {
  categories: CategoryEntity[]
  setCategories: (categories: CategoryEntity[]) => void
}

const CategoriesList: FC<CategoriesListProps> = ({ categories, setCategories }) => {
  const { navigate } = useNavigation()
  const { categoryService } = useDb()
  const { showActionSheetWithOptions } = useActionSheet()

  const loadCategories = useCallback(async () => {
    setCategories(await categoryService.getCategories())
  }, [categoryService, setCategories])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const goToEditMode = (category: CategoryEntity) => {
    navigate(routes.CREATE_CATEGORY, {
      category: {
        id: category.id,
        name: category.name,
        emoji: category.emoji,
        type: category.type,
      },
    })
  }

  const deleteCategory = (categoryId: number) => {
    Alert.alert(i18n.t('common.caution'), i18n.t('categories.deleteCategoryConfirmation'), [
      {
        text: i18n.t('common.yes'),
        onPress: async () => {
          await categoryService.deleteCategory(categoryId)
          await loadCategories()
        },
      },
      {
        text: i18n.t('common.no'),
      },
    ])
  }

  const longPressHandler = (category: CategoryEntity) => {
    const options = [i18n.t('common.delete'), i18n.t('common.edit'), i18n.t('common.cancel')]
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      async (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 1:
            goToEditMode(category)
            break

          case destructiveButtonIndex:
            await deleteCategory(category.id)
            break

          default:
            break
        }
      },
    )
  }

  const Categories = () => (
    <FlatList
      data={categories}
      extraData={categories}
      ListEmptyComponent={<EmptyCategories />}
      renderItem={({ item }) => (
        <CategoryItem
          name={item.name}
          type={item.type as TransactionType}
          emoji={item.emoji}
          onPress={() => {}}
          onLongPress={() => longPressHandler(item)}
        />
      )}
    />
  )

  const AddCategories = () => (
    <HeaderAddButton
      onPress={() => {
        navigate(routes.CREATE_CATEGORY)
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
