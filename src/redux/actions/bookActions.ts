import { BookEntity } from '../../db/entities/Book.entity'

export const SET_BOOKS = 'SET_BOOKS'

export const setBooks = (books: BookEntity[]) => ({
  type: SET_BOOKS,
  payload: books,
})
