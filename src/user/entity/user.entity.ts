import { Exclude } from "class-transformer";
import { OrderEntity } from "src/order/entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column({unique:true})
    email:string;
    
    @Column({select:false})
    password:string;

    @OneToMany(() => OrderEntity, (OrderEntity) => OrderEntity.user)
    orders: OrderEntity[];

}