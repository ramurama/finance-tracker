import { createContext } from 'react'

import { BookService, CategoryService } from './services'
import { TransactionService } from './services/Transaction.service'

export interface DBConnectionContextData {
  bookService: BookService
  categoryService: CategoryService
  transactionService: TransactionService
}

export const DBConnectionContext = createContext<DBConnectionContextData>(
  {} as DBConnectionContextData,
)
