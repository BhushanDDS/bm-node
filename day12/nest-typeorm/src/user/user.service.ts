import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
constructor(
    @InjectRepository(User)
    private userrepository:Repository<User>
){}


async create(createUserDtom:CreateUserDto){
    const newUser= await this.userrepository.create(createUserDtom);
    const user=await this.userrepository.save(newUser);
    return user;

}

async findAll(){
    return await this.userrepository.find();
}

async findOne(id:number){

    const user = this.userrepository.findOne({where:{id}});
    if(!user){
        throw new Error('User not found');
    }
    return user;
    
}

async update(id:number,UpdateUserDto:UpdateUserDto){
     const user = await this.userrepository.findOne({where:{id}});
     if(!user){
        throw new NotFoundException('User not found');
     }
     const updatedUser = this.userrepository.create({
        
        ...user,
        ...UpdateUserDto
     });
     return await this.userrepository.save(updatedUser);


}

async remove(id:number){
    const user = await this.userrepository.findOne({where:{id}});
    if(!user){
        throw new NotFoundException('User not found');
    }
    await this.userrepository.remove(user);

}


}
