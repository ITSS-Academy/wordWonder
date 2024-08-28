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
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  translator: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  view: number;

  @Column()
  content: string;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];
}
