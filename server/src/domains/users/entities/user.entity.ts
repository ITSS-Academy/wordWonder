import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  nickName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    default: '',
  })
  password: string;

  @Column({
    default: '',
  })
  phoneNumber: string;

  @Column({ default: '' })
  photoURL: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: string;

  @Column({ type: 'timestamp' })
  joinedDate: string;

  @Column({ default: true })
  isActive: boolean;
}
