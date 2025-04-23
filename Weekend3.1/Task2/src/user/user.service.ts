import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/user-login-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  
    constructor(@InjectRepository(User)
    private userrepo:Repository<User>){}


    async LoginUser(LoginDTO: LoginDTO) {
        const user = await this.userrepo.findOne({ where: { email: LoginDTO.email } });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.password !== LoginDTO.password) {
            throw new Error('Invalid password');
        }
        return { message: `Login Successful , welcome ${user.name}` };
    }

    async RegisterUser(CreateUserDto: CreateUserDto) {
        const user = await this.userrepo.findOne({ where: { email: CreateUserDto.email } });
        if (user) {
            throw new Error('User already exists');
        }
        const newUser = this.userrepo.create(CreateUserDto);
        await this.userrepo.save(newUser);
        return {user:newUser, message: 'User registered successfully'};
        }

    async findUserById(id:number){
        const user = await this.userrepo.findOne({where:{id}});
        if(!user){
            throw new Error('User not found');
        }
        console.log(user);
        
        return user;
     }
    
}
