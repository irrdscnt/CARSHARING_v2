import { IOrder } from "src/order/interface";
import { Role } from "../entity/role.enum";

export class User{
    id?:number;
    name?:string;
    email?:string;
    password?:string;
    orders?:IOrder[];
    role?:Role;
}