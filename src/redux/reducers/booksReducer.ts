import { PURGE } from 'redux-persist/es/constants'

import { BookEntity } from '../../db/entities/Book.entity'
import { SET_BOOKS } from '../actions'
import { ReduxAction } from '../actionType'

type BooksReducer = {
  list: BookEntity[]
  isLoading: boolean
}

const initialState: BooksReducer = {
  list: [],
  isLoading: false,
}

export const booksReducer = (state = initialState, action: ReduxAction<BookEntity[] | boolean>) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        list: action.payload,
      }
    case PURGE:
      return initialState
    default:
      return state
  }
}
