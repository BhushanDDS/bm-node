import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SighnUpDto } from './dto/signup.user';
import { SignInDto } from './dto/signin.user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

constructor(@InjectRepository(User)
private userrepo:Repository<User>,
private jwtService:JwtService
){}


async registerUser(createUserDto:SighnUpDto){
//cheack if user already exists
const user =
    await this.userrepo.findOne({where:{email:createUserDto.email}});
if(user){
    throw new Error('User already exists'); }

//create a new user
const newUser = this.userrepo.create(createUserDto);
await this.userrepo.save(newUser);
return {message:'user created successfully',newUser};


  
}


async loginuser(logindto:SignInDto){
    const user= await this.userrepo.findOne({where:{email:logindto.email}});
    if(!user){
        return {message:'user not found'};
    }
   
    if(user.password !== logindto.password){
        return {message:'password is not correct'};
    }

    const payload = {
        name:user.firstname,
        email:user.email, 
        role:user.roles,
      };  
      const key= await this.jwtService.signAsync(payload); 
      console.log(key);
      

      return {message:"login successfully",token:key};

}






}
