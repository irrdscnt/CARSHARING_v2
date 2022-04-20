import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity';
import { CarModule } from 'src/car/car.module';
import { CarService } from 'src/car/car.service';
import { CarEntity } from 'src/car/entity';
import { CarController } from 'src/car/car.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/user/entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity,CarEntity,UserEntity]),CarModule,AuthModule],
  providers: [OrderService,CarService,UserService],
  controllers: [OrderController,CarController]
})
export class OrderModule {}
