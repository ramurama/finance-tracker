import { combineReducers } from 'redux'

import { booksReducer } from './booksReducer'
import { categoriesReducer } from './categoriesReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
  categories: categoriesReducer,
})
