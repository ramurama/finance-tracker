import { PURGE } from 'redux-persist/es/constants'

import { CategoryEntity } from '../../db/entities/Category.entity'
import { SET_CATEGORIES } from '../actions'
import { ReduxAction } from '../actionType'

type CategoriesReducer = {
  list: CategoryEntity[]
  isLoading: boolean
}

const initialState: CategoriesReducer = {
  list: [],
  isLoading: false,
}

export const categoriesReducer = (
  state = initialState,
  action: ReduxAction<CategoryEntity[] | boolean>,
) => {
  switch (action.type) {
    case SET_CATEGORIES:
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
