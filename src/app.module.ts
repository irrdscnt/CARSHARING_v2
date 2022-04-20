import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order/entity';
import { OrderModule } from './order/order.module';
import { CarModule } from './car/car.module';
import { CarEntity } from './car/entity';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv'
import { UserEntity } from './user/entity';
import { UserModule } from './user/user.module';
import { StatisticsModule } from './statistics/statistics.module';

dotenv.config()
@Module({
  imports: [
    //ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.POSTGRES_HOST,
      port:parseInt(<string>process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DATABASE,
      entities:[OrderEntity,CarEntity,UserEntity],
      //autoLoadEntities:true,
      synchronize:true,
    }),OrderModule, CarModule, AuthModule, UserModule, StatisticsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
