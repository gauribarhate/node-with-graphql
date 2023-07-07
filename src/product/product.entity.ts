import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    descrioption: string;

    @Column()
    price: number;

    @Column()
    tags: string;

    @Column()
    brand: string;
}