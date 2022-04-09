import { OrderEntity } from "src/order/entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarEntity {
    @PrimaryGeneratedColumn('increment')
    carId?:number;

    @Column()
    brand:string;

    @Column()
    model:string;

    @Column()
    carNum:string;

    @Column()
    VIN:string;

    @OneToMany(() => OrderEntity, (order) => order.orderId) 
    orders: OrderEntity[]

}