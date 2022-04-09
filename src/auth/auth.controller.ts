import { Body, Controller, Post} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from 'src/user/interface';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('register')
    register(@Body() user: User): Observable<User> {
        return this.service.registerAccount(user);
    }

    @Post('login')
    login(@Body() user: User): Observable<{token:string}> {
        return this.service.login(user)
        .pipe(map((jwt:string)=>({token:jwt})));
    }
    
}
