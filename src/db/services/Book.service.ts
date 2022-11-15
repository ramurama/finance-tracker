import { DataSource, Repository } from 'typeorm'

import { CreateBookDto, UpdateBookDto } from '../../dtos'
import { BookEntity } from '../entities/Book.entity'

export class BookService {
  private readonly repository: Repository<BookEntity>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(BookEntity)
  }

  async createBook(createBookDto: CreateBookDto) {
    const book = new BookEntity()

    const { name, currencyCode, currencySymbol, isDefault } = createBookDto

    book.name = name
    book.currencyCode = currencyCode
    book.currencySymbol = currencySymbol
    book.isDefault = Number(isDefault)

    return await this.repository.save(book)
  }

  async updateBook(updateBookDto: UpdateBookDto) {
    const book = await this.repository.findOne({
      where: {
        id: updateBookDto.id,
      },
    })

    if (!book) {
      return null
    }

    const { name, currencyCode, currencySymbol, isDefault } = updateBookDto

    book.name = name
    book.currencyCode = currencyCode
    book.currencySymbol = currencySymbol
    book.isDefault = Number(isDefault)

    return this.repository.save(book)
  }

  async getBooks() {
    return await this.repository.find()
  }

  async getBookById(id: number) {
    return await this.repository.findOne({
      where: {
        id,
      },
    })
  }

  async deleteBook(id: number) {
    return await this.repository.delete({ id })
  }
}
