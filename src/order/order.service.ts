import {  BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, LessThan, MoreThan, Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { OrderEntity } from './entity';
import { CreateOrderDto,} from './dto';
import { from, Observable } from 'rxjs';
import { CarService } from 'src/car/car.service';
import { User } from 'src/user/interface';
import { Tariff } from './interface';
import { transformAuthInfo } from 'passport';

@Injectable() 
export class OrderService {
  private DB:Tariff[];
  constructor(@InjectRepository(OrderEntity)
  private readonly regRep:Repository<OrderEntity>,
  private readonly carService:CarService,
  ){
    this.DB=[
      {
        tariff:1,
        price:270,
        km:200,

      },
      {
        tariff:2,
        price:330, 
        km:350,
      },
      {
        tariff:3,
        price:390,
        km:500,
      },
    ];
  }
  
      
  findAll(){
    this.regRep.find()
    return from(this.regRep.find());
  }

  // TotalKm(dto:Statistics){
  //   // let tarif=this.DB.find((tar)=>tar.tariff==dto.tariff)

    
  // }

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

  async findTariff(tariff: number) {
    const tar = await this.DB.find((tar: Tariff) => tar.tariff === tariff)
    if (!tar) {
      throw new BadRequestException(400,'This tariff does not exist!');
    }else{
      return tar
    }
  }


  async daysCount(start, end) {
    start = new Date(start);
    end = new Date(end);
    const res = end - start;
    const days = res / 1000 / 60 / 60 / 24;
    return days;
  }
  
  async create(user:User,dto: CreateOrderDto) {
    dto.user=user;
    const { name, phone, carId,tariff} = dto;
    const { startDate, endDate } = dto;

    let dayscount=await this.daysCount(startDate,endDate)
    if (dayscount>30){
      throw new BadRequestException(400,'The maximum rental period is 30 days')
    }
    console.log(dayscount)
    // switch (tariff){
    //   case 1:
    //     let price1=270;
    //     let km1=200
    //     dto.wholekm=km1*dayscount
    //     dto.totalPrice=price1*dayscount
    //   break;
    //   case 2:
    //     let price2=330
    //     let km2=350
    //     dto.wholekm=km2*dayscount
    //     dto.totalPrice=price2*dayscount
    //   break;
    //   case 3:
    //     let price3=390
    //     let km3=500
    //     dto.wholekm=km3*dayscount
    //     dto.totalPrice=price3*dayscount
    //   break;
    // }
    // dto.tariff=this.DB.find((tar)=>tar.tariff==tariff)
    let tarif=this.DB.find((tar)=>tar.tariff==dto.tariff)
    console.log(tarif)
    if(tarif){
      console.log(tarif.price)
      dto.totalPrice=tarif.price*dayscount
      dto.wholekm=tarif.km*dayscount
      console.log(tarif.km)
      console.log(dto.wholekm)


      if(dayscount>=3 && dayscount<=5){
        let skidka=dto.totalPrice*0.05;
        dto.totalPrice=Math.round(dto.totalPrice-skidka);
      }
      if(dayscount>5 && dayscount<=14){
        let skidka=dto.totalPrice*0.1;
        dto.totalPrice=Math.round(dto.totalPrice-skidka);
        
      }
      if(dayscount>15 && dayscount<=30){
        console.log(dto.totalPrice)
        let skidka=dto.totalPrice*0.15;
        dto.totalPrice=Math.round(dto.totalPrice-skidka);
      }
      
    }
   
    const car = await this.carService.findCarId(dto.carId);
    if (!car) {
      throw new ConflictException();
    }
    
    const res = await this.checkDate(carId, startDate, endDate);
    if (res.length !== 0) {
      throw new BadRequestException(400, '3 days must pass from past rent before you can rent new');
    }
    dto.name = name;
    dto.phone = phone;
    dto.startDate = startDate;
    dto.endDate = endDate;
    dto.carId = carId;
    const order = this.regRep.create({...dto, car});
    return this.regRep.save(order)
  }

  delete(orderId:string):Observable<DeleteResult>{
    return from(this.regRep.delete(orderId));
  }
  deleteAll(){
    return from(this.regRep.clear())
  }

  // findSt(){
  //   this.
  // }

    
}
