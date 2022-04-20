import { IsString } from "class-validator";

export class UpdateUserDto{
    id?:number;

    name?:string;

    email?: string;

    password?:string;
}