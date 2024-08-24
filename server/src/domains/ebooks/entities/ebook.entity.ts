import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
  category: string[];
  @Column({ type: 'varchar', length: 50 })
  translator: string;
  @Column({ type: 'varchar', length: 50 })
  dateCreated: string;
  @Column({ type: 'int' })
  like: number;
  @Column({ type: 'int' })
  view: number;
  @Column({ type: 'varchar', length: 50 })
  content: string;
}
