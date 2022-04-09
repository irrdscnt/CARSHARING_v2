import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarEntity } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([CarEntity])],
  providers: [CarService],
  controllers: [CarController],
  exports:[CarService]
})
export class CarModule {}
