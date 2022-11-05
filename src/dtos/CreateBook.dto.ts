import { Book } from '../types/Book'

export type CreateBookDto = Omit<Book, 'id'>
