import { User } from "src/user/interface";

export class IOrder{
    orderId?:string;
    name: string;
    user?:User;
    phone: string;
    startDate: Date;
    endDate?: Date;
    carId: number;
    totalPrice?: number;
    tariff?:number;
} 