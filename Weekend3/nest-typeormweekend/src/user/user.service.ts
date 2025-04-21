import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SighnUpDto } from './dto/signup.user';
import { SignInDto } from './dto/signin.user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

constructor(@InjectRepository(User)
private userrepo:Repository<User>,
private jwtService:JwtService,
private config:ConfigService
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
        throw new UnauthorizedException('Invalid credentials');
    }
   
    if(user.password !== logindto.password){
        throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
        name:user.firstname,
        email:user.email, 
        role:user.roles,
      };  
      const accessToken = await this.jwtService.signAsync(payload);

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET') || 'supersecreaterefreshtokenhere',
        expiresIn: '7d',
      });

      
     return {
       message: 'Login successful',
       accessToken,
        refreshToken,};
    
}

async refreshToken(oldRefreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET')||'supersecreaterefreshtokenhere',
      });

      const newAccessToken = await this.jwtService.signAsync({
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }


  async logout(refreshToken: string) {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET')||'supersecreaterefreshtokenhere',
      });

      return { message: 'Logout successful' };  
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}






