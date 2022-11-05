import { Transaction } from '../types/Transaction'

export type UpdateTransactionDto = Omit<Transaction, 'created' | 'updated'>
