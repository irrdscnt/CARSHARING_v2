import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserEntity } from 'src/user/entity';
import { User } from 'src/user/interface';
import { Repository } from 'typeorm';

@Injectable() 
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository:Repository<UserEntity>,
    private jwtService:JwtService
  ){}

  
  hashPassword(password:string):Observable<string>{
    return from(bcrypt.hash(password,12));
  }

  registerAccount(user:User):Observable<User>{
    const { name,email,password} = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword:string)=> {
        return from(this.userRepository.save({
          name,
          email,
          password:hashedPassword})).pipe(map((user:User)=>{
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }

  validateUser(email:string,password:string){
    return from(this.userRepository.findOne({email},{select:['id','name','email','password']})).pipe(
      switchMap((user:User)=>
        from(bcrypt.compare(password,user.password)).pipe(
          map((isValidPassword:boolean)=>{
            if(isValidPassword){
              return user;
            }
          })
        )
      )

    )
  }

  login(user:User):Observable<string>{
    const {email,password}=user;
    return this.validateUser(email,password).pipe(
      switchMap((user:User)=>{
        if(user){
          return from(this.jwtService.signAsync({user}))
        }
      })
    )
  }
}