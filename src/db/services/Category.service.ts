import { DataSource, Repository } from 'typeorm'

import { CreateCategoryDto, UpdateCategoryDto } from '../../dtos'
import { TransactionType } from '../../types/TransactionType'
import { CategoryEntity } from '../entities/Category.entity'

export class CategoryService {
  private readonly repository: Repository<CategoryEntity>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(CategoryEntity)
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = new CategoryEntity()

    const { name, type, emoji } = createCategoryDto

    category.name = name
    category.type = type
    category.emoji = emoji

    await this.repository.save(category)

    return await this.getCategories()
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repository.findOne({ where: { id: updateCategoryDto.id } })

    if (!category) {
      return
    }

    const { name, type, emoji } = updateCategoryDto

    category.name = name
    category.type = type
    category.emoji = emoji

    await this.repository.save(category)

    return await this.getCategories()
  }

  async getCategories(type?: TransactionType) {
    if (type) {
      return await this.repository.find({
        where: {
          type,
        },
      })
    }

    return await this.repository.find()
  }

  async getCategoryById(id: number) {
    return await this.repository.findOneBy({ id })
  }

  async deleteCategory(id: number) {
    return await this.repository.delete({ id })
  }
}
