import { BadRequestException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { map, switchMap } from 'rxjs/operators';
import { CreateUserDto, LoginDto, UpdateUserDto } from 'src/user/dto';
import { UserEntity } from 'src/user/entity';
import { User } from 'src/user/interface';
import { Repository } from 'typeorm';
import {UserService} from 'src/user/user.service'

@Injectable() 
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository:Repository<UserEntity>,
    private jwtService:JwtService,
    private readonly UserService:UserService
  ){}

  
  async hashPassword(password:string){
    return bcrypt.hash(password,10);
  }

  async register(dto:CreateUserDto){
    const { name,email,password,role} = dto;
    const newU  = new CreateUserDto()
    newU.name=name;
    newU.email=email;
    newU.role=role;
    newU.password = await this.hashPassword(password)
    return await this.UserService.save(newU)
    
  }

  // registerAccount(user:User):Observable<User>{
  //   const { name,email,password} = user;

  //   return this.hashPassword(password).pipe(
  //     switchMap((hashedPassword:string)=> {
  //       return from(this.userRepository.save({
  //         name,
  //         email,
  //         // password:hashedPassword})).pipe(map((user:User)=>{
  //         //   //delete user.password;
  //         //   return user;
  //         }),
  //       );
  //     }),
  //   );
  // }

  // validateUser(email:string,password:string){
  //   return from(this.userRepository.findOne({email},{select:['id','name','email','password','role']})).pipe(
  //     switchMap((user:User)=>
  //       from(bcrypt.compare(password,user.password)).pipe(
  //         map((isValidPassword:boolean)=>{
  //           if(isValidPassword){
  //             return user;
  //           }
  //         })
  //       )
  //     )

  //   )
  // }

  async validate(password:string,Newpassword:string){
    // let user =this.userRepository.findOne({email})
    // console.log(password,(await user).password)
    return await bcrypt.compare(password,Newpassword)
  }
  deleteUser(id:string){
    return from(this.userRepository.delete(id));
  }

  findAll(){
    this.userRepository.find()
    return from(this.userRepository.find());
  }

  async login(dto:LoginDto){
    const {email,password}=dto;
    let user = await this.userRepository.findOne({email})
    console.log(password,user.password)
    if(!user){
      throw new BadRequestException(400,'This user email does not exist')
    }

    const a = this.validate(password, user.password)
    if(a){
      return this.jwtService.signAsync({user})
    }else{
      throw new BadRequestException('Invalid Password')
    }
    // const a = this.validate(password,user.password)
    // if(!a) {
    //   throw new BadRequestException('Invalid Password')
    // }
    // return this.jwtService.signAsync({user})
  }

  update(id:number,dto:UpdateUserDto){
    const {name,email,password}=dto;
    
    if (id){
        const user=this.userRepository.find({id});
        if(!user){
            throw new BadRequestException(400,'This user ID does not exist!')
        }
        Object.assign(id, dto);  
    }
   
    return this.userRepository.update(id,dto);
  }
}