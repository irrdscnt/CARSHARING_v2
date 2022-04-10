import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCarDto, UpdateCarDto } from './dto';
import { CarEntity } from './entity';

@Injectable()
export class CarService {
    constructor(@InjectRepository(CarEntity)
    private readonly regRep:Repository<CarEntity>){}


    findAll(){
        
        return from(this.regRep.find());
    }
    
    async create(dto:CreateCarDto){
        const {brand,carNum,model}=dto
        
        dto.brand=brand;
        dto.carNum=carNum;
        dto.model=model;
        const car = this.regRep.create(dto);
        return this.regRep.save(car)
    }

    async findCarId(carId: number) {
        const id = await this.regRep.findOne({carId})
        if (!id) {
            throw new BadRequestException(400,'This car ID does not exist!');
        }else{
            return id
        }
    }
    async update(carId:number,dto:UpdateCarDto){
        const {carNum,brand,model}=dto;
        
        if (carId){
            const car=await this.regRep.find({carId});
            if(!car){
                throw new BadRequestException(400,'This car ID does not exist!')
            }
            Object.assign(carId, dto);  
        }
       
        return await this.regRep.update(carId,dto);
    }

    delete(id:number):Observable<DeleteResult>{
        return from(this.regRep.delete(id));
    }
    deleteAll(){
        return from(this.regRep.clear())
    }


}
