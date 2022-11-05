import { Book } from './Book'
import { Category } from './Category'
import { MetaData } from './MetaData'
import { TransactionType } from './TransactionType'

export interface Transaction extends MetaData {
  id: number
  date: Date
  type: TransactionType
  amount: number
  book: Book
  category: Category
  remarks?: string
}
