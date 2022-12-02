import { useNavigation } from '@react-navigation/core'
import { useCallback, useEffect } from 'react'

import { CreateTransactionProps, ValuesType } from './CreateTransaction'

export type UseTransactionProps = Pick<CreateTransactionProps, 'booksList'> & {
  initialValues: ValuesType
}

export const useCreateTransaction = ({ booksList, initialValues }: UseTransactionProps) => {
  const { navigate } = useNavigation()

  const getDefaultBook = useCallback(() => {
    if (booksList.length > 0) {
      return booksList.filter((bookElement) => bookElement.isDefault)[0]
    }

    return
  }, [booksList])

  const getBookById = useCallback(
    (id: number) => booksList.filter((item) => item.id === id)[0],
    [booksList],
  )

  // ! update bookId on load
  useEffect(() => {
    const defaultBook = getDefaultBook()
    initialValues.bookId = defaultBook?.id || 0
    initialValues.currency = defaultBook?.currencySymbol || ''
  }, [booksList, getDefaultBook, initialValues, navigate])

  return {
    getBookById,
  }
}
