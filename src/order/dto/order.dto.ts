import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { User } from "src/user/interface";

export class CreateOrderDto{
    @ApiPropertyOptional({
        description:'Order ID',
        example:'1fdd99f2-e420-401d-8fd5-77a050f9b51e'
    })
    orderId?:string;

    @ApiProperty({
        description: 'Client name',
        example: 'John',
    })
    @IsNotEmpty()
    @Length(1,20)
    name: string;

    @ApiPropertyOptional({
        description: 'Username',
        example: 'John',
    })
    user?:User;

    @ApiProperty({
        description:'Tariff',
        example:1,
    })
    @IsNotEmpty()
    tariff?:number;

    @ApiProperty({
        description: 'Phone number',
        example: '+996500123456',
    })
    @IsNotEmpty()
    @Length(13)
    phone: string;
    
    @ApiProperty({
        description: 'Rent date',
        example: '2022-02-22T10:30:40.000Z',
    })
    @IsNotEmpty()
    startDate: Date;
    
    @ApiProperty({
        description: 'Return date',
        example: '2022-02-22T10:30:40.000Z',
    })
    @IsNotEmpty()
    endDate: Date;
    
    @ApiProperty({
        description: 'Car id',
        example: '1',
    })
    @IsNotEmpty()
    
    carId: number;

    @ApiProperty({
        description: 'Price for all rent days',
        example: '1590',
    })
    totalPrice?: number;
}