import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login-user-dto';
import { RegisterDTO } from './dto/register-user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

constructor(
    @InjectRepository(Auth)
    private authrepostory: Repository<Auth>,
    private jwtService: JwtService
){}


async register(regdto:RegisterDTO){

    const newUser= await this.authrepostory.create(regdto);
    const savedUser= await this.authrepostory.save(newUser);
    return savedUser;
}

async login(logindto:LoginDTO){
    //we have to generate jwt token here

  

    const user= await this.authrepostory.findOne({where:{email:logindto.email}});
    if(!user){
        return {message:'user not found'};
    }
    if(!user.isActive){
        return {message:'user is not active yet'};
    }
    if(user.password !== logindto.password){
        return {message:'password is not correct'};
    }
    const payload = {
        email:user.email, 
        role:user.roles,
      };  
      return this.jwtService.signAsync(payload); 
}


async findUserById(id:number){
    const user= await this.authrepostory.findOne({where:{id}});
    if(!user){
        return {message:'user not found'};
    }
    return user.email;
}

async validateUser(id: number) {
    const user = await this.authrepostory.findOne({ where: { id } });
  
    if (!user) {
      return { message: 'User not found' };
    }
  
    if (user.isActive) {
      return { message: 'User is already active' };
    }
  
    user.isActive = true;
    await this.authrepostory.save(user);
  
    return { message: 'User is now active' };
  }
  




}
