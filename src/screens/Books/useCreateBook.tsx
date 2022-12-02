import { useNavigation, useRoute } from '@react-navigation/core'
import * as yup from 'yup'

import { BookEntity } from '../../db/entities/Book.entity'
import { useDB } from '../../db/useDB'
import { i18n } from '../../locales'
import { Book } from '../../types'
import { capitalizeFirstLetter } from '../../utils'
import { BookEmojis } from './components'
import { CreateBookProps } from './CreateBook'

export type CreateBookValuesType = {
  bookName: string
  emoji: string
  currencyCode: string
  currencySymbol: string
  isDefault: boolean
}

export const useCreateBook = ({ books, setBooks }: CreateBookProps) => {
  const { goBack } = useNavigation()
  const { params } = useRoute()

  const initialValues: CreateBookValuesType = {
    bookName: '',
    emoji: BookEmojis[0]!,
    currencyCode: 'USD',
    currencySymbol: '$',
    isDefault: false,
  }

  const isEditMode = params && params.book && params.book.id

  if (isEditMode) {
    const { name, currencyCode, currencySymbol, isDefault, emoji } = params.book as Book

    initialValues.bookName = name
    initialValues.currencyCode = currencyCode
    initialValues.currencySymbol = currencySymbol
    initialValues.isDefault = isDefault
    initialValues.emoji = emoji
  }

  const bookValidationSchema = yup.object().shape({
    bookName: yup.string().required(i18n.t('books.errorBookName')),
    currencyCode: yup.string().required(),
    currencySymbol: yup.string().required(),
    isDefault: yup.boolean().default(false),
  })

  const { bookService } = useDB()

  const submitHandler = async ({
    bookName,
    emoji,
    currencyCode,
    currencySymbol,
    isDefault,
  }: CreateBookValuesType) => {
    let booksList: BookEntity[] | undefined

    const name = capitalizeFirstLetter(bookName.trim())

    if (isEditMode) {
      booksList = await bookService.updateBook({
        id: params.book.id,
        name,
        emoji,
        currencyCode,
        currencySymbol,
        isDefault,
      })
    } else {
      booksList = await bookService.createBook({
        name,
        emoji,
        currencyCode,
        currencySymbol,
        isDefault: books.length === 0 ? true : isDefault,
      })
    }

    if (booksList) {
      setBooks(booksList)
    }

    goBack()
  }

  return {
    initialValues,
    isEditMode,
    bookValidationSchema,
    submitHandler,
  }
}
