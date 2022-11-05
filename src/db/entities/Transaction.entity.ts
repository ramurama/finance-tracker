import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { TABLE_NAMES } from '../tableNames'
import { BookEntity } from './Book.entity'
import { CategoryEntity } from './Category.entity'

@Entity(TABLE_NAMES.TRANSACTIONS)
@Index(['book', 'type'])
@Index(['book', 'category']) // category already has `type` in it
export class TransactionEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  //  TODO: index type
  @Column({ type: 'integer', nullable: false })
  type!: number

  @Column({ nullable: false, type: 'float' })
  amount!: number

  @Column({ nullable: false, type: 'datetime' })
  date!: Date

  @ManyToOne(() => BookEntity, (book: BookEntity) => book)
  @Index()
  book!: BookEntity

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category)
  category!: CategoryEntity

  @Column({ nullable: true, type: 'text' })
  remarks!: string

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date
}
