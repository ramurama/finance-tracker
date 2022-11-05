import { DataSource, Repository } from 'typeorm'

import { config } from '../../config'
import { CreateTransactionDto, UpdateTransactionDto } from '../../dtos'
import { TransactionType } from '../../types/TransactionType'
import { getDateEndTime, getDateStartTime } from '../../utils'
import { TransactionEntity } from '../entities/Transaction.entity'
import { TABLE_NAMES } from '../tableNames'
import { QUERY_ORDER } from '../types'

const TRANSACTIONS = TABLE_NAMES.TRANSACTIONS

export class TransactionService {
  private readonly repository: Repository<TransactionEntity>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(TransactionEntity)
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const transaction = new TransactionEntity()

    const { date, amount, type, book, category, remarks } = createTransactionDto

    transaction.type = type
    transaction.date = date
    transaction.amount = amount
    transaction.book = book
    transaction.category = category

    if (remarks) {
      transaction.remarks = remarks
    }

    const { id } = await this.repository.save(transaction)

    return this.getTransactionById(id)
  }

  async updateTransaction(updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.repository.findOne({
      where: {
        id: updateTransactionDto.id,
      },
    })

    if (!transaction) {
      return null
    }

    const { amount, type, date, remarks, category, book } = updateTransactionDto

    transaction.amount = amount
    transaction.type = type
    transaction.date = date
    transaction.category = category
    transaction.book = book

    if (remarks) {
      transaction.remarks = remarks
    }

    const { id } = await this.repository.save(transaction)

    return this.getTransactionById(id)
  }

  async getTransactions(
    bookId: number,
    type?: TransactionType,
    order: QUERY_ORDER = 'DESC',
    offset?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const qb = this.repository
      .createQueryBuilder(TRANSACTIONS)
      .select(`${TRANSACTIONS}.id`)
      .addSelect(`${TRANSACTIONS}.type`)
      .addSelect(`${TRANSACTIONS}.amount`)
      .addSelect(`${TRANSACTIONS}.date`)
      .addSelect(`${TRANSACTIONS}.remarks`)
      .addSelect(`${TRANSACTIONS}.created`)
      .addSelect(`${TRANSACTIONS}.updated`)
      .where(`${TRANSACTIONS}.bookId = :bookId`, { bookId })

    if (type) {
      qb.andWhere(`${TRANSACTIONS}.type = :type`, {
        type,
      })
    }

    if (startDate) {
      qb.andWhere(`${TRANSACTIONS}.date >= :startDate`, { startDate: getDateStartTime(startDate) })
    }

    if (endDate) {
      qb.andWhere(`${TRANSACTIONS}.date <= :endDate`, { endDate: getDateEndTime(endDate) })
    }

    // ORDER BY transaction date
    qb.orderBy({ [`${TRANSACTIONS}.date`]: `${order}` }).limit(config.transactionsQueryLimit)

    if (offset) {
      qb.offset(offset)
    }

    return await qb.getMany()
  }

  async getTransactionsByCategory(
    bookId: number,
    categoryId: number,
    order: QUERY_ORDER = 'DESC',
    offset?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const qb = this.repository
      .createQueryBuilder(TRANSACTIONS)
      .select(`${TRANSACTIONS}.id`)
      .addSelect(`${TRANSACTIONS}.type`)
      .addSelect(`${TRANSACTIONS}.amount`)
      .addSelect(`${TRANSACTIONS}.date`)
      .addSelect(`${TRANSACTIONS}.remarks`)
      .addSelect(`${TRANSACTIONS}.created`)
      .addSelect(`${TRANSACTIONS}.updated`)
      .where(`${TRANSACTIONS}.bookId = :bookId`, { bookId })
      .andWhere(`${TRANSACTIONS}.categoryId = :categoryId`, {
        categoryId,
      })

    if (startDate) {
      qb.andWhere(`${TRANSACTIONS}.date >= :startDate`, { startDate: getDateStartTime(startDate) })
    }

    if (endDate) {
      qb.andWhere(`${TRANSACTIONS}.date <= :endDate`, { endDate: getDateEndTime(endDate) })
    }

    // ORDER BY transaction date
    qb.orderBy({ [`${TRANSACTIONS}.date`]: `${order}` })

    qb.limit(config.transactionsQueryLimit)

    if (offset) {
      qb.offset(offset)
    }

    return await qb.getMany()
  }

  async getTransactionById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: {
        book: true,
        category: true,
      },
    })
  }

  async getTotalValueOfTransactions(
    bookId: number,
    type: TransactionType,
    categoryId?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const qb = this.repository
      .createQueryBuilder(TRANSACTIONS)
      .select(`SUM(${TRANSACTIONS}).amount`, 'total')

    if (categoryId) {
      qb.addSelect(`${TRANSACTIONS}).categoryId`, 'categoryId')
    }

    qb.where(`${TRANSACTIONS}.bookId = :bookId`, { bookId }).andWhere(
      `${TRANSACTIONS}.type = :type`,
      {
        type,
      },
    )

    if (startDate) {
      qb.andWhere(`${TRANSACTIONS}.date >= :startDate`, { startDate: getDateStartTime(startDate) })
    }

    if (endDate) {
      qb.andWhere(`${TRANSACTIONS}.date <= :endDate`, { endDate: getDateEndTime(endDate) })
    }

    if (categoryId) {
      return await qb.groupBy(`${TRANSACTIONS}.categoryId`).getRawMany()
    }

    return await qb.getRawOne()
  }

  async deleteTransaction(id: number) {
    return await this.repository.delete({ id })
  }

  async deleteTransactionsByBook(bookId: number) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .from(TRANSACTIONS)
      .where(`${TRANSACTIONS}.bookId = :bookId`, { bookId })
      .execute()
  }

  async deleteTransactionsByCategory(categoryId: number) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .from(TRANSACTIONS)
      .where(`${TRANSACTIONS}.categoryId = :categoryId`, { categoryId })
      .execute()
  }
}
