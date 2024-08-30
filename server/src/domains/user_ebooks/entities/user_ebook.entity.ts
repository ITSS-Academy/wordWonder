import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ebook } from '../../ebooks/entities/ebook.entity';
import { Min } from 'class-validator';

export enum ReadingStatus {
  READING = 'READING',
  READ = 'READ',
  TO_READ = 'TO_READ',
}

@Entity()
export class UserEbook {
  @PrimaryColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn({ name: 'ebookId' })
  @ManyToOne(() => Ebook, (ebook) => ebook.id, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ebookId' })
  ebook: Ebook;

  @Column({
    type: 'enum',
    enum: ReadingStatus,
    default: ReadingStatus.TO_READ,
  })
  readingStatus: string;

  @Column({ type: 'timestamp' }) //ngày lần đầu tiên bấm vào đọc cuốn sách
  purchaseDate: string;

  @Column({ type: 'timestamp', nullable: true }) //ngày lần cuối cùng đọc cuốn sách
  lastReadDate: string;

  @Column({ default: false })
  isLiked: boolean;

  @Column({ default: 0 })
  @Min(0)
  lastSection: number;
}
