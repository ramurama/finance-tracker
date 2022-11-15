import { useActionSheet } from '@expo/react-native-action-sheet'
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
  const { showActionSheetWithOptions } = useActionSheet()

  useEffect(() => {
    const loadBooks = async () => {
      // bookService.deleteBook(15)
      setBooks(await bookService.getBooks())
    }

    loadBooks()
  }, [bookService, setBooks])

  const longPressHandler = () => {
    const options = [
      i18n.t('common.delete'),
      i18n.t('common.edit'),
      i18n.t('books.defaultBook'),
      i18n.t('common.cancel'),
    ]
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 3

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 1:
            // edit
            break

          case 2:
            // make default book
            break

          case destructiveButtonIndex:
            // Delete
            break

          case cancelButtonIndex:
            // Canceled
            break
          default:
            break
        }
      },
    )
  }

  const Books = () => (
    <FlatList
      data={books}
      extraData={books}
      ListEmptyComponent={<Text>Empty</Text>}
      renderItem={({ item }) => (
        <BookItem
          key={item.id}
          title={item.name}
          currency={item.currencySymbol}
          isDefault={Boolean(item.isDefault)}
          onPress={() => {}}
          onLongPress={longPressHandler}
        />
      )}
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
