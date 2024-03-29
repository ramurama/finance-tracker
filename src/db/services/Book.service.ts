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

    const { name, emoji, currencyCode, currencySymbol, isDefault } = createBookDto

    book.name = name
    book.emoji = emoji
    book.currencyCode = currencyCode
    book.currencySymbol = currencySymbol
    book.isDefault = Number(isDefault)

    //reset isDefault in all the other books if isDefault for the current book is true
    if (isDefault) {
      await this.updateIsDefaultInBooks()
    }

    await this.repository.save(book)

    return await this.getBooks()
  }

  async updateBook(updateBookDto: UpdateBookDto) {
    const book = await this.repository.findOne({
      where: {
        id: updateBookDto.id,
      },
    })

    if (!book) {
      return
    }

    const { name, emoji, currencyCode, currencySymbol, isDefault } = updateBookDto

    book.name = name
    book.emoji = emoji
    book.currencyCode = currencyCode
    book.currencySymbol = currencySymbol
    book.isDefault = Number(isDefault)

    //reset isDefault in all the other books if isDefault for the current book is true
    if (isDefault) {
      await this.updateIsDefaultInBooks()
    }

    await this.repository.save(book)

    return await this.getBooks()
  }

  async getBooks() {
    return await this.repository.find({
      order: {
        isDefault: 'DESC',
      },
    })
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

  async updateIsDefaultInBooks() {
    const book = await this.repository.findOne({
      where: {
        isDefault: 1,
      },
    })

    if (!book) {
      return
    }

    book.isDefault = 0

    await this.repository.save(book)
  }

  async makeBookDefault(id: number) {
    const book = await this.repository.findOne({
      where: {
        id,
      },
    })

    if (!book) {
      return
    }

    // reset the default book
    await this.updateIsDefaultInBooks()

    book.isDefault = 1

    await this.repository.save(book)
  }
}
