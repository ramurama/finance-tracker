import { Transaction } from '../types/Transaction'

export type CreateTransactionDto = Omit<Transaction, 'id'>
