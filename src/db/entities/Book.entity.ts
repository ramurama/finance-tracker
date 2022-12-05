import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { TABLE_NAMES } from '../tableNames'

// TODO: add balance field to the book

@Entity(TABLE_NAMES.BOOKS)
export class BookEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'text' })
  emoji!: string

  @Column({ type: 'text' })
  currencyCode!: string

  @Column({ type: 'text' })
  currencySymbol!: string

  @Column({ type: 'integer', nullable: false })
  isDefault!: number

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date
}
