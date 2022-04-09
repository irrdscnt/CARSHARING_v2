import { CarEntity } from "src/car/entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    orderId?:string; 

    @Column({nullable:true})
    tariff?:number;

    @Column({type:'text'})
    name:string;

    @Column()
    phone:string;

    @CreateDateColumn()
    startDate:Date;

    @CreateDateColumn({default:'2022-02-01T00:00:00.000Z'})
    endDate?:Date;

    @Column()
    carId:number;

    // @Column({nullable:true})
    // brand?:string;

    // @Column({nullable: true})
    // model?:string;

    // @Column({nullable:true})
    // carNum?:string;

    // @Column({nullable:true})
    // VIN?:string;

    @Column({nullable:true})
    totalPrice?:number;

    @ManyToOne(() => CarEntity, (car) => car.orders)
    @JoinColumn()
    car: CarEntity
   

    
    
}