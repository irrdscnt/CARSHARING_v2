import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CreateUserDto, LoginDto, UpdateUserDto } from 'src/user/dto';
import { Role } from 'src/user/entity/role.enum';
import { User } from 'src/user/interface';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';


@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    
    @Post('register')
    register(@Body() dto: CreateUserDto){
        return this.service.register(dto);
    }

    @Post('login')
    login(@Body() dto:LoginDto) {
        return this.service.login(dto)
        // .pipe(map((jwt:string)=>({token:jwt})));
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete(':id')
    delete(@Param('id') id:string) {
        return this.service.deleteUser(id)
    }
    
    @Get()
    findAll(){
        return this.service.findAll();
    }

    @Put(':id')
    update(@Param('id') id: number,  @Body() dto:UpdateUserDto) {
      return this.service.update(id, dto);
    }
    
}
