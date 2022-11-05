import { Category } from '../types/Category'

export type CreateCategoryDto = Omit<Category, 'id'>
