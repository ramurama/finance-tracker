import { useActionSheet } from '@expo/react-native-action-sheet'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { FC, useCallback, useEffect } from 'react'
import { Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
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
import { EmptyBooks } from './components/EmptyBooks'

export type BooksListProps = {
  books: BookEntity[]
  setBooks: (books: BookEntity[]) => void
}

const BookList: FC<BooksListProps> = ({ books, setBooks }) => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const { bookService } = useDb()
  const { showActionSheetWithOptions } = useActionSheet()

  const loadBooks = useCallback(async () => {
    setBooks(await bookService.getBooks())
  }, [bookService, setBooks])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  const deleteBook = (bookId: number) => {
    Alert.alert(i18n.t('common.caution'), i18n.t('books.deleteBookConfirmation'), [
      {
        text: i18n.t('common.yes'),
        onPress: async () => {
          await bookService.deleteBook(bookId)
          await loadBooks()
        },
      },
      {
        text: i18n.t('common.no'),
      },
    ])
  }

  const makeBookDefault = async (bookId: number) => {
    await bookService.makeBookDefault(bookId)
    await loadBooks()
  }

  const goToEditMode = (book: BookEntity) => {
    navigate(routes.CREATE_BOOK, {
      book: {
        id: book.id,
        name: book.name,
        currencyCode: book.currencyCode,
        currencySymbol: book.currencySymbol,
        isDefault: Boolean(book.isDefault),
      },
    })
  }

  const longPressHandler = (bookId: number, book: BookEntity) => {
    const options = [
      i18n.t('common.delete'),
      i18n.t('common.edit'),
      i18n.t('books.defaultBook'),
      i18n.t('common.cancel'),
    ]
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 3
    const disabledButtonIndices = book.isDefault ? [0] : []

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex, disabledButtonIndices },
      async (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 1:
            goToEditMode(book)
            break

          case 2:
            await makeBookDefault(bookId)
            break

          case destructiveButtonIndex:
            await deleteBook(bookId)
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
      ListEmptyComponent={<EmptyBooks />}
      renderItem={({ item }) => (
        <BookItem
          key={item.id}
          title={item.name}
          currency={item.currencySymbol}
          isDefault={Boolean(item.isDefault)}
          onPress={() => {}}
          onLongPress={() => longPressHandler(item.id, item)}
        />
      )}
    />
  )

  const AddBook = () => (
    <TouchableOpacity
      style={styles.iconTouchable}
      onPress={() => {
        navigate(routes.CREATE_BOOK)
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
