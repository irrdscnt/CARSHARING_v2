import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { CreateOrderDto} from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly service:OrderService){}
    
    @Get('/active')
    findActive(){
        return this.service.findActive();
    }

    @Post()
    @ApiCreatedResponse({ type: CreateOrderDto})
    @ApiConflictResponse({ description: 'already exist' })
    create(@Body() reg:CreateOrderDto){
    return this.service.create(reg);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }

    // @Put(':id')
    // @ApiCreatedResponse({ type: UpdateOrderDto })
    // @ApiNotFoundResponse()
    // update(
    //     @Param('id')id:string,
    //     @Body() reg:UpdateOrderDto){
    //     return this.service.update(id,reg)
    // }

    @Delete('clear')
    deleteAll() {
        return this.service.deleteAll()
    }

    @Delete(':orderId')
    @ApiNotFoundResponse({ description: ' already deleted' })
    delete(@Param('orderId') orderId:string) : Observable<DeleteResult> {
        return this.service.delete(orderId)
    }



}
