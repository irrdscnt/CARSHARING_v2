import { IsString } from "class-validator";
import { LoginDto } from "./LoginUser.dto";

export class CreateUserDto extends LoginDto{
    
    id?:number;

    @IsString()
    name:string;

    @IsString()
    email: string;

    @IsString()
    password:string;
}