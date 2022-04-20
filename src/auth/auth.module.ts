import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory:()=>({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
      })
    }),
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(()=> UserModule)
  ],
  providers: [AuthService, JwtGuard, JwtStrategy,RolesGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
