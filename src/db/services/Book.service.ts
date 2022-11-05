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

    const { name, currency } = createBookDto

    book.name = name
    book.currency = currency

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

    const { name, currency } = updateBookDto

    book.name = name
    book.currency = currency

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
