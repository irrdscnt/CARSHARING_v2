import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderEntity } from './order/entity';
import { OrderModule } from './order/order.module';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { CarEntity } from './car/entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv'

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
      entities:[OrderEntity,CarEntity],
      //autoLoadEntities:true,
      synchronize:true,
    }),OrderModule, CarModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
