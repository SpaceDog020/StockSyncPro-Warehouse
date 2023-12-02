import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["name"])
export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;
}

@Entity()
@Unique(["idProduct", "idWH"])
export class WarehouseProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idProduct: number;

    @Column()
    idWH: number;

    @Column()
    stock: number;
}