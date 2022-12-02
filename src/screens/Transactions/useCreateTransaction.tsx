import { useNavigation } from '@react-navigation/core'
import { useCallback, useEffect } from 'react'

import { TransactionType } from '../../types'
import { getDatePickerFormattedDate } from '../../utils'
import { CreateTransactionProps } from './CreateTransaction'

export type CreateTransactionValuesType = {
  date: string
  datePickerVisible: boolean
  bookId: number
  categoryId: number
  currency: string
  amount: string
  type: TransactionType
  remarks: string
}

// TODO: one default category for expense should be added during app init (id 1)
// TODO: one default category for income should be added during app init (id 2)

const initialValues: CreateTransactionValuesType = {
  date: getDatePickerFormattedDate(new Date()),
  datePickerVisible: false,
  bookId: 0, // ! bookId should not be 0 after loading
  categoryId: 1, // ! category id 1 is default expense
  currency: '',
  amount: '0',
  type: 1,
  remarks: '',
}

export type UseTransactionProps = Pick<CreateTransactionProps, 'booksList'>

export const useCreateTransaction = ({ booksList }: UseTransactionProps) => {
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
  }, [booksList, getDefaultBook, navigate])

  const submitHandler = ({
    date,
    amount,
    bookId,
    type,
    categoryId,
    remarks,
  }: CreateTransactionValuesType) => {
    console.log(date, amount, bookId, type)
    console.log(categoryId)
    console.log(remarks)

    // TODO: validate and submit data
  }

  return {
    initialValues,
    getBookById,
    submitHandler,
  }
}
