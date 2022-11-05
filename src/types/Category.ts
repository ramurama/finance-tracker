import { MetaData } from './MetaData'
import { TransactionType } from './TransactionType'

export interface Category extends MetaData {
  id: number
  name: string
  type: TransactionType
}
