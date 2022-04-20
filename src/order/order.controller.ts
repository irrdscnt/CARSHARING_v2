import { Body, Controller, Delete, Get, Param, Post, UseGuards,Request } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/entity/role.enum';
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

    @UseGuards(JwtGuard)
    @Post()
    @ApiCreatedResponse({ type: CreateOrderDto})
    @ApiConflictResponse({ description: 'already exist' })
    create(@Body() reg:CreateOrderDto, @Request() req){
        return this.service.create(req.user,reg);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete('clear')
    deleteAll() {
        return this.service.deleteAll()
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete(':orderId')
    @ApiNotFoundResponse({ description: ' already deleted' })
    delete(@Param('orderId') orderId:string) : Observable<DeleteResult> {
        return this.service.delete(orderId)
    }



}
