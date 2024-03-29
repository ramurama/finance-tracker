import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { TransactionType } from '../../types'
import { TABLE_NAMES } from '../tableNames'

@Entity(TABLE_NAMES.CATEGORIES)
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'integer' })
  type!: TransactionType

  @Column({ type: 'text' })
  emoji!: string

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date
}
