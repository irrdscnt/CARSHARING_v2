import { CarEntity } from "src/car/entity";
import { UserEntity } from "src/user/entity";
import { User } from "src/user/interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    orderId?:string; 

    // @Column()
    // user:User;

    @Column({nullable:true})
    tariff?:number;

    @Column({nullable:true})
    wholekm?:number;

    @Column({type:'text'})
    name:string;

    @Column()
    phone:string;

    @CreateDateColumn()
    startDate:Date;

    @CreateDateColumn({default:'2022-02-01T00:00:00.000Z'})
    endDate?:Date;

    // @Column()
    // userID:number;

    @Column()
    carId:number;

    @Column({nullable:true})
    totalPrice?:number; 

    @ManyToOne(() => CarEntity, (car) => car.orders)
    @JoinColumn()
    car: CarEntity

    @ManyToOne(()=> UserEntity,(userEntity)=>userEntity.orders)
    @JoinColumn()
    user:UserEntity;
   

    
    
}