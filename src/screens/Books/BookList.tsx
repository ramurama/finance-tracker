import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { FC, useEffect } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Container } from '../../components'
import { Header } from '../../components/fragments'
import { BookEntity } from '../../db/entities/Book.entity'
import { useDb } from '../../db/useDb'
import { i18n } from '../../locales'
import { routes } from '../../navigation/routes'
import { setBooks as setBooksAction } from '../../redux/actions'
import { useTheme } from '../../theme'
import { BookItem } from './components/BookItem'

export type BooksListProps = {
  books: BookEntity[]
  setBooks: (books: BookEntity[]) => void
}

const BookList: FC<BooksListProps> = ({ books, setBooks }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { bookService } = useDb()

  useEffect(() => {
    const loadBooks = async () => {
      // bookService.deleteAllBooks()
      setBooks(await bookService.getBooks())
    }

    loadBooks()
  }, [bookService, setBooks])

  const Books = () => (
    <FlatList
      data={books}
      extraData={books}
      ListEmptyComponent={<Text>Empty</Text>}
      renderItem={({ item }) => {
        return (
          <BookItem
            key={item.id}
            title={item.name}
            currency={item.currencySymbol}
            onPress={() => {}}
            isDefault={Boolean(item.isDefault)}
          />
        )
      }}
    />
  )

  const AddBook = () => (
    <TouchableOpacity
      style={styles.iconTouchable}
      onPress={() => {
        navigation.navigate(routes.CREATE_BOOK)
      }}>
      <MaterialIcons name="add" size={24} color={colors.text} />
    </TouchableOpacity>
  )

  return (
    <Container>
      <Header title={i18n.t('books.books')} iconRight={<AddBook />} />
      <Books />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  books: state.books.list,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  dispatch,
  setBooks: (books: BookEntity[]) => dispatch(setBooksAction(books)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookList)

const styles = StyleSheet.create({
  iconTouchable: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
})
