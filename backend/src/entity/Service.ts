import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm'
import { Category } from './Category'

@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('decimal', { precision: 8, scale: 2 })
  price: number

  @ManyToOne(() => Category, (category) => category.services, {
    cascade: true,
  })
  category: Category
}
