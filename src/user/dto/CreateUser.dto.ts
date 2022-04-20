import { IsString } from "class-validator";
import { Role } from "../entity/role.enum";
import { LoginDto } from "./LoginUser.dto";

export class CreateUserDto extends LoginDto{
    
    id?:number;

    @IsString()
    name:string;

    @IsString()
    email: string;

    @IsString()
    password:string;

    // @IsString()
    role?:Role;

    
    // isAdmin:boolean;
}