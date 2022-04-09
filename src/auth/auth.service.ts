import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// const bcrypt= require ('bcrypt');

@Injectable()
export class AuthService {

    hashPassword(password:string):Observable<string>{
        return
    }
}
