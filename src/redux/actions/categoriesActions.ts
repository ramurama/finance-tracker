import { CategoryEntity } from '../../db/entities/Category.entity'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const setCategories = (categories: CategoryEntity[]) => ({
  type: SET_CATEGORIES,
  payload: categories,
})
