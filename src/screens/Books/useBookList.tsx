import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation } from '@react-navigation/core'
import { useCallback, useEffect } from 'react'
import { Alert } from 'react-native'

import { BookEntity } from '../../db/entities/Book.entity'
import { useDB } from '../../db/useDB'
import { i18n } from '../../locales'
import { routes } from '../../navigation/routes'
import { BooksListProps } from './BookList'

export const useBookList = ({ setBooks }: Pick<BooksListProps, 'setBooks'>) => {
  const { navigate } = useNavigation()
  const { bookService } = useDB()
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

  const goToCreateMode = () => {
    navigate(routes.CREATE_BOOK)
  }

  const goToEditMode = (book: BookEntity) => {
    navigate(routes.CREATE_BOOK, {
      book: {
        id: book.id,
        name: book.name,
        currencyCode: book.currencyCode,
        currencySymbol: book.currencySymbol,
        isDefault: Boolean(book.isDefault),
        emoji: book.emoji,
      },
    })
  }

  const longPressHandler = (book: BookEntity) => {
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
            await makeBookDefault(book.id)
            break

          case destructiveButtonIndex:
            await deleteBook(book.id)
            break

          default:
            break
        }
      },
    )
  }

  return {
    longPressHandler,
    goToCreateMode,
  }
}
