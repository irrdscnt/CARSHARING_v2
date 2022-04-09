import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateCarDto{
    @ApiPropertyOptional({
        description: 'Car ID',
        example: '1',
    })
    carId?:number;

    @ApiProperty({
        description: 'Car brand',
        example: 'Hyundai',
    })
    @IsNotEmpty()
    @Length(1,20)
    brand:string;

    @ApiProperty({
        description: 'Car model',
        example: 'Elantra',
    })
    @IsNotEmpty()
    @Length(1, 20)
    model:string;

    @ApiProperty({
        description: 'Car number',
        example: '01KG500AAA',
    })
    @IsNotEmpty()
    @Length(10)
    carNum:string;

    @ApiProperty({
        description: 'Vehicle Identification Number',
        example: '5NPDH4AE0DH213924',
    })
    @IsNotEmpty()
    @Length(17)
    VIN:string;
}