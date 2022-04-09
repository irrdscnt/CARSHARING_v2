import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
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

    @Post()
    @ApiCreatedResponse({ type: CreateCarDto})
    @ApiConflictResponse({ description: 'already exist' })
    create(@Body() dto:CreateCarDto){
    return this.service.create(dto);
    }
    @Put(':carId')
    @ApiCreatedResponse({ type: UpdateCarDto })
    @ApiNotFoundResponse()
    async update(@Param('carId') carId: number,  @Body() dto: UpdateCarDto) {
      return await this.service.update(carId, dto);
    }
    @Delete(':carId')
    @ApiNotFoundResponse({ description: ' already deleted' })
    async delete(@Param('carId') carId: number) {
        return this.service.delete(carId);
    }
    @Delete()
    @ApiNotFoundResponse({ description: ' already deleted' })
    async deleteAll() {
        return this.service.deleteAll();
    }
}
