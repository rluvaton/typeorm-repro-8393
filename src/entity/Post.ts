import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    // Extra, not required column just for the example
    @Column()
    title: string;

    @UpdateDateColumn()
    lastUpdated: Date;

    @Column({
        // Forcing this column to only be written on insert time
        update: false
    })
    readOnlyColumn: number;
}
