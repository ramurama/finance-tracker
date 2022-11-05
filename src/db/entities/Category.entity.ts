import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { TABLE_NAMES } from '../tableNames'

@Entity(TABLE_NAMES.CATEGORIES)
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ type: 'text' })
  name!: string

  @Column({ type: 'integer', nullable: false })
  type!: number

  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  updated!: Date
}
