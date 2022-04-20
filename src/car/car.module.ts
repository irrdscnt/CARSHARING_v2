import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarEntity } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports:[TypeOrmModule.forFeature([CarEntity])],
  providers: [CarService,RolesGuard,JwtGuard],
  controllers: [CarController],
  exports:[CarService]
})
export class CarModule {}
