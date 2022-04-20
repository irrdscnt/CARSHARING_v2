import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserEntity } from './entity';
import { User } from './interface';

@Injectable()
export class UserService {
    constructor (@InjectRepository(UserEntity)
    private readonly regRep:Repository<UserEntity>
    ){}
    async findPass(password:string){
        return from (this.regRep.find({password}))

    }

    async findByEmail(email:string){
        return from (this.regRep.find({email}))
    }

    async save(dto:CreateUserDto){
        return from (this.regRep.save(dto))
    }

    async findUserId(id: number) {
        const userid = await this.regRep.findOne({id})
        console.log(userid)
        if (!userid) {
            throw new BadRequestException(400,'This user ID does not exist!');
        }
        return userid
        //else{
        //     return userid
        // }
    }
}