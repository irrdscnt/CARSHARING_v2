import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

import { Role } from 'src/user/entity/role.enum';
import { CarService } from './car.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('car')
export class CarController {
    constructor(private readonly service:CarService){}
    @Get()
    findAll(){
        return this.service.findAll();
    }
    

    @Get(':carId')
    findOne(@Param('carId') carId:number) {
        return this.service.findCarId(carId);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Post()
    @ApiCreatedResponse({ type: CreateCarDto})
    @ApiConflictResponse({ description: 'already exist' })
    create(@Body() dto:CreateCarDto){
        return this.service.create(dto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Put(':carId')
    @ApiCreatedResponse({ type: UpdateCarDto })
    @ApiNotFoundResponse()
    async update(@Param('carId') carId: number,  @Body() dto: UpdateCarDto) {
      return await this.service.update(carId, dto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete(':carId')
    @ApiNotFoundResponse({ description: ' already deleted' })
    async delete(@Param('carId') carId: number) {
        return this.service.delete(carId);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete()
    @ApiNotFoundResponse({ description: ' already deleted' })
    async deleteAll() {
        return this.service.deleteAll();
    }
}
