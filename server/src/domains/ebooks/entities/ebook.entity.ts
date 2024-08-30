import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Section } from '../../sections/entities/section.entity';

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

  @OneToMany(() => Section, (section) => section.ebook)
  content: Section[];

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];
}
