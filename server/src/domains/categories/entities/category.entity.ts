import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('rowid') //
    id: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;
}
