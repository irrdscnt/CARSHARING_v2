import {  BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { OrderEntity } from './entity';
import { CreateOrderDto,} from './dto';
import { from, Observable } from 'rxjs';
import { IOrder } from './interface';
import { CarService } from 'src/car/car.service';
import { CarEntity } from 'src/car/entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity)
  private readonly regRep:Repository<OrderEntity>,
  private readonly carService:CarService,
  ){}
  
      
  findAll(){
    this.regRep.find()
    return from(this.regRep.find());
  }

  findActive(){
  const today=new Date()
  return this.regRep.find({
      where:{
        startDate:MoreThan(today)
      }
    })
  }
        
        

    
  async checkDate(id: number, start: any, end: any) {
    start = new Date(start);
    end = new Date(end);
    const weekStart = new Date(start).getDay();
    const weekEnd = new Date(end).getDay();
      if (weekStart === 0 || weekStart === 6 || weekEnd ===0 || weekEnd===6) {
        throw new BadRequestException(
          400, 'You can not rent on weekends/ Your rent can not end on weekends!');
      }
    const res = await this.regRep.find({
      where:{
        carId:id,
        endDate:MoreThan(new Date(start - 259200000)),
        startDate:LessThan(new Date(end + 259200000))
      }
    });
    return res;
  }
  findOne(carId: number) {
  const exist = this.regRep.find({carId});
    if (!exist) {
      throw new NotFoundException();
    }
    return exist;
  }


  async daysCount(start, end) {
    start = new Date(start);
    end = new Date(end);
    const res = end - start;
    const days = res / 1000 / 60 / 60 / 24;
    return days;
  }
  
  async create(dto: CreateOrderDto) {
    const { name, phone, carId,tariff} = dto;
    const { startDate, endDate } = dto;
    // const enddate=new Date(dto.endDate)
    // const startdate=new Date(dto.startDate)
    // const isAvailable= await this.regRep.find({
    //   where:{
    //     carId:dto.carId,
    //     startDate:LessThanOrEqual(enddate),
    //     endDate:MoreThanOrEqual(startdate)
    //   }
    // })
    // if (isAvailable.length>0){
    //   throw new BadRequestException(400,'this date is already taken!')
    // }
    let dayscount=await this.daysCount(startDate,endDate)
    console.log(dayscount)
    switch (tariff){
      case 1:
        let price1=270;
        dto.totalPrice=price1*dayscount
      break;
      case 2:
        let price2=330
        dto.totalPrice=price2*dayscount
      break;
      case 3:
        let price3=390
        dto.totalPrice=price3*dayscount
      break;
    }
  
    if(dayscount>=3 && dayscount<=5){
      //console.log(dto.totalPrice)
      let skidka=dto.totalPrice*0.05;
      //console.log(skidka)
      dto.totalPrice=dto.totalPrice-skidka;
      //console.log(dto.totalPrice)
    }
    if(dayscount>5 && dayscount<=14){
      //console.log(dto.totalPrice)
      let skidka=dto.totalPrice*0.1;
      //console.log(skidka)
      dto.totalPrice=dto.totalPrice-skidka;
      //console.log(dto.totalPrice)
    }
    if(dayscount>15 && dayscount<=30){
      console.log(dto.totalPrice)
      let skidka=dto.totalPrice*0.15;
      console.log(skidka)
      dto.totalPrice=dto.totalPrice-skidka;
      console.log(dto.totalPrice)
    }

    const exist = this.carService.findCarId(carId);
    if (!exist) {
      throw new ConflictException();
    }
    
    const res = await this.checkDate(carId, startDate, endDate);
    if (res.length !== 0) {
      throw new BadRequestException(400, '3 days must pass from past rent before you can rent new');
    }
    
    dto.tariff=tariff
    dto.name = name;
    dto.phone = phone;
    dto.startDate = startDate;
    dto.endDate = endDate;
    dto.carId = carId;
    
    const order = this.regRep.create(dto);
    return this.regRep.save(order)
  }

  delete(orderId:string):Observable<DeleteResult>{
    return from(this.regRep.delete(orderId));
  }
  deleteAll(){
    return from(this.regRep.clear())
  }
    
}
