import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Ebook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  imageUrl: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  author: string;

  @Column({ type: 'varchar', length: 50 })
  translator: string;

  @Column({ type: 'int' })
  like: number;

  @Column({ type: 'int' })
  view: number;

  @Column({ type: 'varchar', length: 50 })
  content: string;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];
}
