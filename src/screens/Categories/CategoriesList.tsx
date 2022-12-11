import { FC } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { HeaderAddButton } from '../../components/atoms'
import { Header } from '../../components/molecules'
import { CategoryEntity } from '../../db/entities/Category.entity'
import { i18n } from '../../locales'
import { setCategories as setCategoriesAction } from '../../redux/actions'
import { TransactionType } from '../../types'
import { CategoryItem, EmptyCategories, Filters } from './components'
import { useCategoriesList } from './useCategoriesList'

export type CategoriesListProps = {
  categories: CategoryEntity[]
  setCategories: (categories: CategoryEntity[]) => void
}

const CategoriesList: FC<CategoriesListProps> = ({ categories, setCategories }) => {
  const {
    activeType,
    setActiveType,
    longPressHandler,
    goToCreateCategory,
    onSwipeLeft,
    onSwipeRight,
  } = useCategoriesList({
    setCategories,
  })

  const Categories = () => (
    <FlatList
      data={categories.filter((item) => item.type === activeType)}
      extraData={categories}
      ListEmptyComponent={<EmptyCategories activeType={activeType} />}
      keyExtractor={(item) => item.id.toString()}
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

  const AddCategories = () => <HeaderAddButton onPress={goToCreateCategory} />

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 80,
      }}
      style={styles.gestureContainer}>
      <Container>
        <Header title={i18n.t('categories.categories')} iconRight={<AddCategories />} />
        <Filters
          value={activeType}
          onChange={(type) => {
            setActiveType(type)
          }}
        />

        <Categories />
      </Container>
    </GestureRecognizer>
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

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
})
