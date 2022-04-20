import { RouterModule } from "@nestjs/core";
import { Exclude } from "class-transformer";
import { OrderEntity } from "src/order/entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column({unique:true})
    email:string;
    
    @Column(/* {select:false} */)
    password:string;

    @Column({type:'enum',enum:Role,default:Role.USER})
    role?:Role;

    @OneToMany(() => OrderEntity, (OrderEntity) => OrderEntity.user)
    orders: OrderEntity[];

}