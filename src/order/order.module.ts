import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity';
import { CarModule } from 'src/car/car.module';
import { CarService } from 'src/car/car.service';
import { CarEntity } from 'src/car/entity';
import { CarController } from 'src/car/car.controller';

@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity,CarEntity]),CarModule],
  providers: [OrderService,CarService],
  controllers: [OrderController,CarController]
})
export class OrderModule {}
