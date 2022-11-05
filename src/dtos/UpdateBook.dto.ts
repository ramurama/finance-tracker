import { Book } from '../types/Book'

export type UpdateBookDto = Omit<Book, 'created' | 'updated'>
