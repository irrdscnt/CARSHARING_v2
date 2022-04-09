import { IOrder } from "src/order/interface";

export class User{
    id?:number;
    name?:string;
    email?:string;
    password?:string;
    orders?:IOrder[];
}