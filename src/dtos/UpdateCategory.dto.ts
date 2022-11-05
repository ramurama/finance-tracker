import { Category } from '../types/Category'

export type UpdateCategoryDto = Omit<Category, 'created' | 'updated'>
